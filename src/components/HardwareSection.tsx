import { GRADIENT_CARD, SECTION_PADDING, cardHoverClass } from '../lib/theme'
import { SectionHeader } from './ui/SectionHeader'

const hardwareItems = [
  {
    title: 'Raspberry Pi 4 – 4 Go',
    description:
      "Cœur du système embarqué, il exécute les algorithmes d'IA, gère les capteurs et pilote les actionneurs.",
    image: '/hardware/raspberry-pi.png',
    imageAlt: 'Carte Raspberry Pi 4',
  },
  {
    title: 'Caméra Raspberry Pi Noir',
    description:
      'Capte les images des déchets pour la reconnaissance visuelle par intelligence artificielle.',
    image: '/hardware/camera.png',
    imageAlt: 'Module caméra Raspberry Pi',
  },
  {
    title: "Bloc d'alimentation fixe",
    description:
      'Alimente de manière stable et sécurisée le Raspberry Pi et ses périphériques.',
    image: '/hardware/alimentation.png',
    imageAlt: "Bloc d'alimentation Raspberry Pi officiel",
  },
  {
    title: 'Micro-servomoteur MG996R',
    description:
      'Actionne mécaniquement les couvercles des bacs de tri après détection.',
    image: '/hardware/servomoteur.png',
    imageAlt: 'Micro-servomoteur MG996R',
  },
  {
    title: 'Carte microSD 64 Go',
    description:
      "Stocke le système d'exploitation, les données collectées et les modèles d'IA.",
    image: '/hardware/microsd.png',
    imageAlt: 'Carte microSD SanDisk 64 Go',
  },
] as const

function HardwareChipIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 17 16" fill="none" aria-hidden>
      <rect x="2" y="3" width="13" height="10" rx="2" stroke="rgb(0,212,170)" strokeWidth="1.2" fill="none" />
      <path d="M5 6h7M5 9h5" stroke="rgb(0,227,163)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function HardwareCard({
  title,
  description,
  image,
  imageAlt,
  imageRight,
}: {
  title: string
  description: string
  image: string
  imageAlt: string
  imageRight: boolean
}) {
  return (
    <article
      className={`flex flex-col gap-6 overflow-hidden rounded-3xl border border-[rgba(12,74,56,0.08)] shadow-[0_4px_24px_rgba(12,74,56,0.06)] sm:gap-0 lg:flex-row lg:items-stretch ${cardHoverClass} ${
        imageRight ? 'lg:flex-row-reverse' : ''
      }`}
      style={{ background: GRADIENT_CARD }}
    >
      <div
        className={`flex flex-1 flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 ${
          imageRight ? 'lg:pl-8' : 'lg:pr-8'
        }`}
      >
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
      </div>

      <div
        className={`flex shrink-0 items-center justify-center p-5 sm:p-6 lg:w-[min(46%,400px)] ${
          imageRight ? 'lg:pr-8' : 'lg:pl-8'
        }`}
      >
        <div className="flex w-full max-w-[340px] items-center justify-center rounded-2xl border border-[rgba(12,74,56,0.06)] bg-white p-5 shadow-[0_4px_20px_rgba(12,74,56,0.05)]">
          <img
            src={image}
            alt={imageAlt}
            className="h-auto max-h-[220px] w-full object-contain sm:max-h-[240px]"
            loading="lazy"
          />
        </div>
      </div>
    </article>
  )
}

export function HardwareSection() {
  return (
    <section
      id="materiel"
      className="scroll-mt-28 bg-white"
      style={{ padding: SECTION_PADDING }}
    >
      <div className="section-container flex flex-col gap-12">
        <SectionHeader
          badge="Matériel"
          badgeIcon={<HardwareChipIcon />}
          title="Les composants de notre"
          titleAccent="poubelle intelligente"
          description="Chaque élément joue un rôle précis dans la détection, le tri automatisé et le fonctionnement embarqué du système."
        />

        <div className="flex flex-col gap-8">
          {hardwareItems.map((item, index) => (
            <HardwareCard
              key={item.title}
              title={item.title}
              description={item.description}
              image={item.image}
              imageAlt={item.imageAlt}
              imageRight={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
