import { HlsVideo } from './HlsVideo'

const gradientB =
  'linear-gradient(90deg, rgb(0,196,140), rgb(0,227,163) 50%, rgb(152,244,76))'

const crossIcon =
  'https://cdn.prod.website-files.com/6720dd1ab6df0da205830ab1/686cc0f520a992816d8b15dc_bullet-list-cross.svg'
const checkIcon =
  'https://cdn.prod.website-files.com/6720dd1ab6df0da205830ab1/686cc068490683bbb3377d04_bullet-list.svg'

const negatives = [
  'Tri manuel long et repetitif au quotidien',
  'Erreurs de tri frequentes et bacs contamines',
  "Manque de retour en temps reel sur les dechets deposes",
  'Absence de coordination entre detection et orientation du dechet',
  'Faible sensibilisation des utilisateurs aux bonnes pratiques',
]

const positives = [
  'Tri automatique des dechets pour plus d efficacite',
  'Reduction des erreurs et amelioration de la proprete',
  'Detection intelligente grace a l IA et aux capteurs',
  'Experience connectee autour d une poubelle embarquee',
  'Encouragement des comportements eco-responsables',
]

function ControlChipIcon() {
  return (
    <svg
      width="19"
      height="18"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8.5 2.35C7.85 1.45 6.65 1.05 5.55 1.55C4.35 2.1 3.85 3.35 4.2 4.55C4.55 5.65 8.5 9.15 8.5 9.15C8.5 9.15 12.45 5.65 12.8 4.55C13.15 3.35 12.65 2.1 11.45 1.55C10.35 1.05 9.15 1.45 8.5 2.35Z"
        fill="rgb(0,227,163)"
      />
      <path
        d="M12.25 5.05C11.75 4.45 10.85 4.25 10.05 4.65C9.2 5.05 8.85 5.95 9.1 6.75C9.3 7.45 11.65 9.65 11.65 9.65C11.65 9.65 14 7.45 14.2 6.75C14.45 5.95 14.1 5.05 13.25 4.65C12.45 4.25 11.55 4.45 11.05 5.05H12.25Z"
        fill="rgb(0,227,163)"
      />
    </svg>
  )
}

function RowCard({
  text,
  iconSrc,
  tone,
}: {
  text: string
  iconSrc: string
  tone: 'negative' | 'positive'
}) {
  const textColor = tone === 'negative' ? 'text-[rgb(74,132,112)]' : 'text-[rgb(12,74,56)]'
  return (
    <div
      className={`flex items-start gap-3 rounded-[18px] bg-white ${textColor}`}
      style={{
        padding: `clamp(12px, 0.97vw, 16px) clamp(14px, 1.25vw, 20px)`,
        boxShadow: '0 3px 9.1px rgba(63, 74, 126, 0.05), 0 1px 29px rgba(63, 74, 126, 0.1)',
        fontSize: 'clamp(13px, 1.15vw, 17px)',
      }}
    >
      <img
        src={iconSrc}
        alt=""
        className="mt-0.5 shrink-0"
        style={{
          width: 'clamp(16px, 1.25vw, 20px)',
          filter: 'hue-rotate(70deg) saturate(1.7) brightness(1.05)',
        }}
      />
      <p className="m-0 font-normal leading-snug">{text}</p>
    </div>
  )
}

export function FreedomSection() {
  return (
    <section
      id="our-method"
      className="bg-white"
      style={{
        padding: `clamp(48px, 6vw, 80px) clamp(16px, 3vw, 40px)`,
      }}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-9">
        <header className="flex flex-col items-center gap-9 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full bg-[rgb(236,251,244)] text-lg font-medium text-[rgb(12,74,56)]"
            style={{
              padding: '0.9vw 1.25vw',
              fontWeight: 500,
            }}
          >
            <ControlChipIcon />
            Innovation
          </div>
          <h2
            className="font-medium leading-[1.15] text-[rgb(12,74,56)]"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 500 }}
          >
            Triez mieux, sans effort.
            <br />
            <span
              className="inline-block"
              style={{
                backgroundImage: gradientB,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                paddingBottom: '0.3vw',
              }}
            >
              Agissez pour un futur durable.
            </span>
          </h2>
        </header>

        <div
          className="flex flex-col gap-6 lg:grid lg:items-start lg:gap-x-9 lg:gap-y-6"
          style={{
            gridTemplateColumns: '26vw 1fr 26vw',
            padding: `0 clamp(0px, 2.92vw, 40px)`,
          }}
        >
          <div className="flex flex-col" style={{ gap: '12px' }}>
            {negatives.map((t) => (
              <RowCard key={t} text={t} iconSrc={crossIcon} tone="negative" />
            ))}
          </div>

          <div className="order-first flex justify-center lg:order-none">
            <div
              className="overflow-hidden"
              style={{
                borderRadius: '50%',
                width: 'clamp(200px, 22vw, 400px)',
                height: 'clamp(200px, 22vw, 400px)',
              }}
            >
              <HlsVideo />
            </div>
          </div>

          <div className="flex flex-col" style={{ gap: '12px' }}>
            {positives.map((t) => (
              <RowCard key={t} text={t} iconSrc={checkIcon} tone="positive" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
