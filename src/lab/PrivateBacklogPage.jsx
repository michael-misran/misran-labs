import { useEffect, useState } from 'react'

export default function PrivateBacklogPage() {
  const [content, setContent] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/backlog')
      .then((res) => {
        if (!res.ok) throw new Error('unauthorized')
        return res.text()
      })
      .then(setContent)
      .catch(() => setError(true))
  }, [])

  if (error) {
    return (
      <div style={{ padding: 40, fontFamily: "var(--font-body)", color: 'var(--text2)' }}>
        <p>Impossible de charger le backlog.</p>
      </div>
    )
  }

  if (content === null) return null

  if (!content) {
    return (
      <div style={{ padding: 40, fontFamily: "var(--font-body)", color: 'var(--text2)' }}>
        <p>Aucun contenu de backlog configuré (variable BACKLOG_MD).</p>
      </div>
    )
  }

  return (
    <div style={{ padding: 40, overflow: 'auto', height: '100%' }}>
      <pre
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          lineHeight: 1.7,
          color: 'var(--text)',
          whiteSpace: 'pre-wrap',
          margin: 0,
        }}
      >
        {content}
      </pre>
    </div>
  )
}
