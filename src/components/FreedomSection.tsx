const gradientB =
  'linear-gradient(90deg, rgb(0,196,140), rgb(0,227,163) 50%, rgb(152,244,76))'

function HistoryChipIcon() {
  return (
    <svg width="19" height="18" viewBox="0 0 17 16" fill="none" aria-hidden>
      <path
        d="M8.5 2.35C7.85 1.45 6.65 1.05 5.55 1.55C4.35 2.1 3.85 3.35 4.2 4.55C4.55 5.65 8.5 9.15 8.5 9.15C8.5 9.15 12.45 5.65 12.8 4.55C13.15 3.35 12.65 2.1 11.45 1.55C10.35 1.05 9.15 1.45 8.5 2.35Z"
        fill="rgb(0,227,163)"
      />
      <path
        d="M12.25 5.05C11.75 4.45 10.85 4.25 10.05 4.65C9.2 5.05 8.85 5.95 9.1 6.75C9.3 7.45 11.65 9.65 11.65 9.65C11.65 9.65 14 7.45 14.2 6.75C14.45 5.95 14.1 5.05 13.25 4.65C12.45 4.25 11.55 4.45 11.05 5.05H12.25Z"
        fill="rgb(0,227,163)"
      />
    </svg>
  )
}

function StoryCard({
  title,
  paragraphs,
  image,
  imageAlt,
  reverse,
}: {
  title: string
  paragraphs: string[]
  image: string
  imageAlt: string
  reverse?: boolean
}) {
  return (
    <article
      className={`grid overflow-hidden rounded-[26px] border border-[rgba(0,166,126,0.2)] bg-[linear-gradient(135deg,rgba(220,245,255,0.85),rgba(255,255,255,0.96))] shadow-[0_8px_28px_rgba(63,74,126,0.09)] lg:grid-cols-2 ${
        reverse ? 'lg:[&>*:first-child]:order-2' : ''
      }`}
    >
      <div className="flex items-center justify-center p-4 sm:p-6">
        <div className="w-full overflow-hidden rounded-[20px] border border-[rgba(0,166,126,0.15)] bg-white">
          <img src={image} alt={imageAlt} className="h-auto w-full object-cover" loading="lazy" />
        </div>
      </div>

      <div className="flex flex-col justify-center px-6 py-7 sm:px-8 sm:py-10">
        <h3
          className="font-medium leading-tight"
          style={{
            fontSize: 'clamp(28px, 2.2vw, 44px)',
            fontWeight: 500,
            backgroundImage: gradientB,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {title}
        </h3>
        <div className="my-4 h-px w-full" style={{ background: 'rgba(0, 166, 126, 0.35)' }} />
        <div className="space-y-5 text-[rgb(26,11,84)]" style={{ fontSize: 'clamp(15px, 1.1vw, 22px)' }}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="m-0 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  )
}

export function FreedomSection() {
  return (
    <section
      id="our-method"
      className="bg-white"
      style={{ padding: 'clamp(56px, 7vw, 110px) clamp(16px, 3.4vw, 46px)' }}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 sm:gap-12">
        <header className="flex flex-col items-center gap-5 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full bg-[rgb(236,251,244)] text-[rgb(12,74,56)]"
            style={{
              padding: 'clamp(8px, 0.85vw, 13px) clamp(12px, 1.25vw, 20px)',
              fontSize: 'clamp(14px, 1.1vw, 18px)',
              fontWeight: 500,
            }}
          >
            <HistoryChipIcon />
            Histoire du projet
          </div>
        </header>

        <StoryCard
          title="Un projet qui traverse les promotions"
          image="/history/projet-promotions.png"
          imageAlt="Prototype de poubelle connectée dans un atelier"
          paragraphs={[
            "Cette poubelle connectée n'est pas née par hasard. Elle a été imaginée et développée l'an dernier par les étudiants de 2A, avec l'envie de proposer une solution innovante et utile pour la gestion des déchets.",
            "En découvrant ce projet, nous avons été immédiatement séduits par l'idée et son potentiel. Plutôt que de repartir de zéro, nous avons choisi de reprendre ce travail, de le comprendre, puis de le faire évoluer.",
            "Aujourd'hui, notre objectif est clair : améliorer, moderniser et pousser ce projet encore plus loin, en y apportant nos idées, nos compétences et notre vision.",
          ]}
        />

        <StoryCard
          reverse
          title="Un prototype en cours de développement"
          image="/history/prototype-dev.png"
          imageAlt="Schéma de structure du prototype de poubelle"
          paragraphs={[
            "Cette maquette représente un prototype en cours de réalisation, conçu comme un objectif de travail tout au long du projet. Elle ne correspond pas à une version finale, mais à une base sur laquelle nous expérimentons, testons et améliorons différentes solutions techniques.",
            "L'objectif de ce prototype est de valider les principes de fonctionnement de la poubelle connectée : l'intégration des composants, l'organisation de la structure et la faisabilité du système de tri. Il intègre notamment une caméra, un moteur et un bloc central contenant un Raspberry Pi, qui serviront à piloter l'ensemble du dispositif.",
            "Ce prototype évolue progressivement au fil de notre travail. Chaque étape nous permet d'identifier des améliorations possibles et d'affiner notre approche afin d'aboutir, à terme, à une version plus fiable, plus performante et plus proche d'une utilisation réelle.",
          ]}
        />
      </div>
    </section>
  )
}
