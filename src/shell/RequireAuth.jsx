import { useAuth } from './AuthContext'

export default function RequireAuth({ children }) {
  const { authenticated, loading } = useAuth()

  if (loading) return null

  if (!authenticated) {
    return (
      <div style={{ padding: 40, fontFamily: "var(--font-body)", color: 'var(--text2)' }}>
        <p>Contenu protégé — connecte-toi via le bouton en bas du menu de gauche.</p>
      </div>
    )
  }

  return children
}
