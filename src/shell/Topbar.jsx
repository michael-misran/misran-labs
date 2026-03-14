import { useState, useEffect } from 'react'

function pad(n) { return String(n).padStart(2, '0') }

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function getTimeStr() {
  const d = new Date()
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

function getDateStr() {
  const d = new Date()
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

export default function Topbar({ moduleLabel }) {
  const [time, setTime] = useState(getTimeStr)
  const [date] = useState(getDateStr)

  useEffect(() => {
    const iv = setInterval(() => setTime(getTimeStr()), 1000)
    return () => clearInterval(iv)
  }, [])

  return (
    <nav
      style={{
        height: 48,
        background: 'rgba(10,14,23,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #1a2a3a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 9999,
        position: 'relative',
      }}
    >
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 16,
            color: '#25e2cc',
            letterSpacing: '0.06em',
          }}
        >
          M.LABS
        </span>
        <span
          style={{
            width: 1,
            height: 20,
            background: '#1a2a3a',
            margin: '0 16px',
            display: 'inline-block',
          }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: '#7a9bb5',
            letterSpacing: '0.08em',
          }}
        >
          {moduleLabel}
        </span>
      </div>

      {/* Centre */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            color: '#e8f4f8',
            letterSpacing: '0.04em',
          }}
        >
          {time}
        </span>
        <span style={{ color: '#1a2a3a', fontSize: 12 }}>|</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: '#7a9bb5',
            letterSpacing: '0.04em',
          }}
        >
          {date}
        </span>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#00ff88',
              display: 'inline-block',
              animation: 'pulseDot 2s ease-in-out infinite',
            }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: '#00ff88',
              letterSpacing: '0.1em',
            }}
          >
            ONLINE
          </span>
        </div>
        <span style={{ width: 1, height: 16, background: '#1a2a3a', display: 'inline-block' }} />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: '#4a7a94',
            letterSpacing: '0.08em',
          }}
        >
          v2.0.0
        </span>
      </div>
    </nav>
  )
}
