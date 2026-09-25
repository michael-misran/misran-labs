// Jeu d'icônes du kit. Une seule règle : trait de 2px (--icon-stroke),
// trois tailles (--icon-sm / md / lg), couleur héritée du texte courant.
// Pas de librairie d'icônes : le trait uniforme est ce qui fait la cohérence.
//
// Note technique : la taille et l'épaisseur passent par `style`, pas par les
// attributs SVG — une var() CSS n'est pas résolue dans un attribut de présentation.

const PATHS = {
  gear: <><circle cx="12" cy="12" r="3" /><path d="M12 2.5v3M12 18.5v3M4.2 7l2.6 1.5M17.2 15.5l2.6 1.5M4.2 17l2.6-1.5M17.2 8.5l2.6-1.5" /></>,
  user: <><circle cx="12" cy="8" r="3.6" /><path d="M5 20c0-3.6 3.1-5.6 7-5.6s7 2 7 5.6" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6" /><path d="M15 15l4.5 4.5" /></>,
  check: <path d="M4.5 12.5l4.5 4.5L19.5 6.5" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  alert: <><path d="M12 4.5L21 19.5H3L12 4.5z" /><path d="M12 10v4M12 16.8v.2" /></>,
  info: <><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5.5M12 7.8v.2" /></>,
  chevronDown: <path d="M6 9.5l6 6 6-6" />,
  chevronRight: <path d="M9.5 6l6 6-6 6" />,
  filter: <path d="M4 6.5h16M7 12h10M10 17.5h4" />,
  sort: <path d="M8 4.5v15M8 4.5L4.5 8M8 4.5L11.5 8M16 19.5v-15M16 19.5L12.5 16M16 19.5L19.5 16" />,
  cursor: <path d="M6 4l11 7.5-4.8 1.2 2.6 5.3-2.2 1-2.6-5.3-3 3.8z" />,
  box: <><path d="M3.5 8.5L12 4l8.5 4.5v7L12 20l-8.5-4.5z" /><path d="M3.5 8.5L12 13l8.5-4.5M12 13v7" /></>,
  window: <><rect x="3.5" y="4.5" width="17" height="15" rx="2" /><path d="M3.5 9h17" /></>,
  plus: <path d="M12 5.5v13M5.5 12h13" />,
}

export const ICON_NAMES = Object.keys(PATHS)

export default function Icon({ name, size = 'var(--icon-md)', title, style }) {
  const path = PATHS[name]
  if (!path) return null

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      style={{
        width: size,
        height: size,
        strokeWidth: 'var(--icon-stroke)',
        flexShrink: 0,
        display: 'block',
        ...style,
      }}
    >
      {title && <title>{title}</title>}
      {path}
    </svg>
  )
}
