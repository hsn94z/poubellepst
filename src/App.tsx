import { useState } from 'react'
import { FreedomSection } from './components/FreedomSection'
import { Hero } from './components/Hero'
import { MembersSection } from './components/MembersSection'
import { Navbar } from './components/Navbar'
import { TrustedSection } from './components/TrustedSection'

export default function App() {
  const [navRevealProgress, setNavRevealProgress] = useState(0)

  return (
    <main className="min-h-screen bg-white">
      <Navbar revealProgress={navRevealProgress} />
      <Hero onNavRevealProgress={setNavRevealProgress} />
      <TrustedSection />
      <FreedomSection />
      <MembersSection />
    </main>
  )
}
