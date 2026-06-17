"""
Poubelle Intelligente — 3 servos + clavier 4x4 + réception réseau (PC)
Uniquement RPi.GPIO (pas de conflit)

  Touche 1 → Servo PLASTIQUE (GPIO 17 - pin 11)
  Touche 2 → Servo VERRE     (GPIO 27 - pin 13)
  Touche 3 → Servo RESTE     (GPIO 22 - pin 15)

Câblage servos :
  Servo plastique orange → GPIO 17 (pin 11)
  Servo verre     orange → GPIO 27 (pin 13)
  Servo reste     orange → GPIO 22 (pin 15)
  Tous les rouges        → 5V externe
  Tous les marrons       → GND commun

Câblage clavier :
  Pin 1 (R1) → GPIO 5  (pin 29)
  Pin 2 (R2) → GPIO 6  (pin 31)
  Pin 3 (R3) → GPIO 13 (pin 33)
  Pin 4 (R4) → GPIO 19 (pin 35)
  Pin 5 (C1) → GPIO 12 (pin 32)
  Pin 6 (C2) → GPIO 16 (pin 36)
  Pin 7 (C3) → GPIO 20 (pin 38)
  Pin 8 (C4) → GPIO 21 (pin 40)

Réseau :
  Le PC (script YOLO) envoie une catégorie en texte sur le port 5050
  ("Plastique", "Verre", "Metal", "Carton / Papier", ...).
  La Pi convertit cette catégorie en numéro de touche et ouvre la
  trappe correspondante, exactement comme si on avait tapé sur le clavier.
"""

import RPi.GPIO as GPIO
import time
import threading
import socket

# ── Servos ───────────────────────────────────────────────────
SERVO_PINS = {
    1: 17,   # Touche 1 → Plastique
    2: 27,   # Touche 2 → Verre
    3: 22,   # Touche 3 → Reste
}
NOMS = {1: "Plastique", 2: "Verre", 3: "Reste"}

FREQ         = 50
PULSE_FERME  = 2.5   # duty cycle 0°
PULSE_OUVERT = 7.5   # duty cycle 90°
DUREE_OUVERT = 1.0   # secondes

# ── Mapping catégories IA (PC) → trappe ───────────────────────
CATEGORIE_VERS_TOUCHE = {
    "Plastique": 1,
    "Verre": 2,
    "Metal": 3,
    "Carton / Papier": 3,
    "Reste": 3,
}

PORT_RESEAU = 5050

# ── Clavier 4x4 ─────────────────────────────────────────────
ROW_PINS = [5,  6,  13, 19]
COL_PINS = [12, 16, 20, 21]

KEYPAD = [
    [1,   2,   3,   'A'],
    [4,   5,   6,   'B'],
    [7,   8,   9,   'C'],
    ['*', 0,   '#', 'D'],
]

# ── Init GPIO ────────────────────────────────────────────────
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

# Init servos
pwms = {}
for touche, pin in SERVO_PINS.items():
    GPIO.setup(pin, GPIO.OUT)
    pwm = GPIO.PWM(pin, FREQ)
    pwm.start(PULSE_FERME)
    pwms[touche] = pwm

time.sleep(0.4)
print("✅ 3 servos prêts — trappes fermées.")

# Init clavier
for pin in ROW_PINS:
    GPIO.setup(pin, GPIO.OUT)
    GPIO.output(pin, GPIO.LOW)

for pin in COL_PINS:
    GPIO.setup(pin, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

# ── Fonction servo ───────────────────────────────────────────
def ouvrir_servo(touche):
    print(f"↗ Ouverture trappe {NOMS[touche]}...")
    pwms[touche].ChangeDutyCycle(PULSE_OUVERT)
    time.sleep(DUREE_OUVERT)
    pwms[touche].ChangeDutyCycle(PULSE_FERME)
    time.sleep(0.4)
    pwms[touche].ChangeDutyCycle(0)
    print(f"↘ Trappe {NOMS[touche]} fermée.")

# ── Lecture clavier ──────────────────────────────────────────
def lire_touche():
    for i, row_pin in enumerate(ROW_PINS):
        GPIO.output(row_pin, GPIO.HIGH)
        for j, col_pin in enumerate(COL_PINS):
            if GPIO.input(col_pin) == GPIO.HIGH:
                GPIO.output(row_pin, GPIO.LOW)
                return KEYPAD[i][j]
        GPIO.output(row_pin, GPIO.LOW)
    return None

# ── IP locale (juste pour affichage) ──────────────────────────
def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
    except Exception:
        ip = "127.0.0.1"
    finally:
        s.close()
    return ip

# ── Ecoute réseau (signal envoyé par le PC) ───────────────────
def ecouter_reseau():
    serveur = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    serveur.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    serveur.bind(("0.0.0.0", PORT_RESEAU))
    serveur.listen(1)
    print(f"📡 En écoute du PC sur le port {PORT_RESEAU}...")

    while True:
        conn, addr = serveur.accept()
        with conn:
            data = conn.recv(1024).decode().strip()
            if data:
                print(f"📥 Reçu du PC ({addr[0]}) : {data}")
                touche = CATEGORIE_VERS_TOUCHE.get(data)
                if touche is not None:
                    threading.Thread(target=ouvrir_servo, args=(touche,), daemon=True).start()
                else:
                    print(f"⚠ Catégorie inconnue reçue : {data}")

# ── Boucle principale ────────────────────────────────────────
print(f"\n📡 IP de la Pi : {get_local_ip()}")
print("\n🎹 Clavier prêt :")
print("   Touche 1 → Plastique")
print("   Touche 2 → Verre")
print("   Touche 3 → Reste")
print("   Ctrl+C pour quitter\n")

# Lance l'écoute réseau en arrière-plan, en parallèle du clavier
threading.Thread(target=ecouter_reseau, daemon=True).start()

derniere_touche = None

try:
    while True:
        touche = lire_touche()
        if touche is not None and touche != derniere_touche:
            print(f"Touche détectée : {touche}")
            if touche in (1, 2, 3):
                threading.Thread(target=ouvrir_servo, args=(touche,), daemon=True).start()
            derniere_touche = touche
        elif touche is None:
            derniere_touche = None
        time.sleep(0.05)

except KeyboardInterrupt:
    print("\nArrêt.")

finally:
    for pwm in pwms.values():
        pwm.stop()
    GPIO.cleanup()
    print("Nettoyage terminé.")
