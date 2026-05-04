const bgUrl =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260418_125638_553b96dc-a1fd-4b2b-81a9-ed7daa80006e.png&w=1280&q=85'

const gradientB =
  'linear-gradient(90deg, rgb(0,196,140), rgb(0,227,163) 50%, rgb(152,244,76))'

const lineGradient =
  'linear-gradient(rgb(0,166,126), rgb(152,244,76) 0%, rgb(0,212,170) 30%, rgb(156,245,201) 55%, rgb(220,255,137) 72%, rgb(152,244,76) 88%, rgba(152,244,76,0) 102%)'

const logoUrl =
  'https://cdn.prod.website-files.com/6720dd1ab6df0da205830ab1/6870f623cf3df417ce45df05_icon%20logo%20eternacloud.png'

const pillars = [
  {
    label: 'Observe',
    left: '2.8vw',
    bottom: '7vw',
    items: ['capteurs', 'presence', 'type', 'signal'],
  },
  {
    label: 'Analyse',
    left: '22.4vw',
    bottom: '9.08vw',
    items: ['vision', 'classification', 'decision', 'confiance'],
  },
  {
    label: 'Trie',
    left: '41.2vw',
    bottom: '11.16vw',
    items: ['orientation', 'compartiments', 'precision', 'securite'],
  },
  {
    label: 'Sensibilise',
    left: '61.1vw',
    bottom: '13.24vw',
    items: ['retour', 'proprete', 'ecologie', 'impact'],
  },
] as const

function StructuredChipIcon() {
  return (
    <svg width="19" height="18" viewBox="0 0 17 16" fill="none" aria-hidden>
      <circle cx="8.5" cy="8" r="7" stroke="rgb(0,212,170)" strokeWidth="1.2" fill="none" />
      <rect x="7.9" y="0.4" width="1.2" height="2.4" rx="0.6" fill="rgb(0,227,163)" />
      <rect x="7.9" y="13.2" width="1.2" height="2.4" rx="0.6" fill="rgb(0,227,163)" />
      <rect x="0.4" y="7.4" width="2.4" height="1.2" rx="0.6" fill="rgb(0,227,163)" />
      <rect x="14.2" y="7.4" width="2.4" height="1.2" rx="0.6" fill="rgb(0,227,163)" />
    </svg>
  )
}

function DesktopPillar({
  label,
  left,
  bottom,
  items,
}: {
  label: string
  left: string
  bottom: string
  items: readonly string[]
}) {
  return (
    <div
      className="absolute flex flex-col items-center text-[rgb(26,11,84)]"
      style={{ left, bottom }}
    >
      <div
        className="flex items-center gap-2 rounded-[20px] font-medium"
        style={{
          background: 'linear-gradient(135deg, rgb(255,255,255), rgba(255,255,255,0.6))',
          fontSize: '18px',
          fontWeight: 500,
          padding: '0.972vw 1.736vw',
          gap: '8px',
        }}
      >
        <img src={logoUrl} alt="" style={{ width: '1.111vw' }} className="h-auto" />
        {label}
      </div>
      <div className="relative mt-[0.35vw] flex flex-row items-start">
        <div
          className="w-px shrink-0"
          style={{
            height: '14.24vw',
            background: lineGradient,
          }}
        />
        <ul
          className="m-0 flex list-none flex-col p-0"
          style={{
            marginTop: '0.56vw',
            paddingLeft: '1.94vw',
            gap: '4px',
            fontSize: '16px',
          }}
        >
          {items.map((item) => (
            <li key={item} style={{ padding: '0.69vw 1.04vw' }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function MobilePillar({
  label,
  items,
  index,
}: {
  label: string
  items: readonly string[]
  index: number
}) {
  const alignRight = index % 2 === 1
  return (
    <div
      className={`flex w-full flex-col ${alignRight ? 'items-end text-right' : 'items-start text-left'}`}
    >
      <div
        className="flex items-center gap-2 rounded-[20px] font-medium text-[rgb(26,11,84)]"
        style={{
          background: 'linear-gradient(135deg, rgb(255,255,255), rgba(255,255,255,0.6))',
          fontSize: '15px',
          padding: '10px 18px',
          fontWeight: 500,
          gap: '8px',
        }}
      >
        <img src={logoUrl} alt="" width={16} height={16} className="h-4 w-4 object-contain" />
        {label}
      </div>
      <div
        className={`mt-3 flex w-full max-w-md items-stretch ${alignRight ? 'flex-row-reverse' : 'flex-row'}`}
      >
        <div
          className="w-px shrink-0"
          style={{
            minHeight: '120px',
            background: lineGradient,
          }}
        />
        <ul
          className={`m-0 flex list-none flex-col p-0 ${alignRight ? 'pr-3' : 'pl-3'}`}
          style={{
            gap: '4px',
            fontSize: '14px',
            color: 'rgb(100, 80, 160)',
          }}
        >
          {items.map((item) => (
            <li key={item} style={{ padding: '8px 0' }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function PrecisionSection() {
  return (
    <section
      id="who-we-are"
      className="relative"
      style={{
        backgroundImage: `url("${bgUrl}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: `clamp(48px, 8vw, 120px) clamp(16px, 4vw, 60px) clamp(48px, 5.56vw, 80px)`,
      }}
    >
      <div
        className="mx-auto flex flex-col items-center text-center"
        style={{ gap: 'clamp(32px, 4vw, 56px)' }}
      >
        <div
          className="inline-flex items-center gap-2 rounded-[36px] bg-[rgb(249,249,249)] font-medium text-[rgb(26,11,84)]"
          style={{
            padding: 'clamp(8px, 0.9vw, 14px) clamp(12px, 1.25vw, 20px)',
            fontSize: 'clamp(14px, 1.1vw, 18px)',
            fontWeight: 500,
            gap: '8px',
          }}
        >
          <StructuredChipIcon />
          Demarche du projet
        </div>

        <header
          className="flex max-w-[900px] flex-col items-center"
          style={{ gap: '22px', maxWidth: 'clamp(700px, 60vw, 900px)' }}
        >
          <h2
            className="font-medium leading-[1.15] text-[rgb(26,11,84)]"
            style={{ fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 500 }}
          >
            <span className="block sm:whitespace-nowrap">Une poubelle connectee et intelligente.</span>
            <span
              className="mt-1 inline-block sm:mt-2"
              style={{
                backgroundImage: gradientB,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                paddingBottom: '0.3vw',
              }}
            >
              Tri automatise pour un futur durable.
            </span>
          </h2>
          <p
            className="font-normal text-[rgb(169,151,206)]"
            style={{ fontSize: 'clamp(15px, 1.2vw, 20px)' }}
          >
            Notre equipe combine IA, materiel et developpement web pour concevoir une solution
            utile, educative et orientee impact.
          </p>
        </header>

        <div className="hidden w-full max-w-[82.292vw] sm:block">
          <div
            className="relative mx-auto text-[rgb(26,11,84)]"
            style={{ width: '82.292vw', height: '31.94vw' }}
          >
            {pillars.map((p) => (
              <DesktopPillar
                key={p.label}
                label={p.label}
                left={p.left}
                bottom={p.bottom}
                items={p.items}
              />
            ))}
          </div>
        </div>

        <div className="flex w-full max-w-xl flex-col gap-10 sm:hidden">
          {pillars.map((p, i) => (
            <MobilePillar key={p.label} label={p.label} items={p.items} index={i} />
          ))}
        </div>

        <div id="thinking" className="scroll-mt-28" aria-hidden />
      </div>
    </section>
  )
}
