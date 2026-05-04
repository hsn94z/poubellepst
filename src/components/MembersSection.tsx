type Member = {
  name: string
  role: string
  photo?: string
}

const members: Member[] = [
  {
    name: 'Salim',
    role: 'Responsable IA',
    photo: '/salilm.webp',
  },
  {
    name: 'Ramy',
    role: 'Responsable IA',
    photo: '/Image.jpg',
  },
  {
    name: 'Hassan',
    role: 'Developpement site web et Responsable Materiel',
    photo: '/hassan.webp',
  },
  {
    name: 'Maxime',
    role: 'Developpement site web et Responsable Materiel',
    photo: '/maxime.webp',
  },
  {
    name: 'Gaspard',
    role: 'Chef de projet (actuel) et Responsable IA / Materiel',
    photo: '/gaspard.webp',
  },
]

const cardGradient = 'linear-gradient(135deg, rgba(236, 251, 244, 0.95), rgba(216, 247, 233, 0.85))'

export function MembersSection() {
  return (
    <section
      id="contact"
      className="relative bg-[rgb(244,255,250)]"
      style={{
        padding: 'clamp(52px, 7vw, 96px) clamp(16px, 4vw, 56px)',
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 text-center">
        <header className="flex flex-col items-center gap-4">
          <p className="rounded-full bg-[rgb(226,249,238)] px-5 py-2 text-sm font-medium text-[rgb(12,74,56)]">
            Equipe du projet
          </p>
          <h2
            className="font-medium leading-tight text-[rgb(12,74,56)]"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 500 }}
          >
            Membres du projet
          </h2>
        </header>

        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {members.map((member, index) => (
            <article
              key={member.name}
              className="rounded-3xl border border-[rgba(12,74,56,0.1)] p-5 text-left"
              style={{ background: cardGradient }}
            >
              <div className="mb-4 flex justify-center">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="h-24 w-24 rounded-full object-cover ring-2 ring-[rgba(12,74,56,0.2)]"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[rgb(198,239,221)] text-lg font-medium text-[rgb(12,74,56)]">
                    M{index + 1}
                  </div>
                )}
              </div>
              <h3 className="text-center text-base font-medium text-[rgb(12,74,56)]">{member.name}</h3>
              <p className="mt-2 text-center text-sm font-normal leading-snug text-[rgb(66,123,101)]">
                {member.role}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
