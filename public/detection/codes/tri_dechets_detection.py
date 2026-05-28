"""
Script principal de détection et tri des déchets (YOLOv8 + OpenCV).
Assemblé à partir des modules : classification, boucle caméra et affichage debug.
"""

from collections import defaultdict, deque

import cv2
import numpy as np
from ultralytics import YOLO

model = YOLO("yolov8n.pt")

historique = defaultdict(lambda: deque(maxlen=10))
labels_vus: set[tuple] = set()


def get_zone(x1: int, y1: int, x2: int, y2: int) -> tuple[int, int]:
    cx = (x1 + x2) // 2
    cy = (y1 + y2) // 2
    return (cx // 100, cy // 100)


def categoriser(objet: str, roi) -> str:
    hsv_roi = cv2.cvtColor(roi, cv2.COLOR_BGR2HSV)
    sat = float(np.mean(hsv_roi[:, :, 1]))
    bright = float(np.mean(hsv_roi[:, :, 2]))

    if objet in ("book", "paper", "notebook"):
        return "Carton / Papier"
    if objet == "bottle":
        return "Verre" if bright > 150 else "Plastique"
    if objet in ("cup", "wine glass"):
        if sat < 40 and bright > 100:
            return "Metal"
        return "Verre"
    if objet == "can":
        return "Metal"
    return "Inconnu"


def categorie_stable(zone: tuple[int, int], nouvelle_categorie: str) -> str:
    historique[zone].append(nouvelle_categorie)
    votes: dict[str, int] = {}
    for cat in historique[zone]:
        votes[cat] = votes.get(cat, 0) + 1
    return max(votes, key=votes.get)


def main() -> None:
    cap = cv2.VideoCapture(1)
    cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    last_boxes: list[tuple] = []
    frame_count = 0

    print("=== MODE DEBUG ===")
    print("Les labels YOLO bruts s'affichent dans le terminal.")
    print("Tenez un objet devant la camera et notez le label affiche.")
    print("Appuyez sur Q pour quitter.")

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame_count += 1

        if frame_count % 2 == 0:
            small_frame = cv2.resize(frame, (320, 240))
            results = model(small_frame, verbose=False)
            scale_x = 640 / 320
            scale_y = 480 / 240
            last_boxes = []

            for box in results[0].boxes:
                cls_id = int(box.cls[0])
                label = results[0].names[cls_id]
                confidence = float(box.conf[0])
                if confidence < 0.5:
                    continue

                x1, y1, x2, y2 = [int(v) for v in box.xyxy[0]]
                x1, x2 = int(x1 * scale_x), int(x2 * scale_x)
                y1, y2 = int(y1 * scale_y), int(y2 * scale_y)

                roi = frame[y1:y2, x1:x2]
                if roi.size == 0:
                    continue

                area = (x2 - x1) * (y2 - y1)
                if area < 5000:
                    continue

                # DEBUG : analyse HSV + label brut
                hsv_roi = cv2.cvtColor(roi, cv2.COLOR_BGR2HSV)
                sat = float(np.mean(hsv_roi[:, :, 1]))
                bright = float(np.mean(hsv_roi[:, :, 2]))

                log_key = (label, round(sat, -1), round(bright, -1))
                if log_key not in labels_vus:
                    labels_vus.add(log_key)
                    print(
                        f"[YOLO] label='{label}' | conf={confidence:.2f} | "
                        f"saturation={sat:.1f} | brightness={bright:.1f}"
                    )

                categorie_brute = categoriser(label, roi)
                if categorie_brute == "Inconnu":
                    cv2.putText(
                        frame,
                        f"? {label}",
                        (x1, max(y1 - 10, 20)),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.6,
                        (0, 165, 255),
                        2,
                    )
                    continue

                zone = get_zone(x1, y1, x2, y2)
                categorie = categorie_stable(zone, categorie_brute)
                last_boxes.append((x1, y1, x2, y2, categorie, label, sat, bright))

        for x1, y1, x2, y2, categorie, label_raw, sat, bright in last_boxes:
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(
                frame,
                categorie,
                (x1, max(y1 - 10, 20)),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                (0, 255, 0),
                2,
            )
            cv2.putText(
                frame,
                f"{label_raw} | sat={sat:.0f} bright={bright:.0f}",
                (x1, y2 + 20),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.45,
                (255, 200, 0),
                1,
            )

        cv2.imshow("Tri des dechets [DEBUG]", frame)
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()
