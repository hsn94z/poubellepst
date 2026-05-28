export type WasteRecord = {
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

function toTimestamp(date: string, time: string): Date {
  return new Date(`${date}T${time}:00`)
}

export function parseWasteText(content: string): WasteRecord[] {
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(LINE_REGEX)
      if (!match) return null

      const [, date, time, rawType] = match
      const type = rawType.toLowerCase()
      const timestamp = toTimestamp(date, time)

      if (Number.isNaN(timestamp.getTime())) return null

      return { date, time, type, timestamp }
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
  const today = new Date().toISOString().slice(0, 10)
  const lastRecord = records.length > 0 ? records[records.length - 1] : null

  return {
    total: records.length,
    mostFrequentType: typeSeries[0]?.type ?? '-',
    lastRecord,
    todayCount: records.filter((r) => r.date === today).length,
  }
}
