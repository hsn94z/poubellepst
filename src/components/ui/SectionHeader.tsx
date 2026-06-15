import type { ReactNode } from 'react'
import { GRADIENT_BRAND } from '../../lib/theme'

type SectionHeaderProps = {
  badge: string
  badgeIcon?: ReactNode
  title: string
  titleAccent?: string
  description?: string
  dark?: boolean
}

export function SectionHeader({
  badge,
  badgeIcon,
  title,
  titleAccent,
  description,
  dark = false,
}: SectionHeaderProps) {
  return (
    <header className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
      <div
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
          dark ? 'bg-white/10 text-white' : 'bg-[rgb(236,251,244)] text-[rgb(12,74,56)]'
        }`}
      >
        {badgeIcon}
        {badge}
      </div>
      <h2
        className={`font-medium leading-tight ${dark ? 'text-white' : 'text-[rgb(12,74,56)]'}`}
        style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 500 }}
      >
        {title}
        {titleAccent ? (
          <>
            {' '}
            <span
              style={{
                backgroundImage: GRADIENT_BRAND,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {titleAccent}
            </span>
          </>
        ) : null}
      </h2>
      {description ? (
        <p
          className={`m-0 max-w-xl leading-relaxed ${
            dark ? 'text-[rgb(178,233,214)]' : 'text-[rgb(66,123,101)]'
          }`}
          style={{ fontSize: 'clamp(15px, 1.1vw, 18px)' }}
        >
          {description}
        </p>
      ) : null}
    </header>
  )
}
