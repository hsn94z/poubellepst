import socket
import threading
from ultralytics import YOLO
import cv2
import numpy as np
import time
import datetime

# =========================
# VARIABLES GLOBAL
# =========================
derniere_categorie = None
debut_stable = None
dernier_detection = 0

DUREE_STABLE = 1.0   # secondes
COOLDOWN = 5.0      # secondes

IP_PI = "172.20.10.4"  # <-- IP de ta Pi

# =========================
# MODELE
# =========================
model = YOLO("yolov8n.pt")

# =========================
# ENVOI VERS LA PI
# =========================
def envoyer_a_pi(categorie, ip=IP_PI):
    def _envoi():
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.settimeout(0.3)  # max 0.3s d'attente, pas plus
            s.connect((ip, 5050))
            s.send(categorie.encode())
            s.close()
        except:
            pass
    threading.Thread(target=_envoi, daemon=True).start()

# =========================
# CATEGORISATION
# =========================
def categoriser(objet, area=0, brightness=0):
    if objet in ["book", "paper", "toilet"]:
        return "Carton / Papier"
    if area < 8000 and brightness > 150:
        return "Carton / Papier"
    elif objet in ["bottle", "cup", "mouse", "bowl"]:
        return "Plastique"
    elif objet in ["wine glass", "glass", "cup"]:
        return "Verre"
    elif objet in ["can", "knife", "scissors"]:
        return "Metal"
    else:
        return "En cours de traitement..."

# =========================
# TRAITEMENT FINAL
# =========================
def traiter_dechet(categorie):
    if categorie == "En cours de traitement...":
        return
    maintenant = datetime.datetime.now()

    print(f"Ouverture bac : {categorie}")

    with open("historique.txt", "a") as f:
        f.write(f"{maintenant} - {categorie}\n")

    # on envoie le signal à la Pi pour ouvrir la trappe
    envoyer_a_pi(categorie)

# =========================
# FILTRE STABILITE + COOLDOWN
# =========================
def process_detection(categorie):
    global derniere_categorie, debut_stable, dernier_detection

    if categorie == "En cours de traitement...":
        derniere_categorie = None
        debut_stable = None
        return

    maintenant = time.time()

    if categorie == derniere_categorie:
        if debut_stable is None:
            debut_stable = maintenant

        if (maintenant - debut_stable >= DUREE_STABLE and
            maintenant - dernier_detection > COOLDOWN):

            traiter_dechet(categorie)

            dernier_detection = maintenant
            debut_stable = None
            derniere_categorie = None  # reset

    else:
        derniere_categorie = categorie
        debut_stable = maintenant

# =========================
# CAMERA
# =========================
cap = cv2.VideoCapture(1)
cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)  # ne garde que la dernière image (évite le retard)

while True:
    ret, frame = cap.read()

    if not ret:
        break

    # =========================
    # DETECTION YOLO
    # =========================
    results = model(frame, imgsz=320, verbose=False)

    meilleure_box = None
    meilleure_conf = 0

    for result in results:
        for box in result.boxes:
            confidence = float(box.conf[0])

            if confidence > meilleure_conf:
                meilleure_conf = confidence
                meilleure_box = box

    objet_detecte = False

    # =========================
    # TRAITER L'OBJET PRINCIPAL
    # =========================
    if meilleure_box is not None and meilleure_conf > 0.5:
        cls = int(meilleure_box.cls[0])
        label = model.names[cls]

        x1, y1, x2, y2 = map(int, meilleure_box.xyxy[0])

        roi = frame[y1:y2, x1:x2]
        area = (x2 - x1) * (y2 - y1)

        if area > 2000:
            objet_detecte = True

            # Cas spécial bouteille
            if label == "bottle":
                brightness = np.mean(roi)
                std_color = np.std(roi)

                if brightness > 160 and std_color > 40:
                    categorie = "Verre"
                else:
                    categorie = "Plastique"
            elif label == "cup":
                brightness = np.mean(roi)
                std_color = np.std(roi)

                highlights = np.mean(roi > 220)

                if brightness > 50 and highlights > 0.02:
                    categorie = "Verre"
                else:
                    categorie = "Plastique"
            else:
                brightness = np.mean(roi)
                categorie = categoriser(label, area, brightness)

            # LOGIQUE ANTI-SPAM (envoie aussi à la Pi si validé)
            process_detection(categorie)

            # Dessin
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0,255,0), 2)
            cv2.putText(frame, categorie, (x1, y1-10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,255,0), 2)

    # =========================
    # RESET SI PLUS D'OBJET
    # =========================
    if not objet_detecte:
        derniere_categorie = None
        debut_stable = None

    # =========================
    # AFFICHAGE
    # =========================
    cv2.imshow("Tri des dechets", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# =========================
# CLEAN
# =========================
cap.release()
cv2.destroyAllWindows()
