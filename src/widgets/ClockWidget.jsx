import { useState, useEffect } from 'react'

function pad(n) { return String(n).padStart(2, '0') }
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function ClockWidget() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const iv = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(iv)
  }, [])

  const hh = pad(now.getHours())
  const mm = pad(now.getMinutes())
  const ss = pad(now.getSeconds())
  const dateStr = `${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`

  return (
    <div
      style={{
        background: 'rgba(10,14,23,0.4)',
        borderBottom: '1px solid #1a2a3a',
        padding: '12px 16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 22,
            fontWeight: 700,
            color: '#25e2cc',
            lineHeight: 1,
          }}
        >
          {hh}:{mm}
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: '#7a9bb5',
          }}
        >
          :{ss}
        </span>
      </div>
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 11,
          color: '#4a7a94',
          marginTop: 4,
        }}
      >
        {dateStr}
      </div>
    </div>
  )
}
