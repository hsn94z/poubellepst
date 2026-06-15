export type WasteRecord = {
  id: string
  date: string
  time: string
  type: string
  timestamp: Date
}

export type DailyPoint = {
  date: string
  count: number
}

export type TypePoint = {
  type: string
  count: number
}

export type WasteSummary = {
  total: number
  mostFrequentType: string
  lastRecord: WasteRecord | null
  todayCount: number
}

const LINE_REGEX = /^(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})\s+(.+)$/

function pad2(value: number): string {
  return String(value).padStart(2, '0')
}

function localDateString(date: Date): string {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`
}

function localTimeString(date: Date): string {
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`
}

function normalizeType(rawType: string): string {
  return rawType.trim().toLowerCase()
}

function toTimestamp(date: string, time: string): Date {
  return new Date(`${date}T${time}:00`)
}

type FirebaseOuverture = {
  categorie?: string
  date?: string
}

/**
 * Convertit le noeud Firebase `ouvertures` en liste de detections.
 * Structure attendue : { "-pushId": { categorie, date }, ... }
 */
export function parseFirebaseOuvertures(
  data: Record<string, FirebaseOuverture> | null,
): WasteRecord[] {
  if (!data) return []

  const seenIds = new Set<string>()
  const records: WasteRecord[] = []

  for (const [id, entry] of Object.entries(data)) {
    if (!entry?.categorie || !entry?.date || seenIds.has(id)) continue
    seenIds.add(id)

    const timestamp = new Date(entry.date)
    if (Number.isNaN(timestamp.getTime())) continue

    records.push({
      id,
      date: localDateString(timestamp),
      time: localTimeString(timestamp),
      type: normalizeType(entry.categorie),
      timestamp,
    })
  }

  return records.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
}

export function parseWasteText(content: string): WasteRecord[] {
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const match = line.match(LINE_REGEX)
      if (!match) return null

      const [, date, time, rawType] = match
      const type = rawType.toLowerCase()
      const timestamp = toTimestamp(date, time)

      if (Number.isNaN(timestamp.getTime())) return null

      return {
        id: `txt-${date}-${time}-${type}-${index}`,
        date,
        time,
        type,
        timestamp,
      }
    })
    .filter((record): record is WasteRecord => record !== null)
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
}

export function filterByDateRange(
  records: WasteRecord[],
  startDate?: string,
  endDate?: string,
): WasteRecord[] {
  return records.filter((record) => {
    if (startDate && record.date < startDate) return false
    if (endDate && record.date > endDate) return false
    return true
  })
}

export function buildDailySeries(records: WasteRecord[]): DailyPoint[] {
  const map = new Map<string, number>()
  for (const record of records) {
    map.set(record.date, (map.get(record.date) ?? 0) + 1)
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count }))
}

export function buildTypeSeries(records: WasteRecord[]): TypePoint[] {
  const map = new Map<string, number>()
  for (const record of records) {
    map.set(record.type, (map.get(record.type) ?? 0) + 1)
  }
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([type, count]) => ({ type, count }))
}

export function buildSummary(records: WasteRecord[]): WasteSummary {
  const typeSeries = buildTypeSeries(records)
  const today = localDateString(new Date())
  const lastRecord = records.length > 0 ? records[records.length - 1] : null

  return {
    total: records.length,
    mostFrequentType: typeSeries[0]?.type ?? '-',
    lastRecord,
    todayCount: records.filter((r) => r.date === today).length,
  }
}
