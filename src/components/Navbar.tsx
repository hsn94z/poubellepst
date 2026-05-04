import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ContactButton } from './ContactButton'

const navLinks = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Matériel', href: '#what-we-build' },
  { label: 'Histoire', href: '#our-method' },
  { label: 'Contact', href: '#contact' },
] as const

type NavbarProps = {
  revealProgress?: number
}

export function Navbar({ revealProgress = 1 }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-4 left-0 right-0 z-50 flex justify-center pl-4 pr-1.5 transition-opacity duration-200"
      style={{
        opacity: revealProgress,
        pointerEvents: revealProgress > 0.01 ? 'auto' : 'none',
      }}
    >
      <nav
        className={`flex w-full items-center justify-between gap-6 rounded-2xl bg-white shadow-lg transition-all duration-500 ease-in-out ${
          scrolled ? 'max-w-3xl py-1.5 pl-4 pr-2' : 'max-w-6xl py-1.5 pl-5 pr-2'
        }`}
      >
        <a href="#" className="flex shrink-0 items-center gap-2">
          <img
            src="/poubefaviconnn.png"
            alt="Logo Poubelle Intelligente"
            className="h-9 w-9 rounded-full object-cover"
          />
          <span
            className="text-[22px] font-medium tracking-[-0.02em] text-[rgb(12,58,42)]"
            style={{ fontWeight: 500 }}
          >
            Poubelle IA
          </span>
        </a>

        <div
          className={`hidden min-w-0 flex-1 items-center justify-center md:flex transition-all duration-500 ease-in-out ${
            scrolled ? 'gap-0' : 'gap-1'
          }`}
        >
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`rounded-xl text-sm text-[rgb(12,58,42)] font-normal hover:bg-gray-100 transition-all duration-500 ease-in-out ${
                scrolled ? 'px-2 py-1.5' : 'px-4 py-2'
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <ContactButton />
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-gray-100 md:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? (
              <X size={22} className="text-[rgb(12,58,42)]" />
            ) : (
              <Menu size={22} className="text-[rgb(12,58,42)]" />
            )}
          </button>
        </div>
      </nav>

      {mobileOpen ? (
        <div className="absolute left-4 right-4 top-[calc(100%+0.75rem)] z-40 rounded-2xl bg-white p-6 shadow-lg md:hidden">
          <div className="flex flex-col items-center gap-4">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="w-full rounded-xl px-4 py-3 text-center text-sm text-[rgb(12,58,42)] hover:bg-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </a>
            ))}
            <div className="flex w-full items-center justify-center gap-3 pt-2">
              <ContactButton className="flex-1 [&>span]:w-full [&>span]:text-center" />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
