import { useState, useEffect } from 'react'

function pad(n) { return String(n).padStart(2, '0') }

const START_KEY = 'mlabs_session_start'

export default function UptimeWidget() {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!sessionStorage.getItem(START_KEY)) {
      sessionStorage.setItem(START_KEY, Date.now().toString())
    }
    const start = parseInt(sessionStorage.getItem(START_KEY))

    const iv = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000))
    }, 1000)
    return () => clearInterval(iv)
  }, [])

  const hh = pad(Math.floor(elapsed / 3600))
  const mm = pad(Math.floor((elapsed % 3600) / 60))
  const ss = pad(elapsed % 60)

  return (
    <div
      style={{
        background: 'rgba(10,14,23,0.4)',
        borderBottom: '1px solid #1a2a3a',
        padding: '12px 16px',
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: '#4a7a94',
          letterSpacing: '0.1em',
          marginBottom: 6,
        }}
      >
        SESSION
      </div>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13,
          color: '#e8f4f8',
        }}
      >
        {hh}:{mm}:{ss}
      </span>
    </div>
  )
}
