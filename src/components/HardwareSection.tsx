const gradientB =
  'linear-gradient(90deg, rgb(0,196,140), rgb(0,227,163) 50%, rgb(152,244,76))'

const cardGradient =
  'linear-gradient(135deg, rgba(220, 255, 245, 0.95) 0%, rgba(255, 255, 255, 0.98) 55%, rgba(232, 248, 255, 0.9) 100%)'

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
    title: 'Carte microSD 64 Go',
    description:
      "Stocke le système d'exploitation, les données collectées et les modèles d'IA.",
    image: '/hardware/microsd.png',
    imageAlt: 'Carte microSD SanDisk 64 Go',
  },
  {
    title: 'Micro-servomoteur MG996R',
    description:
      'Actionne mécaniquement les couvercles des bacs de tri après détection.',
    image: '/hardware/servomoteur.png',
    imageAlt: 'Micro-servomoteur MG996R',
  },
  {
    title: "Bloc d'alimentation fixe",
    description:
      'Alimente de manière stable et sécurisée le Raspberry Pi et ses périphériques.',
    image: '/hardware/alimentation.png',
    imageAlt: 'Bloc d alimentation Raspberry Pi officiel',
  },
] as const

function HardwareChipIcon() {
  return (
    <svg width="19" height="18" viewBox="0 0 17 16" fill="none" aria-hidden>
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
      className={`flex flex-col gap-6 overflow-hidden rounded-[28px] border border-[rgba(0,212,170,0.28)] shadow-[0_8px_32px_rgba(0,80,60,0.08)] sm:gap-0 lg:flex-row lg:items-stretch ${
        imageRight ? 'lg:flex-row-reverse' : ''
      }`}
      style={{ background: cardGradient }}
    >
      <div
        className={`flex flex-1 flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 ${
          imageRight ? 'lg:pl-8' : 'lg:pr-8'
        }`}
      >
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
      </div>

      <div
        className={`flex shrink-0 items-center justify-center p-5 sm:p-6 lg:w-[min(48%,420px)] ${
          imageRight ? 'lg:pr-8' : 'lg:pl-8'
        }`}
      >
        <div className="flex w-full max-w-[360px] items-center justify-center rounded-[20px] bg-white p-4 shadow-[0_4px_24px_rgba(0,60,45,0.06)] sm:p-5">
          <img
            src={image}
            alt={imageAlt}
            className="h-auto max-h-[220px] w-full object-contain sm:max-h-[260px]"
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
      style={{
        padding: `clamp(72px, 10vw, 140px) clamp(16px, 4vw, 48px)`,
      }}
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
            <HardwareChipIcon />
            Matériel
          </div>
          <h2
            className="font-medium leading-[1.2] text-[rgb(26,11,84)]"
            style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 500 }}
          >
            Les composants de notre{' '}
            <span
              style={{
                backgroundImage: gradientB,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              poubelle intelligente
            </span>
          </h2>
          <p
            className="m-0 font-normal text-[rgb(100,80,160)]"
            style={{ fontSize: 'clamp(15px, 1.2vw, 18px)' }}
          >
            Chaque élément joue un rôle précis dans la détection, le tri automatisé et le
            fonctionnement embarqué du système.
          </p>
        </header>

        <div className="flex w-full flex-col gap-8 sm:gap-10">
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
