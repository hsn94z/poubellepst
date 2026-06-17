import { GRADIENT_CARD, SECTION_PADDING, cardClass, cardHoverClass } from '../lib/theme'
import { SectionHeader } from './ui/SectionHeader'

function HistoryChipIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 17 16" fill="none" aria-hidden>
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
      className={`grid overflow-hidden rounded-3xl border border-[rgba(12,74,56,0.08)] shadow-[0_4px_24px_rgba(12,74,56,0.06)] lg:grid-cols-2 ${cardHoverClass} ${
        reverse ? 'lg:[&>*:first-child]:order-2' : ''
      }`}
      style={{ background: GRADIENT_CARD }}
    >
      <div className="flex items-center justify-center p-5 sm:p-6">
        <div className="flex h-full min-h-[260px] w-full items-center justify-center overflow-hidden rounded-2xl border border-[rgba(12,74,56,0.06)] bg-white p-3 sm:min-h-[300px]">
          <img
            src={image}
            alt={imageAlt}
            className="h-full max-h-[400px] w-full object-contain"
            loading="lazy"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10">
        <h3
          className="font-medium leading-tight gradient-text"
          style={{ fontSize: 'clamp(24px, 2.2vw, 36px)', fontWeight: 500 }}
        >
          {title}
        </h3>
        <div className="my-4 h-px w-full bg-[rgba(12,74,56,0.1)]" />
        <div className="space-y-4 text-[rgb(66,123,101)]" style={{ fontSize: 'clamp(15px, 1.1vw, 17px)' }}>
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

function ConstructionGallery() {
  const photos = [
    {
      src: '/history/construction-maquette.png',
      alt: "Maquette de la poubelle connectée en cours de construction dans l'atelier",
      caption: 'Assemblage de la structure : base en bois, tuyau central et plateau de tri.',
      featured: true,
    },
    {
      src: '/history/construction-raspberry.png',
      alt: "Raspberry Pi et câblage électronique à l'intérieur de la maquette",
      caption: 'Intégration du Raspberry Pi et du câblage GPIO dans le boîtier.',
    },
    {
      src: '/history/construction-plateau.png',
      alt: 'Plateau de tri avec trappes circulaires, clavier et servomoteur',
      caption: 'Plateau supérieur : trappes de tri, clavier numérique et servomoteur.',
    },
  ] as const

  const [featured, ...others] = photos

  return (
    <article className={`${cardClass} p-6 sm:p-8`}>
      <div className="mx-auto max-w-2xl text-center">
        <h3
          className="font-medium leading-tight gradient-text"
          style={{ fontSize: 'clamp(24px, 2.2vw, 34px)', fontWeight: 500 }}
        >
          Construction de la maquette
        </h3>
        <div className="mx-auto my-4 h-px w-full max-w-[200px] bg-[rgba(12,74,56,0.1)]" />
        <p className="m-0 leading-relaxed text-[rgb(66,123,101)]" style={{ fontSize: 'clamp(15px, 1.1vw, 17px)' }}>
          Quelques photos prises pendant l&apos;assemblage : structure, électronique et mécanique
          de tri.
        </p>
      </div>

      <figure
        className={`group mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-[rgba(12,74,56,0.06)] bg-white shadow-[0_4px_20px_rgba(12,74,56,0.05)] ${cardHoverClass}`}
      >
        <div className="overflow-hidden bg-[rgb(248,252,250)]">
          <img
            src={featured.src}
            alt={featured.alt}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
        <figcaption className="px-5 py-4 text-sm leading-snug text-[rgb(66,123,101)]">
          {featured.caption}
        </figcaption>
      </figure>

      <div className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
        {others.map((photo) => (
          <figure
            key={photo.src}
            className={`group overflow-hidden rounded-2xl border border-[rgba(12,74,56,0.06)] bg-white shadow-[0_4px_20px_rgba(12,74,56,0.05)] ${cardHoverClass}`}
          >
            <div className="aspect-[4/5] overflow-hidden bg-[rgb(248,252,250)]">
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
            <figcaption className="px-4 py-3 text-sm leading-snug text-[rgb(66,123,101)] sm:px-5 sm:py-4">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </article>
  )
}

export function FreedomSection() {
  return (
    <section
      id="our-method"
      className="scroll-mt-28 bg-white"
      style={{ padding: SECTION_PADDING }}
    >
      <div className="section-container flex flex-col gap-10 sm:gap-12">
        <SectionHeader
          badge="Histoire du projet"
          badgeIcon={<HistoryChipIcon />}
          title="Notre parcours et"
          titleAccent="notre prototype"
          description="De la reprise du projet par notre promotion à la construction progressive de la maquette connectée."
        />

        <StoryCard
          title="Un projet qui traverse les promotions"
          image="/history/projet-promotions.png"
          imageAlt="Prototype de poubelle connectée dans un atelier"
          paragraphs={[
            "Ce projet s'inscrit dans la continuité d'un travail initié par les étudiants de 2e année, avec l'ambition de proposer une solution innovante au service de la gestion des déchets.",
            "Forts de cette base, nous avons choisi d'en assurer la reprise afin de l'analyser, de la consolider et d'en favoriser l'évolution au sein de notre promotion.",
            "Notre objectif consiste à enrichir ce dispositif par de nouvelles compétences, de nouvelles approches techniques et une vision renouvelée de son déploiement.",
          ]}
        />

        <StoryCard
          reverse
          title="Un prototype en cours de développement"
          image="/history/prototype-dev.png"
          imageAlt="Schéma de structure du prototype de poubelle"
          paragraphs={[
            "Cette maquette constitue un prototype de travail, conçu pour accompagner l'ensemble du projet. Elle ne constitue pas une version définitive, mais une base d'expérimentation, de tests et d'améliorations successives.",
            "Elle vise à valider les principes de fonctionnement de la poubelle connectée : intégration des composants, organisation de la structure et faisabilité du système de tri. Elle associe notamment une caméra, des actionneurs et un Raspberry Pi chargé de piloter l'ensemble du dispositif.",
            "Ce prototype évolue de manière progressive. Chaque étape permet d'identifier des axes d'amélioration et d'affiner notre démarche en vue d'une version plus fiable, plus performante et adaptée à un usage concret.",
          ]}
        />

        <ConstructionGallery />

        <StoryCard
          title="Achèvement du prototype"
          image="/history/finalisation-poubelle.png"
          imageAlt="Prototype abouti de la poubelle connectée avec webcam et sacs de tri"
          reverse
          paragraphs={[
            "Après plusieurs phases d'assemblage et de validation, le prototype atteint une maturité technique avancée. La structure est stabilisée, les trappes de tri sont opérationnelles et les dispositifs de collecte sont intégrés sous chaque compartiment.",
            "Une webcam est positionnée au-dessus du plateau afin de capturer les déchets déposés. Le script YOLOv8, exécuté sur un ordinateur dédié, analyse les images en temps réel et transmet la catégorie détectée à la Raspberry Pi via le réseau.",
            "La Raspberry Pi reçoit ce signal et actionne le servomoteur correspondant afin d'ouvrir la trappe adaptée — Plastique, Verre ou Métal. L'ensemble constitue un système de tri connecté fonctionnel de bout en bout.",
          ]}
        />
      </div>
    </section>
  )
}
