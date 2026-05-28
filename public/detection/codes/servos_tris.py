"""
Contrôle des servos pour ouvrir/fermer les trappes de tri.
Module complémentaire au script de détection.
"""

import threading
import time

# import RPi.GPIO as GPIO
# GPIO.setmode(GPIO.BCM)

SERVO_PINS = {
    "Verre": 17,
    "Plastique": 27,
    "Carton / Papier": 22,
}

ANGLE_OUVERT = 90
ANGLE_FERME = 0
DUREE_OUVERTURE = 1.5

servos = {}


def init_servos() -> None:
    for categorie, pin in SERVO_PINS.items():
        # GPIO.setup(pin, GPIO.OUT)
        # pwm = GPIO.PWM(pin, 50)
        # pwm.start(angle_vers_duty(ANGLE_FERME))
        # servos[categorie] = pwm
        print(f"[SERVO] Init servo '{categorie}' sur GPIO {pin}")


def angle_vers_duty(angle: float) -> float:
    return 2.5 + (angle / 180.0) * 10.0


def bouger_servo(categorie: str) -> None:
    if categorie not in SERVO_PINS:
        return

    def _action() -> None:
        print(f"[SERVO] Ouverture trappe -> {categorie}")
        # servos[categorie].ChangeDutyCycle(angle_vers_duty(ANGLE_OUVERT))
        time.sleep(DUREE_OUVERTURE)
        # servos[categorie].ChangeDutyCycle(angle_vers_duty(ANGLE_FERME))
        time.sleep(0.3)
        # servos[categorie].ChangeDutyCycle(0)
        print(f"[SERVO] Fermeture trappe -> {categorie}")

    t = threading.Thread(target=_action, daemon=True)
    t.start()
