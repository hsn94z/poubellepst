import { useRef, useState } from 'react'

const gradientB =
  'linear-gradient(90deg, rgb(0,196,140), rgb(0,227,163) 50%, rgb(152,244,76))'

type HeroProps = {
  onNavRevealProgress: (progress: number) => void
}

export function Hero({ onNavRevealProgress }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [revealProgress, setRevealProgress] = useState(0)

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return
    const revealStart = Math.max(video.duration - 1, 0)
    const rawProgress = (video.currentTime - revealStart) / 1
    const progress = Math.min(1, Math.max(0, rawProgress))
    setRevealProgress(progress)
    onNavRevealProgress(progress)
  }

  const handleEnded = () => {
    const video = videoRef.current
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
      onNavRevealProgress(1)
      return
    }
    video.currentTime = Math.max(video.duration - 0.001, 0)
    video.pause()
    setRevealProgress(1)
    onNavRevealProgress(1)
  }

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/poubellepst.mp4"
        autoPlay
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(4,30,22,0.48), rgba(4,30,22,0.3) 42%, rgba(4,30,22,0.62))',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          opacity: revealProgress,
          transition: 'opacity 200ms ease',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-48"
        style={{
          background: 'linear-gradient(to bottom, transparent, #000201)',
        }}
      />
      <div
        className="relative z-10 mx-auto text-center transition-opacity duration-200"
        style={{ opacity: revealProgress }}
      >
        <h1
          className="hero-main-title font-medium tracking-[-0.03em]"
          style={{
            fontSize: 'clamp(44px, 8.5vw, 132px)',
            lineHeight: 0.95,
            fontWeight: 500,
            backgroundImage: gradientB,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 8px 40px rgba(0, 166, 126, 0.25)',
            animationDelay: `${(1 - revealProgress) * 120}ms`,
          }}
        >
          POUBELLE INTELLIGENTE
        </h1>
      </div>
    </section>
  )
}
