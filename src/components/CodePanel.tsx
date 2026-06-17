import { Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import { GRADIENT_BRAND, cardClass } from '../lib/theme'

type CodePanelProps = {
  title: string
  subtitle: string
  platform: string
  fileUrl: string
  fileName: string
}

export function CodePanel({ title, subtitle, platform, fileUrl, fileName }: CodePanelProps) {
  const [code, setCode] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    fetch(fileUrl)
      .then((res) => res.text())
      .then(setCode)
      .catch(() => setCode(null))
  }, [fileUrl])

  const previewLines = code?.split('\n') ?? []
  const visibleLines = expanded ? previewLines : previewLines.slice(0, 28)
  const hasMore = previewLines.length > 28

  return (
    <article className={`${cardClass} flex flex-col overflow-hidden`}>
      <div className="flex flex-col gap-4 border-b border-[rgba(12,74,56,0.08)] p-5 sm:p-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 inline-flex rounded-full bg-[rgb(236,251,244)] px-3 py-1 text-xs font-medium text-[rgb(12,74,56)]">
            {platform}
          </div>
          <h3 className="text-lg font-medium text-[rgb(12,74,56)]">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-[rgb(66,123,101)]">{subtitle}</p>
        </div>
        <a
          href={fileUrl}
          download={fileName}
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-95"
          style={{ background: GRADIENT_BRAND }}
        >
          <Download size={16} aria-hidden />
          {fileName}
        </a>
      </div>

      <div className="relative">
        <pre className="m-0 max-h-[520px] overflow-auto bg-[rgb(10,28,22)] p-4 text-[13px] leading-relaxed text-[rgb(196,232,214)] sm:p-5">
          <code>
            {code === null ? (
              'Chargement du code…'
            ) : (
              visibleLines.map((line, index) => (
                <span key={`${index}-${line}`} className="block">
                  <span className="mr-4 inline-block w-8 select-none text-right text-[rgb(80,130,105)]">
                    {index + 1}
                  </span>
                  {line || ' '}
                </span>
              ))
            )}
          </code>
        </pre>
        {hasMore && code !== null ? (
          <div className="border-t border-[rgba(255,255,255,0.06)] bg-[rgb(10,28,22)] px-5 py-3">
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="text-sm font-medium text-[rgb(142,244,200)] transition hover:text-white"
            >
              {expanded ? 'Réduire' : `Afficher tout le code (${previewLines.length} lignes)`}
            </button>
          </div>
        ) : null}
      </div>
    </article>
  )
}
