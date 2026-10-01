import { useState } from 'react'
import { useLanguage } from '../../shell/LanguageContext'
import { jt } from '../jeuxText'
import { partager, texteScoreAvecUnite } from './partage'

// Bloc de résultat commun à tous les jeux (D1) : score, série, bouton de
// partage. `texte` est déjà construit par le jeu (construireTextePartage).
export default function ResultatPartage({ score, jours, texte }) {
  const { lang } = useLanguage()
  const [copie, setCopie] = useState(false)

  async function handlePartager() {
    const methode = await partager(texte)
    if (methode === 'copie') {
      setCopie(true)
      setTimeout(() => setCopie(false), 2000)
    }
  }

  return (
    <div
      style={{
        textAlign: 'center',
        padding: 'var(--space-lg)',
        background: 'var(--bg2)',
        borderRadius: 'var(--radius-md)',
        border: 'var(--border-thin) solid var(--border)',
      }}
    >
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 48, fontWeight: 700, color: 'var(--text)' }}>
        {texteScoreAvecUnite(score, lang)}
      </div>

      {jours > 0 && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--muted)', margin: 'var(--space-xs) 0 0' }}>
          {jt(lang, 'serieJours', jours)}
        </div>
      )}

      <button
        type="button"
        onClick={handlePartager}
        style={{
          marginTop: 'var(--space-md)',
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          padding: 'var(--space-xs) var(--space-md)',
          borderRadius: 'var(--radius-pill)',
          border: 'var(--border-thin) solid var(--border)',
          background: 'var(--bg3)',
          color: 'var(--primary)',
          cursor: 'pointer',
        }}
      >
        {copie ? jt(lang, 'copie') : jt(lang, 'partager')}
      </button>
    </div>
  )
}
