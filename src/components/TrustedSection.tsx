import { ServiceCard } from './ServiceCard'
import { GRADIENT_BRAND } from '../lib/theme'

const bgUrl =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260418_120332_3b24257a-afe6-48ca-875f-78147370f403.png&w=1280&q=85'

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
        backgroundColor: 'rgba(5, 46, 35, 0.78)',
        backgroundBlendMode: 'multiply',
        padding: 'clamp(100px, 12vw, 160px) clamp(20px, 4vw, 48px)',
      }}
    >
      <div className="section-container flex flex-col items-center gap-16">
        <header className="flex max-w-3xl flex-col items-center gap-5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
            Projet PST · ESIEA
          </div>
          <h2
            className="font-medium leading-tight text-white"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 500 }}
          >
            Poubelle intelligente,
            <br />
            <span
              style={{
                backgroundImage: GRADIENT_BRAND,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              tri connecté pour un futur durable.
            </span>
          </h2>
          <p
            className="max-w-2xl leading-relaxed text-[rgb(178,233,214)]"
            style={{ fontSize: 'clamp(15px, 1.2vw, 18px)' }}
          >
            Dans le cadre de notre Projet Scientifique et Technique en 2e année à l&apos;ESIEA,
            nous allions innovation technologique et démarche durable pour optimiser le tri des
            déchets.
          </p>
        </header>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ServiceCard
            label="Détection"
            icon={<IconPlanning />}
            title={'Reconnaissance rapide\ndes déchets via capteurs\net intelligence artificielle.'}
            bullets={['Classification automatisée', 'Analyse en temps réel']}
          />
          <ServiceCard
            label="Matériel"
            icon={<IconProcurement />}
            title={'Microcontrôleur,\ncapteurs et composants\nintégrés dans un système unique.'}
            bullets={['Architecture embarquée', 'Montage évolutif']}
          />
          <ServiceCard
            label="Automatisation"
            icon={<IconLogistics />}
            title={'Tri intelligent des\ndéchets avec orientation\nautomatique des flux.'}
            bullets={['Moins d\'erreurs de tri', 'Flux plus propres']}
          />
          <ServiceCard
            label="Impact"
            icon={<IconCommissioning />}
            title="Sensibiliser les utilisateurs à des pratiques plus responsables."
            bullets={['Démarche durable', 'Usage pédagogique']}
          />
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
        style={{ background: 'linear-gradient(to bottom, transparent, rgb(255,255,255))' }}
      />
    </section>
  )
}
