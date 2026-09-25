// Étiquette du Lab : tags de projet et d'outil. Forme fixe, seule la couleur
// varie selon le contexte. Rayon et épaisseur passent par les tokens
// structurels, comme tout le reste depuis l'arrivée du kit.
export default function Tag({ children, color = 'var(--primary)' }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        color,
        background: 'var(--active-tint)',
        border: `var(--border-thin) solid ${color}`,
        borderRadius: 'var(--radius-xs)',
        padding: '2px 8px',
      }}
    >
      {children}
    </span>
  )
}
