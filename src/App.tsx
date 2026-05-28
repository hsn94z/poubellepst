import { lazy, Suspense, useState } from 'react'
import { DetectionSection } from './components/DetectionSection'
import { FreedomSection } from './components/FreedomSection'
import { HardwareSection } from './components/HardwareSection'
import { Hero } from './components/Hero'
import { MembersSection } from './components/MembersSection'
import { Navbar } from './components/Navbar'
import { TrustedSection } from './components/TrustedSection'

const StatisticsSection = lazy(() =>
  import('./components/StatisticsSection').then((module) => ({
    default: module.StatisticsSection,
  })),
)

function StatsFallback() {
  return (
    <section
      id="stats"
      className="bg-[rgb(246,255,251)]"
      style={{ padding: 'clamp(56px, 7vw, 110px) clamp(16px, 3.4vw, 46px)' }}
    >
      <p className="text-center text-sm text-[rgb(66,123,101)]">Chargement des statistiques...</p>
    </section>
  )
}

export default function App() {
  const [navRevealProgress, setNavRevealProgress] = useState(0)

  return (
    <main className="min-h-screen bg-white">
      <Navbar revealProgress={navRevealProgress} />
      <Hero onNavRevealProgress={setNavRevealProgress} />
      <TrustedSection />
      <HardwareSection />
      <FreedomSection />
      <DetectionSection />
      <MembersSection />
      <Suspense fallback={<StatsFallback />}>
        <StatisticsSection />
      </Suspense>
    </main>
  )
}
