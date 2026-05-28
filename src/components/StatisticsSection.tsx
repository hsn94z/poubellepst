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
  parseWasteText,
  type TypePoint,
  type WasteRecord,
} from '../lib/wasteStats'

const gradientB =
  'linear-gradient(90deg, rgb(0,196,140), rgb(0,227,163) 50%, rgb(152,244,76))'

const chartColors = ['#00C48C', '#00D4AA', '#8EF46B', '#4B88FF', '#7B6DFF', '#FF9E64']

function prettyType(type: string): string {
  if (!type) return '-'
  return `${type[0].toUpperCase()}${type.slice(1)}`
}

function prettyRecord(record: WasteRecord | null): string {
  if (!record) return '-'
  return `${record.date} ${record.time} - ${prettyType(record.type)}`
}

export function StatisticsSection() {
  const [records, setRecords] = useState<WasteRecord[]>([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [distributionMode, setDistributionMode] = useState<'bar' | 'pie'>('bar')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    // Auto-refreshes from the text file so charts stay updated.
    const loadData = async () => {
      try {
        const response = await fetch(`/data/dechets.txt?ts=${Date.now()}`)
        const text = await response.text()
        if (!mounted) return
        setRecords(parseWasteText(text))
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadData()
    const id = window.setInterval(loadData, 30000)
    return () => {
      mounted = false
      window.clearInterval(id)
    }
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
      className="bg-[rgb(246,255,251)]"
      style={{ padding: 'clamp(56px, 7vw, 110px) clamp(16px, 3.4vw, 46px)' }}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 sm:gap-10">
        <header className="flex flex-col items-center gap-4 text-center">
          <p className="rounded-full bg-[rgb(226,249,238)] px-5 py-2 text-sm font-medium text-[rgb(12,74,56)]">
            Donnees en temps reel
          </p>
          <h2
            className="font-medium leading-tight text-[rgb(12,74,56)]"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 500 }}
          >
            Section{' '}
            <span
              style={{
                backgroundImage: gradientB,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Statistiques
            </span>
          </h2>
          <p className="max-w-3xl text-[rgb(66,123,101)]">
            Visualisez les dechets collectes depuis un fichier texte : evolution, repartition par
            type et indicateurs cles.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-2xl border border-[rgba(12,74,56,0.1)] bg-white p-5 shadow-[0_8px_28px_rgba(63,74,126,0.08)] transition-transform hover:-translate-y-1">
            <p className="text-sm text-[rgb(66,123,101)]">Total dechets</p>
            <p className="mt-2 text-3xl font-medium text-[rgb(12,74,56)]">{summary.total}</p>
          </article>
          <article className="rounded-2xl border border-[rgba(12,74,56,0.1)] bg-white p-5 shadow-[0_8px_28px_rgba(63,74,126,0.08)] transition-transform hover:-translate-y-1">
            <p className="text-sm text-[rgb(66,123,101)]">Type le plus frequent</p>
            <p className="mt-2 text-2xl font-medium text-[rgb(12,74,56)]">
              {prettyType(summary.mostFrequentType)}
            </p>
          </article>
          <article className="rounded-2xl border border-[rgba(12,74,56,0.1)] bg-white p-5 shadow-[0_8px_28px_rgba(63,74,126,0.08)] transition-transform hover:-translate-y-1">
            <p className="text-sm text-[rgb(66,123,101)]">Dernier dechet enregistre</p>
            <p className="mt-2 text-sm font-medium text-[rgb(12,74,56)]">{prettyRecord(summary.lastRecord)}</p>
          </article>
          <article className="rounded-2xl border border-[rgba(12,74,56,0.1)] bg-white p-5 shadow-[0_8px_28px_rgba(63,74,126,0.08)] transition-transform hover:-translate-y-1">
            <p className="text-sm text-[rgb(66,123,101)]">Collectes aujourd hui</p>
            <p className="mt-2 text-3xl font-medium text-[rgb(12,74,56)]">{summary.todayCount}</p>
          </article>
        </div>

        <div className="rounded-2xl border border-[rgba(12,74,56,0.1)] bg-white p-4 sm:p-6 shadow-[0_8px_28px_rgba(63,74,126,0.08)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-xl font-medium text-[rgb(12,74,56)]">Filtres</h3>
              <p className="text-sm text-[rgb(66,123,101)]">Affinez la periode et le type de graphique.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDistributionMode('bar')}
                className={`rounded-lg px-3 py-2 text-sm transition ${
                  distributionMode === 'bar'
                    ? 'bg-[rgb(12,74,56)] text-white'
                    : 'bg-[rgb(240,250,245)] text-[rgb(12,74,56)] hover:bg-[rgb(226,249,238)]'
                }`}
              >
                Barres
              </button>
              <button
                type="button"
                onClick={() => setDistributionMode('pie')}
                className={`rounded-lg px-3 py-2 text-sm transition ${
                  distributionMode === 'pie'
                    ? 'bg-[rgb(12,74,56)] text-white'
                    : 'bg-[rgb(240,250,245)] text-[rgb(12,74,56)] hover:bg-[rgb(226,249,238)]'
                }`}
              >
                Camembert
              </button>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm text-[rgb(66,123,101)]">
              Date de debut
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="rounded-lg border border-[rgba(12,74,56,0.2)] px-3 py-2 outline-none transition focus:border-[rgb(0,196,140)]"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-[rgb(66,123,101)]">
              Date de fin
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="rounded-lg border border-[rgba(12,74,56,0.2)] px-3 py-2 outline-none transition focus:border-[rgb(0,196,140)]"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-[rgba(12,74,56,0.1)] bg-white p-4 sm:p-6 shadow-[0_8px_28px_rgba(63,74,126,0.08)]">
            <h3 className="text-xl font-medium text-[rgb(12,74,56)]">Evolution journaliere</h3>
            <p className="mt-1 text-sm text-[rgb(66,123,101)]">Nombre de dechets collectes par jour.</p>
            <div className="mt-4 h-[300px] w-full">
              <ResponsiveContainer>
                <LineChart data={dailySeries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(12,74,56,0.12)" />
                  <XAxis dataKey="date" tick={{ fill: '#2E5D4B', fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fill: '#2E5D4B', fontSize: 12 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#00C48C"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    animationDuration={700}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="rounded-2xl border border-[rgba(12,74,56,0.1)] bg-white p-4 sm:p-6 shadow-[0_8px_28px_rgba(63,74,126,0.08)]">
            <h3 className="text-xl font-medium text-[rgb(12,74,56)]">Repartition par type</h3>
            <p className="mt-1 text-sm text-[rgb(66,123,101)]">Plastique, papier, verre, metal, etc.</p>
            <div className="mt-4 h-[300px] w-full">
              <ResponsiveContainer>
                {distributionMode === 'bar' ? (
                  <BarChart data={typeSeries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(12,74,56,0.12)" />
                    <XAxis dataKey="type" tick={{ fill: '#2E5D4B', fontSize: 12 }} />
                    <YAxis allowDecimals={false} tick={{ fill: '#2E5D4B', fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="count" radius={[8, 8, 0, 0]} animationDuration={700}>
                      {typeSeries.map((entry: TypePoint, index) => (
                        <Cell key={`${entry.type}-${index}`} fill={chartColors[index % chartColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                ) : (
                  <PieChart>
                    <Tooltip />
                    <Pie
                      data={typeSeries}
                      dataKey="count"
                      nameKey="type"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, value }: { name?: string | number; value?: string | number }) =>
                        `${prettyType(String(name ?? ''))} (${value ?? 0})`
                      }
                      animationDuration={700}
                    >
                      {typeSeries.map((entry: TypePoint, index) => (
                        <Cell key={`${entry.type}-${index}`} fill={chartColors[index % chartColors.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                )}
              </ResponsiveContainer>
            </div>
          </article>
        </div>

        {loading ? <p className="text-center text-sm text-[rgb(66,123,101)]">Chargement des statistiques...</p> : null}
      </div>
    </section>
  )
}
