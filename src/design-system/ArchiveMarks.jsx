import { useId } from 'react'

// Petits signes graphiques de l'identité archive — partagés entre
// ArchiveHome et les fiches projet pour que le même motif « vous êtes
// dans un dossier » se retrouve partout sur le site, pas juste sur la home.

export function Stamp({ label, size = 92 }) {
  const pathId = useId()
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ flexShrink: 0 }}>
      <circle cx="50" cy="50" r="47" fill="none" stroke="var(--primary)" strokeWidth="1" />
      <circle cx="50" cy="50" r="39" fill="none" stroke="var(--primary)" strokeWidth="1" />
      <path id={pathId} d="M 50,50 m -30,0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0" fill="none" />
      <text fontSize="6" fill="var(--primary)" letterSpacing="2" fontFamily="var(--font-mono)">
        <textPath href={`#${pathId}`} startOffset="2%">{label}</textPath>
      </text>
      <text x="50" y="57" textAnchor="middle" fontFamily="var(--font-heading)" fontWeight="700" fontSize="22" fill="var(--primary)">✛</text>
    </svg>
  )
}

export function Barcode({ width = 90, height = 24 }) {
  const bars = [2, 1, 3, 1, 1, 2, 4, 1, 2, 1, 1, 3, 2, 1, 4, 1, 2, 2, 1, 3]
  return (
    <svg width={width} height={height} viewBox="0 0 90 24" aria-hidden="true">
      {bars.map((w, i) => {
        const x = bars.slice(0, i).reduce((a, b) => a + b + 1, 0)
        return <rect key={i} x={x} y="0" width={w} height="24" fill="var(--text)" />
      })}
    </svg>
  )
}
