import { useMemo } from 'react'

// Histogramme + position du joueur sur la courbe simulée (D5). Ne reçoit
// qu'un tableau de réponses, la vraie valeur et la réponse du joueur : le
// jour où une vraie base existera, seule la source de `reponses` changera.
const BARRES = 20
const VB_L = 300
const VB_H = 100
const HAUTEUR_BARRE_MAX = 78

function formatNombre(n, lang) {
  return Math.round(n).toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US')
}

export default function Courbe({ reponses, vraie, reponseJoueur, unite, lang }) {
  const stats = useMemo(() => {
    const domaineMin = Math.min(...reponses, vraie, reponseJoueur)
    const domaineMax = Math.max(...reponses, vraie, reponseJoueur)
    const etendue = Math.max(1e-9, domaineMax - domaineMin)
    const largeurBarre = etendue / BARRES

    const comptes = new Array(BARRES).fill(0)
    for (const r of reponses) {
      const idx = Math.min(BARRES - 1, Math.max(0, Math.floor((r - domaineMin) / largeurBarre)))
      comptes[idx]++
    }
    const maxCompte = Math.max(...comptes, 1)

    const triees = [...reponses].sort((a, b) => a - b)
    const milieu = triees.length / 2
    const mediane = triees.length % 2 === 0 ? (triees[milieu - 1] + triees[milieu]) / 2 : triees[milieu]

    const ecartJoueur = Math.abs(reponseJoueur - vraie)
    const plusEloignes = reponses.filter((r) => Math.abs(r - vraie) > ecartJoueur).length
    const percentile = Math.round((plusEloignes / reponses.length) * 100)
    const ecartMedianPourcent = vraie === 0 ? 0 : Math.round((Math.abs(mediane - vraie) / vraie) * 100)

    return { domaineMin, etendue, comptes, maxCompte, mediane, percentile, ecartMedianPourcent }
  }, [reponses, vraie, reponseJoueur])

  function positionX(valeur) {
    return ((valeur - stats.domaineMin) / stats.etendue) * VB_L
  }

  return (
    <div style={{ marginTop: 'var(--space-lg)' }}>
      <svg viewBox={`0 0 ${VB_L} ${VB_H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        {stats.comptes.map((c, i) => {
          const h = (c / stats.maxCompte) * HAUTEUR_BARRE_MAX
          const largeur = VB_L / BARRES
          return <rect key={i} x={i * largeur} y={VB_H - h} width={Math.max(0, largeur - 1)} height={h} fill="var(--bg3)" />
        })}
        <line x1={positionX(stats.mediane)} y1={0} x2={positionX(stats.mediane)} y2={VB_H} stroke="var(--muted)" strokeWidth={2} strokeDasharray="4 3" />
        <line x1={positionX(vraie)} y1={0} x2={positionX(vraie)} y2={VB_H} stroke="var(--text)" strokeWidth={2} />
        <line x1={positionX(reponseJoueur)} y1={0} x2={positionX(reponseJoueur)} y2={VB_H} stroke="var(--primary)" strokeWidth={3} />
      </svg>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-md)', flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', margin: 'var(--space-xs) 0 var(--space-sm)' }}>
        <span>— {lang === 'fr' ? 'Vraie valeur' : 'True value'}</span>
        <span style={{ color: 'var(--primary)' }}>— {lang === 'fr' ? 'Ta réponse' : 'Your guess'}</span>
        <span>┄ {lang === 'fr' ? 'La foule' : 'The crowd'}</span>
      </div>

      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)', textAlign: 'center', margin: 0 }}>
        {lang === 'fr'
          ? `Tu es plus proche que ${stats.percentile} % des joueurs.`
          : `You're closer than ${stats.percentile}% of players.`}
        <br />
        {lang === 'fr'
          ? `La foule a dit ${formatNombre(stats.mediane, lang)} ${unite} (écart ${stats.ecartMedianPourcent} %).`
          : `The crowd said ${formatNombre(stats.mediane, lang)} ${unite} (off by ${stats.ecartMedianPourcent}%).`}
      </p>
    </div>
  )
}
