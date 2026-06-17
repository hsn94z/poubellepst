import type { ReactNode } from 'react'

type FeatureCardProps = {
  icon: ReactNode
  label: string
  title: string
  description: string
}

export function FeatureCard({ icon, label, title, description }: FeatureCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-[rgba(12,74,56,0.08)] bg-white p-6 shadow-[0_4px_24px_rgba(12,74,56,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(0,196,140,0.25)] hover:shadow-[0_16px_40px_rgba(12,74,56,0.1)] sm:p-7">
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(circle, rgba(0,196,140,0.12), transparent 70%)' }}
      />
      <div className="relative">
        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgb(236,251,244)] text-[rgb(0,166,126)] ring-1 ring-[rgba(0,196,140,0.15)]">
          {icon}
        </div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[rgb(0,166,126)]">
          {label}
        </p>
        <h3
          className="mt-2 font-medium leading-snug text-[rgb(12,74,56)]"
          style={{ fontSize: 'clamp(17px, 1.5vw, 20px)' }}
        >
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[rgb(66,123,101)]">{description}</p>
      </div>
    </article>
  )
}
