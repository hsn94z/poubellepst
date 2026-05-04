import { ServiceCard } from './ServiceCard'

const bgUrl =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260418_120332_3b24257a-afe6-48ca-875f-78147370f403.png&w=1280&q=85'

const gradientB =
  'linear-gradient(90deg, rgb(0,196,140), rgb(0,227,163) 50%, rgb(152,244,76))'

const accent = 'rgb(0, 227, 163)'

function IconPlanning() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <circle cx="8" cy="8" r="6" fill="none" stroke={accent} strokeWidth="1.25" />
    </svg>
  )
}

function IconProcurement() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <circle cx="8" cy="8" r="6" fill="none" stroke={accent} strokeWidth="1.25" />
      <g fill={accent} transform="matrix(-1 0 0 1 16 0)">
        <circle cx="12" cy="5.5" r="2" />
        <circle cx="12.5" cy="8" r="3" />
        <circle cx="12" cy="11" r="4" />
      </g>
    </svg>
  )
}

function IconLogistics() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <circle cx="8" cy="8" r="6" fill="none" stroke={accent} strokeWidth="1.25" />
      <g fill={accent} transform="matrix(-1 0 0 1 16 0)">
        <circle cx="11.5" cy="5" r="2" />
        <circle cx="12.5" cy="8" r="3" />
        <circle cx="11.5" cy="11.5" r="4" />
      </g>
    </svg>
  )
}

function IconCommissioning() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <circle cx="8" cy="8" r="6" fill="none" stroke={accent} strokeWidth="1.25" />
      <g fill={accent} transform="matrix(-1 0 0 1 16 0)">
        <circle cx="12" cy="5.5" r="2" />
        <circle cx="13" cy="8.5" r="3" />
        <circle cx="12" cy="11.5" r="4" />
      </g>
    </svg>
  )
}

export function TrustedSection() {
  return (
    <section
      id="what-we-build"
      className="relative"
      style={{
        backgroundImage: `url("${bgUrl}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(5, 46, 35, 0.72)',
        backgroundBlendMode: 'multiply',
        padding: `clamp(100px, 12vw, 180px) clamp(16px, 4vw, 40px) clamp(100px, 12vw, 160px)`,
      }}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-[110px]">
        <header className="flex max-w-[1200px] flex-col items-center gap-5 text-center">
          <h2
            className="font-medium text-white"
            style={{
              fontSize: 'clamp(32px, 4vw, 56px)',
              lineHeight: 1.2,
              fontWeight: 500,
            }}
          >
            Poubelle intelligente
            <br />
            <span
              style={{
                backgroundImage: gradientB,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              tri connecte pour un futur durable.
            </span>
          </h2>
          <p
            className="max-w-3xl font-normal text-[rgb(178,233,214)]"
            style={{ fontSize: 'clamp(14px, 1.25vw, 18px)' }}
          >
            Dans le cadre de notre Projet Scientifique et Technique en 2e annee a l'ESIEA, nous
            allions innovation technologique et demarche durable pour optimiser le tri des dechets.
          </p>
        </header>
        <div className="grid w-full grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <ServiceCard
            label="Detection"
            icon={<IconPlanning />}
            title={'Reconnaissance rapide\ndes dechets via capteurs\net intelligence artificielle.'}
            bullets={['Classification automatisee', 'Analyse en temps reel']}
          />
          <ServiceCard
            label="Materiel"
            icon={<IconProcurement />}
            title={'Microcontroleur,\ncapteurs et composants\nintegres dans un systeme unique.'}
            bullets={['Architecture embarquee', 'Montage evolutif']}
          />
          <ServiceCard
            label="Automatisation"
            icon={<IconLogistics />}
            title={'Tri intelligent des\ndechets avec orientation\nautomatique des flux.'}
            bullets={['Moins d erreurs de tri', 'Flux plus propres']}
          />
          <ServiceCard
            label="Impact"
            icon={<IconCommissioning />}
            title="Sensibiliser les utilisateurs a des pratiques plus responsables."
            bullets={['Demarche durable', 'Usage pedagogique']}
          />
        </div>
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[180px]"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgb(255,255,255))',
        }}
      />
    </section>
  )
}
