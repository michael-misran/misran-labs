import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import { buttonVisuals } from './buttonStyles'

// Lien-bouton du kit : un <Link> de react-router qui porte exactement le
// contrat visuel de Button. À utiliser dès qu'un « bouton » navigue vers une
// autre page — c'est un lien, il doit rester un <a> pour le clic milieu,
// l'ouverture dans un onglet et les lecteurs d'écran.
//
// `to` externe (http…) rend un <a> classique plutôt qu'un Link.

export default function LinkButton({
  to,
  children,
  tone = 'primary',
  variant = 'solid',
  size = 'md',
  icon,
  trailing,
  external = false,
  onClick,
  style,
  ...rest
}) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  const state = pressed ? 'pressed' : hovered ? 'hover' : 'default'
  const visuals = { ...buttonVisuals({ tone, variant, size, state }), cursor: 'pointer', ...style }

  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => { setHovered(false); setPressed(false) },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    onClick,
  }

  const content = (
    <>
      {icon && <Icon name={icon} size="var(--icon-sm)" />}
      {children}
      {trailing && <span aria-hidden="true">{trailing}</span>}
    </>
  )

  if (external || /^https?:|^mailto:|^tel:/.test(String(to))) {
    return (
      <a href={to} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} style={visuals} {...handlers} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <Link to={to} style={visuals} {...handlers} {...rest}>
      {content}
    </Link>
  )
}
