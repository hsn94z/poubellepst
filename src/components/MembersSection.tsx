import { SECTION_PADDING, cardClass, cardHoverClass } from '../lib/theme'
import { SectionHeader } from './ui/SectionHeader'

type Member = {
  name: string
  role: string
  photo?: string
}

const members: Member[] = [
  {
    name: 'Salim',
    role: 'Responsable Intelligence Artificielle',
    photo: '/salilm.webp',
  },
  {
    name: 'Ramy',
    role: 'Responsable Intelligence Artificielle',
    photo: '/Image.jpg',
  },
  {
    name: 'Hassan',
    role: 'Développement web et Responsable Matériel',
    photo: '/hassan.webp',
  },
  {
    name: 'Maxime',
    role: 'Développement web et Responsable Matériel',
    photo: '/maxime.webp',
  },
  {
    name: 'Gaspard',
    role: 'Chef de projet et Responsable IA / Matériel',
    photo: '/gaspard.webp',
  },
]

export function MembersSection() {
  return (
    <section
      id="equipe"
      className="scroll-mt-28 bg-[rgb(248,252,250)]"
      style={{ padding: SECTION_PADDING }}
    >
      <div className="section-container flex flex-col gap-12">
        <SectionHeader
          badge="Qui sommes-nous"
          title="L'équipe du"
          titleAccent="projet"
          description="Une équipe pluridisciplinaire mobilisée autour de l'intelligence artificielle, du matériel embarqué et du développement web."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {members.map((member, index) => (
            <article
              key={member.name}
              className={`${cardClass} ${cardHoverClass} p-6 text-center`}
            >
              <div className="mb-4 flex justify-center">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="h-24 w-24 rounded-full object-cover ring-2 ring-[rgba(12,74,56,0.08)]"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[rgb(236,251,244)] text-lg font-medium text-[rgb(12,74,56)]">
                    M{index + 1}
                  </div>
                )}
              </div>
              <h3 className="text-base font-medium text-[rgb(12,74,56)]">{member.name}</h3>
              <p className="mt-2 text-sm leading-snug text-[rgb(66,123,101)]">{member.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
