import { Download } from 'lucide-react'
import { detectionItems, projectCodePanels } from '../data/detectionItems'
import { GRADIENT_BRAND, GRADIENT_CARD, SECTION_PADDING, cardHoverClass } from '../lib/theme'
import { CodePanel } from './CodePanel'
import { SectionHeader } from './ui/SectionHeader'

function DetectionChipIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 17 16" fill="none" aria-hidden>
      <path d="M3 4h11v8H3z" stroke="rgb(0,212,170)" strokeWidth="1.2" fill="none" />
      <path d="M6 7h5M6 9h3" stroke="rgb(0,227,163)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function DetectionCard({
  title,
  description,
  previewImage,
  previewAlt,
  downloadUrl,
  downloadLabel,
  language,
  extraDownloads,
  imageRight,
}: {
  title: string
  description: string
  previewImage: string
  previewAlt: string
  downloadUrl: string
  downloadLabel: string
  language: string
  extraDownloads?: { url: string; label: string }[]
  imageRight: boolean
}) {
  return (
    <article
      className={`flex flex-col gap-6 overflow-hidden rounded-3xl border border-[rgba(12,74,56,0.08)] shadow-[0_4px_24px_rgba(12,74,56,0.06)] sm:gap-0 lg:flex-row lg:items-stretch ${cardHoverClass} ${
        imageRight ? 'lg:flex-row-reverse' : ''
      }`}
      style={{ background: GRADIENT_CARD }}
    >
      <div className="flex items-center justify-center p-5 sm:p-6 lg:w-[min(44%,380px)]">
        <div className="flex h-full min-h-[220px] w-full items-center justify-center overflow-hidden rounded-2xl border border-[rgba(12,74,56,0.06)] bg-white p-3 sm:min-h-[260px]">
          <img
            src={previewImage}
            alt={previewAlt}
            className="h-full max-h-[260px] w-full object-contain"
            loading="lazy"
          />
        </div>
      </div>

      <div
        className={`flex flex-1 flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 ${
          imageRight ? 'lg:pl-8' : 'lg:pr-8'
        }`}
      >
        <div className="mb-3 inline-flex w-fit rounded-full bg-[rgb(236,251,244)] px-3 py-1 text-xs font-medium text-[rgb(12,74,56)]">
          {language}
        </div>
        <h3
          className="font-medium leading-tight gradient-text"
          style={{ fontSize: 'clamp(22px, 2.2vw, 30px)', fontWeight: 500 }}
        >
          {title}
        </h3>
        <div className="my-4 h-px w-full max-w-[240px] bg-[rgba(12,74,56,0.1)]" />
        <p
          className="m-0 max-w-xl leading-relaxed text-[rgb(66,123,101)]"
          style={{ fontSize: 'clamp(15px, 1.1vw, 17px)' }}
        >
          {description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={downloadUrl}
            download={downloadLabel}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white transition hover:opacity-95"
            style={{ background: GRADIENT_BRAND }}
          >
            <Download size={18} aria-hidden />
            Télécharger {downloadLabel}
          </a>
          {extraDownloads?.map((file) => (
            <a
              key={file.url}
              href={file.url}
              download={file.label}
              className="inline-flex items-center gap-2 rounded-xl border border-[rgba(12,74,56,0.12)] bg-white px-5 py-3 text-sm font-medium text-[rgb(12,74,56)] transition hover:bg-[rgb(240,250,245)]"
            >
              <Download size={18} aria-hidden />
              {file.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}

export function DetectionSection() {
  return (
    <section
      id="detection"
      className="scroll-mt-28 bg-[rgb(248,252,250)]"
      style={{ padding: SECTION_PADDING }}
    >
      <div className="section-container flex flex-col gap-12">
        <SectionHeader
          badge="Codes & détection"
          badgeIcon={<DetectionChipIcon />}
          title="Nos scripts de"
          titleAccent="détection d'objets"
          description="Scripts Python du projet : détection IA sur PC et pilotage des trappes sur Raspberry Pi."
        />

        {detectionItems.length === 0 ? (
          <div className="w-full rounded-3xl border border-dashed border-[rgba(12,74,56,0.15)] bg-white px-6 py-14 text-center">
            <p className="m-0 text-lg font-medium text-[rgb(12,74,56)]">Contenu en cours d'ajout</p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[rgb(66,123,101)]">
              Envoyez vos images de détection et vos fichiers de code pour enrichir cette section.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {detectionItems.map((item, index) => (
              <DetectionCard
                key={item.id}
                title={item.title}
                description={item.description}
                previewImage={item.previewImage}
                previewAlt={item.previewAlt}
                downloadUrl={item.downloadUrl}
                downloadLabel={item.downloadLabel}
                language={item.language}
                extraDownloads={item.extraDownloads}
                imageRight={index % 2 === 1}
              />
            ))}
          </div>
        )}

        <div className="flex flex-col gap-6">
          <div className="text-center">
            <h3 className="text-xl font-medium text-[rgb(12,74,56)]">Code source du projet</h3>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-[rgb(66,123,101)]">
              Architecture en deux parties : le PC analyse les déchets via YOLOv8 et envoie la
              catégorie à la Raspberry Pi, qui ouvre la trappe correspondante.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {projectCodePanels.map((panel) => (
              <CodePanel
                key={panel.fileUrl}
                title={panel.title}
                subtitle={panel.subtitle}
                platform={panel.platform}
                fileUrl={panel.fileUrl}
                fileName={panel.fileName}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
