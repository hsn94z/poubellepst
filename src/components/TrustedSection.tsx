import { Cpu, Leaf, ScanEye, Workflow } from 'lucide-react'
import { GRADIENT_BRAND } from '../lib/theme'
import { FeatureCard } from './FeatureCard'

const features = [
  {
    label: 'Détection',
    icon: <ScanEye size={22} strokeWidth={1.75} />,
    title: 'Reconnaissance intelligente des déchets',
    description:
      'Caméra et modèle YOLOv8 pour identifier le Plastique, le Verre et le Métal en temps réel.',
  },
  {
    label: 'Matériel',
    icon: <Cpu size={22} strokeWidth={1.75} />,
    title: 'Architecture embarquée complète',
    description:
      'Raspberry Pi, servomoteurs, clavier 4×4 et capteurs réunis dans un prototype modulaire.',
  },
  {
    label: 'Automatisation',
    icon: <Workflow size={22} strokeWidth={1.75} />,
    title: 'Tri automatisé de bout en bout',
    description:
      'Le PC envoie la catégorie détectée à la Pi, qui ouvre automatiquement la trappe adaptée.',
  },
  {
    label: 'Impact',
    icon: <Leaf size={22} strokeWidth={1.75} />,
    title: 'Une démarche durable et pédagogique',
    description:
      'Projet PST à l\'ESIEA visant à sensibiliser et améliorer les pratiques de tri des déchets.',
  },
] as const

const highlights = [
  { value: 'YOLOv8', label: 'Détection IA' },
  { value: '3', label: 'Compartiments' },
  { value: 'Temps réel', label: 'Statistiques' },
] as const

export function TrustedSection() {
  return (
    <section
      id="what-we-build"
      className="relative -mt-20 overflow-hidden rounded-t-[40px] bg-white sm:-mt-24 sm:rounded-t-[48px]"
      style={{
        paddingTop: 'clamp(88px, 10vw, 120px)',
        paddingBottom: 'clamp(80px, 10vw, 128px)',
        paddingLeft: 'clamp(20px, 4vw, 48px)',
        paddingRight: 'clamp(20px, 4vw, 48px)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,196,140,0.1), transparent 70%)',
        }}
      />

      <div className="section-container relative flex flex-col items-center gap-14">
        <header className="flex max-w-3xl flex-col items-center gap-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(12,74,56,0.08)] bg-[rgb(248,252,250)] px-4 py-2 text-sm font-medium text-[rgb(12,74,56)]">
            <span className="h-2 w-2 rounded-full bg-[rgb(0,196,140)]" />
            Projet PST · ESIEA
          </div>

          <h2
            className="font-medium leading-[1.15] text-[rgb(12,74,56)]"
            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 500 }}
          >
            Poubelle intelligente,{' '}
            <span className="gradient-text">tri connecté pour un futur durable.</span>
          </h2>

          <p
            className="max-w-2xl leading-relaxed text-[rgb(66,123,101)]"
            style={{ fontSize: 'clamp(16px, 1.2vw, 18px)' }}
          >
            Dans le cadre de notre Projet Scientifique et Technique en 2e année à l&apos;ESIEA,
            nous allions innovation technologique et démarche durable pour optimiser le tri des
            déchets.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[rgba(12,74,56,0.08)] bg-[rgb(248,252,250)] px-5 py-3 text-center"
              >
                <p
                  className="font-medium gradient-text"
                  style={{ fontSize: 'clamp(18px, 1.5vw, 22px)' }}
                >
                  {item.value}
                </p>
                <p className="mt-0.5 text-xs text-[rgb(66,123,101)]">{item.label}</p>
              </div>
            ))}
          </div>
        </header>

        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {features.map((feature) => (
            <FeatureCard
              key={feature.label}
              icon={feature.icon}
              label={feature.label}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        <div
          className="h-px w-full max-w-3xl"
          style={{ background: GRADIENT_BRAND, opacity: 0.35 }}
        />
      </div>
    </section>
  )
}
