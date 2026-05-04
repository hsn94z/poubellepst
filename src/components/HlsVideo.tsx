import Hls from 'hls.js'
import { useEffect, useRef } from 'react'

const HLS_SRC =
  'https://stream.mux.com/bnYL6x5cAX6WiJv2pOKpITehZd3NVdXpj3ylJFpX5Lk.m3u8'

export function HlsVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_SRC
      void video.play()
      return
    }

    if (!Hls.isSupported()) return

    const hls = new Hls({
      startLevel: -1,
      capLevelToPlayerSize: false,
      maxMaxBufferLength: 60,
      enableWorker: true,
    })
    hls.loadSource(HLS_SRC)
    hls.attachMedia(video)
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      hls.currentLevel = hls.levels.length - 1
      void video.play()
    })

    return () => {
      hls.destroy()
    }
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden bg-[rgb(6,42,31)]">
      <video
        ref={videoRef}
        className="absolute left-1/2 top-1/2 object-cover"
        style={{
          width: '160%',
          height: '160%',
          transform: 'translate(-50%, -50%)',
        }}
        autoPlay
        loop
        muted
        playsInline
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'linear-gradient(160deg, rgba(0, 166, 126, 0.2), rgba(152, 244, 76, 0.22))',
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  )
}
