import { useEffect, useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  buildDailySeries,
  buildSummary,
  buildTypeSeries,
  filterByDateRange,
  type TypePoint,
  type WasteRecord,
} from '../lib/wasteStats'
import { subscribeToWasteRecords } from '../lib/firebaseWaste'
import { CHART_COLORS, SECTION_PADDING, cardClass, cardHoverClass } from '../lib/theme'
import { SectionHeader } from './ui/SectionHeader'

function prettyType(type: string): string {
  if (!type) return '—'
  return `${type[0].toUpperCase()}${type.slice(1)}`
}

function prettyRecord(record: WasteRecord | null): string {
  if (!record) return '—'
  return `${record.date} · ${record.time} · ${prettyType(record.type)}`
}

function StatCard({ label, value, compact }: { label: string; value: string | number; compact?: boolean }) {
  return (
    <article className={`${cardClass} ${cardHoverClass} p-6`}>
      <p className="text-sm font-medium text-[rgb(66,123,101)]">{label}</p>
      <p
        className={`mt-2 font-medium text-[rgb(12,74,56)] ${compact ? 'text-sm leading-snug' : 'text-3xl'}`}
      >
        {value}
      </p>
    </article>
  )
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { value: number; name?: string }[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-[rgba(12,74,56,0.1)] bg-white px-4 py-3 shadow-[0_8px_24px_rgba(12,74,56,0.12)]">
      <p className="text-xs font-medium text-[rgb(66,123,101)]">{label}</p>
      <p className="mt-1 text-sm font-medium text-[rgb(12,74,56)]">
        {payload[0].value} déchets
      </p>
    </div>
  )
}

export function StatisticsSection() {
  const [records, setRecords] = useState<WasteRecord[]>([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [distributionMode, setDistributionMode] = useState<'bar' | 'pie'>('bar')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeToWasteRecords(
      (nextRecords) => {
        setRecords(nextRecords)
        setLoading(false)
      },
      () => {
        setLoading(false)
      },
    )

    return unsubscribe
  }, [])

  const filtered = useMemo(
    () => filterByDateRange(records, startDate || undefined, endDate || undefined),
    [records, startDate, endDate],
  )

  const dailySeries = useMemo(() => buildDailySeries(filtered), [filtered])
  const typeSeries = useMemo(() => buildTypeSeries(filtered), [filtered])
  const summary = useMemo(() => buildSummary(filtered), [filtered])

  return (
    <section
      id="stats"
      className="scroll-mt-28 bg-[rgb(244,255,250)]"
      style={{ padding: SECTION_PADDING }}
    >
      <div className="section-container flex flex-col gap-10">
        <SectionHeader
          badge="Données en temps réel"
          title="Statistiques de"
          titleAccent="tri"
          description="Visualisez l'évolution des déchets collectés, leur répartition par type et les indicateurs clés du système."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total déchets" value={summary.total} />
          <StatCard label="Type le plus fréquent" value={prettyType(summary.mostFrequentType)} />
          <StatCard label="Dernier enregistrement" value={prettyRecord(summary.lastRecord)} compact />
          <StatCard label="Collectes aujourd'hui" value={summary.todayCount} />
        </div>

        <article className={`${cardClass} p-6 sm:p-8`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-lg font-medium text-[rgb(12,74,56)]">Filtres & affichage</h3>
              <p className="mt-1 text-sm text-[rgb(66,123,101)]">
                Affinez la période analysée et le type de graphique.
              </p>
            </div>
            <div className="inline-flex rounded-xl bg-[rgb(240,250,245)] p-1">
              {(['bar', 'pie'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setDistributionMode(mode)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    distributionMode === mode
                      ? 'bg-white text-[rgb(12,74,56)] shadow-sm'
                      : 'text-[rgb(66,123,101)] hover:text-[rgb(12,74,56)]'
                  }`}
                >
                  {mode === 'bar' ? 'Barres' : 'Camembert'}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-[rgb(66,123,101)]">
              Date de début
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="rounded-xl border border-[rgba(12,74,56,0.12)] bg-[rgb(248,252,250)] px-4 py-3 outline-none transition focus:border-[rgb(0,196,140)] focus:bg-white"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-[rgb(66,123,101)]">
              Date de fin
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="rounded-xl border border-[rgba(12,74,56,0.12)] bg-[rgb(248,252,250)] px-4 py-3 outline-none transition focus:border-[rgb(0,196,140)] focus:bg-white"
              />
            </label>
          </div>
        </article>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <article className={`${cardClass} p-6 sm:p-8`}>
            <h3 className="text-lg font-medium text-[rgb(12,74,56)]">Évolution journalière</h3>
            <p className="mt-1 text-sm text-[rgb(66,123,101)]">
              Nombre de déchets collectés par jour.
            </p>
            <div className="mt-6 h-[320px] w-full min-w-0">
              {dailySeries.length === 0 ? (
                <p className="flex h-full items-center justify-center text-sm text-[rgb(66,123,101)]">
                  Aucune donnée pour cette période.
                </p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailySeries} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(12,74,56,0.08)" vertical={false} />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: '#427B65', fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fill: '#427B65', fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<ChartTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#00C48C"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#00C48C', strokeWidth: 0 }}
                      activeDot={{ r: 6, fill: '#00A67E' }}
                      animationDuration={700}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </article>

          <article className={`${cardClass} p-6 sm:p-8`}>
            <h3 className="text-lg font-medium text-[rgb(12,74,56)]">Répartition par type</h3>
            <p className="mt-1 text-sm text-[rgb(66,123,101)]">
              Plastique, verre, papier, métal et autres catégories.
            </p>
            <div className="mt-6 h-[320px] w-full min-w-0">
              {typeSeries.length === 0 ? (
                <p className="flex h-full items-center justify-center text-sm text-[rgb(66,123,101)]">
                  Aucune donnée pour cette période.
                </p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  {distributionMode === 'bar' ? (
                    <BarChart data={typeSeries} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(12,74,56,0.08)" vertical={false} />
                      <XAxis
                        dataKey="type"
                        tick={{ fill: '#427B65', fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        allowDecimals={false}
                        tick={{ fill: '#427B65', fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip content={<ChartTooltip />} />
                      <Bar dataKey="count" radius={[10, 10, 0, 0]} animationDuration={700}>
                        {typeSeries.map((entry: TypePoint, index) => (
                          <Cell
                            key={`${entry.type}-${index}`}
                            fill={CHART_COLORS[index % CHART_COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  ) : (
                    <PieChart>
                      <Tooltip content={<ChartTooltip />} />
                      <Pie
                        data={typeSeries}
                        dataKey="count"
                        nameKey="type"
                        cx="50%"
                        cy="50%"
                        innerRadius={52}
                        outerRadius={100}
                        paddingAngle={3}
                        animationDuration={700}
                      >
                        {typeSeries.map((entry: TypePoint, index) => (
                          <Cell
                            key={`${entry.type}-${index}`}
                            fill={CHART_COLORS[index % CHART_COLORS.length]}
                            stroke="white"
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  )}
                </ResponsiveContainer>
              )}
            </div>
          </article>
        </div>

        {loading ? (
          <p className="text-center text-sm text-[rgb(66,123,101)]">Chargement des statistiques…</p>
        ) : null}
      </div>
    </section>
  )
}
