import logoUrl from '../assets/logo-ml.png'

// Logo M.LABS — carte "élément du tableau périodique" dessinée à la main
// (PNG fourni par l'utilisateur, fond rendu transparent).
const ASPECT = 568 / 480

export default function LabLogo({ size = 24 }) {
  const width = size / ASPECT
  return (
    <img
      src={logoUrl}
      width={width}
      height={size}
      alt="M.LABS"
      style={{ display: 'block', flexShrink: 0, objectFit: 'contain' }}
    />
  )
}
