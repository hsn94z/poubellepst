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
      className="relative flex cursor-pointer flex-col overflow-hidden rounded-[36px] border border-white/5 bg-[rgba(4,30,22,0.88)] backdrop-blur-[36px] transition-shadow duration-300 hover:shadow-lg"
      style={{
        height: 'clamp(320px, 32vw, 500px)',
        WebkitBackdropFilter: 'blur(36px)',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="pointer-events-none absolute top-0 z-[1] h-[55%] w-full overflow-hidden transition-all duration-500"
        style={{
          opacity: hover ? 1 : 0.7,
          transform: hover ? 'translateY(0)' : 'translateY(-30%)',
        }}
      >
        <img
          src={hoverImg}
          alt=""
          className="h-full w-full object-cover object-top"
        />
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
        style={{
          padding: `clamp(16px, 1.94vw, 32px) clamp(18px, 2.36vw, 36px)`,
        }}
      >
        <div
          className="inline-flex w-fit items-center gap-2 rounded-full bg-[rgb(16,56,44)] text-white"
          style={{
            padding: `clamp(6px, 0.7vw, 12px) clamp(10px, 1.25vw, 20px)`,
            fontSize: 'clamp(12px, 1vw, 14px)',
          }}
        >
          <span
            className="flex shrink-0 items-center [&_svg]:h-[17px]"
            style={{ width: 'max(14px, 1.11vw)', height: '17px' }}
          >
            {icon}
          </span>
          <span className="font-medium leading-none" style={{ fontWeight: 500 }}>
            {label}
          </span>
        </div>
        <div className="min-h-0 flex-1" />
        <h3
          className="font-medium leading-snug text-white transition-transform duration-500"
          style={{
            fontSize: 'clamp(16px, 1.7vw, 24px)',
            fontWeight: 500,
            transform: hover ? 'translateY(-8px)' : 'none',
          }}
        >
          <span className="whitespace-pre-line">{title}</span>
        </h3>
        <ul className="mt-4 flex flex-col gap-[10px]">
          {bullets.map((b) => (
            <li
              key={b}
              className="font-normal leading-snug text-[rgb(170,236,210)]"
              style={{
                fontSize: 'clamp(12px, 1vw, 15px)',
                paddingLeft: 'clamp(22px, 1.8vw, 28px)',
                backgroundImage: `url("${bulletSvg}")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '18px 18px',
                backgroundPosition: '0% 50%',
                filter: 'hue-rotate(70deg) saturate(1.6) brightness(1.15)',
              }}
            >
              {b}
            </li>
          ))}
        </ul>
        <div
          className="overflow-hidden transition-all duration-500"
          style={{
            maxHeight: hover ? 80 : 0,
            opacity: hover ? 1 : 0,
            transform: hover ? 'translateY(0)' : 'translateY(20px)',
            marginTop: hover ? 'clamp(12px, 1.2vw, 20px)' : 0,
          }}
        >
          <button
            type="button"
            className="w-full rounded-xl font-medium text-white transition-opacity hover:opacity-95"
            style={{
              background:
                'linear-gradient(90deg, rgb(0,166,126), rgb(0,212,170) 50%, rgb(152,244,76))',
              padding: `clamp(10px, 0.9vw, 14px) 0`,
              fontSize: 'clamp(13px, 1.1vw, 16px)',
              fontWeight: 500,
            }}
          >
            Learn more
          </button>
        </div>
      </div>
    </article>
  )
}
