import { useState, useEffect } from 'react'
import { useLanguage } from './LanguageContext'
import { t } from '../i18n/ui'

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

function LanguageToggle({ lang, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
      title={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
      style={{
        background: 'none',
        border: '1px solid var(--border)',
        borderRadius: 3,
        color: 'var(--text2)',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        letterSpacing: '0.08em',
        cursor: 'pointer',
        padding: '2px 7px',
        lineHeight: 1.4,
      }}
    >
      {lang === 'fr' ? 'EN' : 'FR'}
    </button>
  )
}

export default function Topbar({ moduleLabel, isMobile, onToggleMobileNav, isLight, onToggleTheme }) {
  const [time, setTime] = useState(getTimeStr)
  const [date] = useState(getDateStr)
  const { lang, toggle: toggleLang } = useLanguage()

  useEffect(() => {
    const iv = setInterval(() => setTime(getTimeStr()), 1000)
    return () => clearInterval(iv)
  }, [])

  return (
    <header
      style={{
        height: 48,
        background: isLight ? 'rgba(246,248,250,0.95)' : 'rgba(10,14,23,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '0 12px' : '0 20px',
        zIndex: 9999,
        position: 'relative',
      }}
    >
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, minWidth: 0 }}>
        {isMobile && (
          <button
            onClick={onToggleMobileNav}
            aria-label={t(lang, 'openNav')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--teal)',
              fontSize: 18,
              cursor: 'pointer',
              padding: '4px 10px 4px 0',
              lineHeight: 1,
            }}
          >
            ☰
          </button>
        )}
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 16,
            color: 'var(--teal)',
            letterSpacing: '0.06em',
            flexShrink: 0,
          }}
        >
          M.LABS
        </span>
        {!isMobile && (
          <>
            <span
              style={{
                width: 1,
                height: 20,
                background: 'var(--border)',
                margin: '0 16px',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: 'var(--text2)',
                letterSpacing: '0.08em',
              }}
            >
              {moduleLabel}
            </span>
          </>
        )}
      </div>

      {isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LanguageToggle lang={lang} onToggle={toggleLang} />
          <button
            onClick={onToggleTheme}
            aria-label={isLight ? t(lang, 'themeToDark') : t(lang, 'themeToLight')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text2)',
              fontSize: 15,
              cursor: 'pointer',
              padding: 4,
              lineHeight: 1,
            }}
          >
            {isLight ? '☾' : '☀'}
          </button>
        </div>
      )}

      {!isMobile && (
        <>
          {/* Centre */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                color: 'var(--text)',
                letterSpacing: '0.04em',
              }}
            >
              {time}
            </span>
            <span style={{ color: 'var(--border)', fontSize: 12 }}>|</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: 'var(--text2)',
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
            <LanguageToggle lang={lang} onToggle={toggleLang} />
            <span style={{ width: 1, height: 16, background: 'var(--border)', display: 'inline-block' }} />
            <button
              onClick={onToggleTheme}
              aria-label={isLight ? t(lang, 'themeToDark') : t(lang, 'themeToLight')}
              title={isLight ? t(lang, 'themeToDark') : t(lang, 'themeToLight')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text2)',
                fontSize: 13,
                cursor: 'pointer',
                padding: 2,
                lineHeight: 1,
                display: 'flex',
              }}
            >
              {isLight ? '☾' : '☀'}
            </button>
            <span style={{ width: 1, height: 16, background: 'var(--border)', display: 'inline-block' }} />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: 'var(--muted)',
                letterSpacing: '0.08em',
              }}
            >
              v2.0.0
            </span>
          </div>
        </>
      )}
    </header>
  )
}
