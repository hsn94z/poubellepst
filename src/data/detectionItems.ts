/**
 * Ajoutez ici chaque module de détection.
 * Images : public/detection/images/
 * Codes  : public/detection/codes/
 */
export type DetectionItem = {
  id: string
  title: string
  description: string
  previewImage: string
  previewAlt: string
  downloadUrl: string
  downloadLabel: string
  language: string
  extraDownloads?: { url: string; label: string }[]
}

export const detectionItems: DetectionItem[] = [
  {
    id: 'detection-yolo-pc',
    title: 'Détection YOLOv8 (PC)',
    description:
      "Script exécuté sur le PC : capture caméra, détection YOLOv8, catégorisation des déchets (Plastique, Verre, Métal) et envoi du signal à la Raspberry Pi via socket.",
    previewImage: '/detection/images/detection-verre.png',
    previewAlt: 'Exemple de détection Verre avec boîte englobante',
    downloadUrl: '/detection/codes/detection_yolo_pc.py',
    downloadLabel: 'detection_yolo_pc.py',
    language: 'Python · PC',
  },
  {
    id: 'trappe-servos-pi',
    title: 'Trappes & servos (Raspberry Pi)',
    description:
      "Script embarqué sur la Raspberry Pi : contrôle des 3 servos, lecture du clavier 4×4 et réception réseau du PC pour ouvrir la trappe correspondante.",
    previewImage: '/history/finalisation-poubelle.png',
    previewAlt: 'Prototype finalisé avec webcam, servos et sacs de tri',
    downloadUrl: '/detection/codes/trappe_servos_pi.py',
    downloadLabel: 'trappe_servos_pi.py',
    language: 'Python · Raspberry Pi',
  },
]

export const projectCodePanels = [
  {
    title: 'Détection & tri — PC (YOLOv8)',
    subtitle:
      'Boucle caméra, inférence YOLO, stabilisation anti-spam et envoi socket vers la Pi sur le port 5050.',
    platform: 'Ordinateur · OpenCV + Ultralytics',
    fileUrl: '/detection/codes/detection_yolo_pc.py',
    fileName: 'detection_yolo_pc.py',
  },
  {
    title: 'Trappes & servos — Raspberry Pi',
    subtitle:
      'Pilotage GPIO des 3 servos, clavier matriciel 4×4 et serveur TCP qui reçoit les catégories détectées.',
    platform: 'Raspberry Pi · RPi.GPIO',
    fileUrl: '/detection/codes/trappe_servos_pi.py',
    fileName: 'trappe_servos_pi.py',
  },
] as const
