import { useState, useEffect } from 'react'

function getWeatherInfo(code) {
  if (code === 0)              return { emoji: '☀️', label: 'Ensoleillé' }
  if (code <= 3)               return { emoji: '⛅', label: 'Nuageux' }
  if (code <= 48)              return { emoji: '🌫️', label: 'Brouillard' }
  if (code <= 67)              return { emoji: '🌧️', label: 'Pluie' }
  if (code <= 77)              return { emoji: '❄️', label: 'Neige' }
  if (code <= 82)              return { emoji: '🌦️', label: 'Averses' }
  if (code <= 99)              return { emoji: '⛈️', label: 'Orage' }
  return                              { emoji: '🌡️', label: 'Variable' }
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(false)

  async function fetchWeather() {
    try {
      const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current_weather=true'
      )
      const data = await res.json()
      const cw = data.current_weather
      setWeather({ temp: Math.round(cw.temperature), ...getWeatherInfo(cw.weathercode) })
    } catch {
      setError(true)
    }
  }

  useEffect(() => {
    fetchWeather()
    const iv = setInterval(fetchWeather, 600000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div
      style={{
        background: 'rgba(10,14,23,0.4)',
        borderBottom: '1px solid #1a2a3a',
        padding: '12px 16px',
      }}
    >
      {error ? (
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#4a7a94' }}>
          N/A
        </span>
      ) : !weather ? (
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#4a7a94' }}>
          ...
        </span>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>{weather.emoji}</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                color: '#e8f4f8',
              }}
            >
              {weather.temp}°C
            </span>
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              color: '#7a9bb5',
              marginTop: 4,
            }}
          >
            {weather.label} · Paris
          </div>
        </>
      )}
    </div>
  )
}
