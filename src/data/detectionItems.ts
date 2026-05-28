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
  /** Fichiers complémentaires (ex. module servos) */
  extraDownloads?: { url: string; label: string }[]
}

export const detectionItems: DetectionItem[] = [
  {
    id: 'tri-dechets-yolo',
    title: 'Détection & tri des déchets (YOLOv8)',
    description:
      "Script complet regroupant la classification des objets (Verre, Plastique, Carton/Papier, Métal), la boucle caméra et l'affichage debug. Exemple de résultat : détection « Verre ».",
    previewImage: '/detection/images/detection-verre.png',
    previewAlt: 'Exemple de détection Verre avec boîte englobante',
    downloadUrl: '/detection/codes/tri_dechets_detection.py',
    downloadLabel: 'tri_dechets_detection.py',
    language: 'Python',
    extraDownloads: [
      {
        url: '/detection/codes/servos_tris.py',
        label: 'servos_tris.py',
      },
    ],
  },
]
