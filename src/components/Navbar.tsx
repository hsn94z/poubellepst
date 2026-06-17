import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Matériel', href: '#materiel' },
  { label: 'Histoire', href: '#our-method' },
  { label: 'Détection', href: '#detection' },
  { label: 'Statistiques', href: '#stats' },
  { label: 'Équipe', href: '#equipe' },
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
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-opacity duration-200"
      style={{
        opacity: revealProgress,
        pointerEvents: revealProgress > 0.01 ? 'auto' : 'none',
      }}
    >
      <nav
        className={`flex w-full items-center justify-between gap-4 rounded-2xl border border-white/70 bg-white/90 shadow-[0_8px_32px_rgba(12,74,56,0.08)] backdrop-blur-xl transition-all duration-500 ${
          scrolled ? 'max-w-3xl py-2 pl-4 pr-2' : 'max-w-6xl py-2 pl-5 pr-2'
        }`}
      >
        <a href="#" className="flex shrink-0 items-center gap-2.5">
          <img
            src="/poubefaviconnn.png"
            alt="Logo Poubelle Intelligente"
            className="h-9 w-9 rounded-full object-cover ring-2 ring-[rgba(12,74,56,0.08)]"
          />
          <span className="text-lg font-medium tracking-tight text-[rgb(12,74,56)]">
            Poubelle IA
          </span>
        </a>

        <div
          className={`hidden min-w-0 flex-1 items-center justify-center md:flex transition-all duration-500 ${
            scrolled ? 'gap-0' : 'gap-1'
          }`}
        >
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`rounded-xl text-sm text-[rgb(66,123,101)] transition hover:bg-[rgb(240,250,245)] hover:text-[rgb(12,74,56)] ${
                scrolled ? 'px-2.5 py-1.5' : 'px-3.5 py-2'
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-[rgb(240,250,245)] md:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? (
            <X size={22} className="text-[rgb(12,74,56)]" />
          ) : (
            <Menu size={22} className="text-[rgb(12,74,56)]" />
          )}
        </button>
      </nav>

      {mobileOpen ? (
        <div className="absolute left-4 right-4 top-[calc(100%+0.75rem)] z-40 rounded-2xl border border-[rgba(12,74,56,0.08)] bg-white/95 p-6 shadow-[0_12px_40px_rgba(12,74,56,0.12)] backdrop-blur-xl md:hidden">
          <div className="flex flex-col items-center gap-2">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="w-full rounded-xl px-4 py-3 text-center text-sm text-[rgb(66,123,101)] hover:bg-[rgb(240,250,245)] hover:text-[rgb(12,74,56)]"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
