import type { ReactNode } from 'react'
import { useState } from 'react'

const hoverImg =
  'https://cdn.prod.website-files.com/6720dd1ab6df0da205830ab1/682c7cb62b8800a7594c5abd_hover_card_img.png'
const bulletSvg =
  'https://cdn.prod.website-files.com/6720dd1ab6df0da205830ab1/683ef70a24657b10be91ef49_bullet-list.svg'

type ServiceCardProps = {
  label: string
  icon: ReactNode
  title: string
  bullets: string[]
}

export function ServiceCard({ label, icon, title, bullets }: ServiceCardProps) {
  const [hover, setHover] = useState(false)

  return (
    <article
      className="relative flex cursor-default flex-col overflow-hidden rounded-3xl border border-white/10 bg-[rgba(4,30,22,0.88)] backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-[0_16px_48px_rgba(0,0,0,0.25)]"
      style={{
        height: 'clamp(300px, 30vw, 460px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="pointer-events-none absolute top-0 z-[1] h-[55%] w-full overflow-hidden transition-all duration-500"
        style={{
          opacity: hover ? 1 : 0.6,
          transform: hover ? 'translateY(0)' : 'translateY(-25%)',
        }}
      >
        <img src={hoverImg} alt="" className="h-full w-full object-cover object-top" />
      </div>
      <div
        className="pointer-events-none absolute bottom-0 z-[1] h-[55%] w-full transition-all duration-500"
        style={{
          background: 'linear-gradient(to top, rgba(4,30,22,0.95) 60%, transparent)',
          opacity: hover ? 1 : 0,
          transform: hover ? 'translateY(0)' : 'translateY(100%)',
        }}
      />
      <div
        className="relative z-[2] flex h-full flex-col"
        style={{ padding: 'clamp(20px, 2vw, 32px)' }}
      >
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[rgb(16,56,44)] px-3 py-1.5 text-xs font-medium text-white">
          <span className="flex shrink-0 items-center">{icon}</span>
          {label}
        </div>
        <div className="min-h-0 flex-1" />
        <h3
          className="font-medium leading-snug text-white transition-transform duration-500"
          style={{
            fontSize: 'clamp(16px, 1.6vw, 22px)',
            fontWeight: 500,
            transform: hover ? 'translateY(-6px)' : 'none',
          }}
        >
          <span className="whitespace-pre-line">{title}</span>
        </h3>
        <ul className="mt-4 flex flex-col gap-2">
          {bullets.map((b) => (
            <li
              key={b}
              className="leading-snug text-[rgb(170,236,210)]"
              style={{
                fontSize: 'clamp(12px, 1vw, 14px)',
                paddingLeft: '24px',
                backgroundImage: `url("${bulletSvg}")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '16px 16px',
                backgroundPosition: '0% 50%',
                filter: 'hue-rotate(70deg) saturate(1.6) brightness(1.15)',
              }}
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
