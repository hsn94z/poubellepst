import { Download } from 'lucide-react'
import { detectionItems } from '../data/detectionItems'

const gradientB =
  'linear-gradient(90deg, rgb(0,196,140), rgb(0,227,163) 50%, rgb(152,244,76))'

const cardGradient =
  'linear-gradient(135deg, rgba(220, 255, 245, 0.95) 0%, rgba(255, 255, 255, 0.98) 55%, rgba(232, 248, 255, 0.9) 100%)'

function DetectionChipIcon() {
  return (
    <svg width="19" height="18" viewBox="0 0 17 16" fill="none" aria-hidden>
      <path
        d="M3 4h11v8H3z"
        stroke="rgb(0,212,170)"
        strokeWidth="1.2"
        fill="none"
      />
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
      className={`flex flex-col gap-6 overflow-hidden rounded-[28px] border border-[rgba(0,212,170,0.28)] shadow-[0_8px_32px_rgba(0,80,60,0.08)] transition-shadow hover:shadow-[0_12px_40px_rgba(0,80,60,0.12)] sm:gap-0 lg:flex-row lg:items-stretch ${
        imageRight ? 'lg:flex-row-reverse' : ''
      }`}
      style={{ background: cardGradient }}
    >
      <div className="flex items-center justify-center p-4 sm:p-6 lg:w-[min(46%,400px)]">
        <div className="flex h-full min-h-[220px] w-full items-center justify-center overflow-hidden rounded-[20px] border border-[rgba(0,166,126,0.15)] bg-white p-2 sm:min-h-[260px]">
          <img
            src={previewImage}
            alt={previewAlt}
            className="h-full max-h-[280px] w-full object-contain"
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
          className="font-medium leading-tight"
          style={{
            fontSize: 'clamp(22px, 2.2vw, 32px)',
            fontWeight: 500,
            backgroundImage: gradientB,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {title}
        </h3>
        <div
          className="my-4 h-px w-full max-w-[280px]"
          style={{ background: 'rgba(0, 166, 126, 0.35)' }}
        />
        <p
          className="m-0 max-w-xl font-normal leading-relaxed text-[rgb(26,11,84)]"
          style={{ fontSize: 'clamp(15px, 1.15vw, 18px)' }}
        >
          {description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={downloadUrl}
            download={downloadLabel}
            className="inline-flex w-fit items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white transition hover:opacity-95"
            style={{
              background:
                'linear-gradient(90deg, rgb(0,166,126), rgb(0,212,170) 50%, rgb(152,244,76))',
            }}
          >
            <Download size={18} aria-hidden />
            Télécharger {downloadLabel}
          </a>
          {extraDownloads?.map((file) => (
            <a
              key={file.url}
              href={file.url}
              download={file.label}
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-[rgba(0,166,126,0.35)] bg-white px-5 py-3 text-sm font-medium text-[rgb(12,74,56)] transition hover:bg-[rgb(236,251,244)]"
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
      className="scroll-mt-28 bg-white"
      style={{ padding: 'clamp(72px, 10vw, 140px) clamp(16px, 4vw, 48px)' }}
    >
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-[clamp(40px,5vw,72px)]">
        <header className="flex max-w-[800px] flex-col items-center gap-5 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-[36px] bg-[rgb(249,249,249)] font-medium text-[rgb(26,11,84)]"
            style={{
              padding: 'clamp(8px, 0.9vw, 14px) clamp(12px, 1.25vw, 20px)',
              fontSize: 'clamp(14px, 1.1vw, 18px)',
              fontWeight: 500,
              gap: '8px',
            }}
          >
            <DetectionChipIcon />
            Codes & détection
          </div>
          <h2
            className="font-medium leading-[1.2] text-[rgb(26,11,84)]"
            style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 500 }}
          >
            Nos scripts de{' '}
            <span
              style={{
                backgroundImage: gradientB,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              détection d&apos;objets
            </span>
          </h2>
          <p
            className="m-0 font-normal text-[rgb(100,80,160)]"
            style={{ fontSize: 'clamp(15px, 1.2vw, 18px)' }}
          >
            Chaque carte présente un exemple visuel de détection et le fichier de code associé,
            prêt à être téléchargé.
          </p>
        </header>

        {detectionItems.length === 0 ? (
          <div
            className="w-full rounded-[26px] border border-dashed border-[rgba(0,166,126,0.35)] bg-[rgb(246,255,251)] px-6 py-12 text-center"
          >
            <p className="m-0 text-lg font-medium text-[rgb(12,74,56)]">
              Contenu en cours d&apos;ajout
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[rgb(66,123,101)]">
              Envoyez vos images de détection et vos fichiers de code : ils seront placés dans{' '}
              <code className="rounded bg-white px-1.5 py-0.5">public/detection/</code> puis
              déclarés dans <code className="rounded bg-white px-1.5 py-0.5">src/data/detectionItems.ts</code>.
            </p>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-8 sm:gap-10">
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
      </div>
    </section>
  )
}
