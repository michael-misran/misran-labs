import { Link } from 'react-router-dom'
import { useLanguage } from '../shell/LanguageContext'
import LogoFiole from '../shell/LogoFiole'
import Logo1977 from '../shell/Logo1977'
import { t } from '../i18n/ui'
import { formatDateLong } from '../shell/dates'
import { getDays } from '../breves/jours'
import { getIdea } from '../projets/idees'
import { getNumeros } from '../zine/numeros'
import { getChemin, getNumero, titreDe, folioDe, avecFolios } from './chemin'
import { NT, nt } from './numeroText'
import './numero.css'

// Pages du numéro au format A (inspirées de l'anthologie LowReader) : chacune
// a son adresse dans le chemin de fer (chemin.js) et sa propre direction
// artistique. Le cadre (table de lecture, pages qu'on tourne) est dans Shell.

const sansBalises = (html) => html.replace(/<[^>]+>/g, '')

function aujourdhuiIso() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// Mascotte de la maison, encrée
function Fiole({ style, couleur = 'var(--primitive-encre)', fond = '#f1e7cf' }) {
  return (
    <div className="mascotte" aria-hidden="true" style={{ color: couleur, ...style }}>
      <LogoFiole largeur="100%" fond={fond} titre="" />
    </div>
  )
}

function Folio({ path, couleur }) {
  return <div className="folio" style={couleur ? { color: couleur } : undefined}>{folioDe(path)}</div>
}

// Renvoi vers une autre page du numéro, numéro de page calculé
function Renvoi({ to, texte, lang }) {
  return <Link to={to} className="renvoi">{avecFolios(nt(texte, lang))}</Link>
}

// Toile d'araignée et son occupante, visibles seulement avec le thème Halloween
function Toile() {
  return (
    <svg className="toile" viewBox="0 0 100 100" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M0 0 L100 8 M0 0 L80 55 M0 0 L45 85 M0 0 L8 100" />
        <path d="M22 2 Q20 12 18 14 Q12 18 4 22" />
        <path d="M45 4 Q40 22 36 29 Q22 36 9 44" />
        <path d="M70 6 Q60 32 55 42 Q34 54 14 66" />
        <path d="M95 8 Q80 42 74 54 Q46 72 18 88" />
      </g>
      <path d="M60 0 V36" stroke="currentColor" strokeWidth=".8" />
      <g fill="currentColor">
        <ellipse cx="60" cy="40" rx="4" ry="5" />
        <path d="M56 37 l-6 -4 M56 40 l-7 0 M56 43 l-6 4 M64 37 l6 -4 M64 40 l7 0 M64 43 l6 4" stroke="currentColor" strokeWidth="1.2" />
      </g>
    </svg>
  )
}

// ---------- Couverture : l'en-tête de la maison ----------
// Désordre du lettrage « fait main » : [rotation en degrés, décalage vertical
// en em, taille relative], une entrée par caractère de « Misran Labs »
const DECALAGES = [
  [-4, -0.03, 1.18], [2, 0.02, 1], [-1, -0.02, 1], [3, 0.01, 1], [-2, 0.03, 1], [1, -0.02, 1],
  [0, 0, 1], [-3, 0.02, 1.12], [2, -0.01, 1], [-1, 0.03, 1], [3, -0.02, 1],
]

export function Couverture() {
  const { lang, toggle: basculerLangue } = useLanguage()
  const numero = getNumero()
  const titres = [
    { to: '/breves', rythme: t(lang, 'navRythmeGazette'), classe: 't-gazette', nom: `${t(lang, 'navTitreGazettePrefix')}${t(lang, 'navTitreGazetteInitiale')}${t(lang, 'navTitreGazetteReste')}` },
    { to: '/zine', rythme: getNumeros().length > 0 ? t(lang, 'navRythmeZine') : t(lang, 'navBientot'), classe: 't-zine', nom: t(lang, 'navTitreZine') },
    { to: '/jeux', rythme: t(lang, 'navRythmeJeux'), classe: 't-jeux', nom: <span>{t(lang, 'navTitreJeux')}<br />{t(lang, 'navTitreJeuxSuite')}</span> },
    { to: '/lab', rythme: t(lang, 'navRythmeLab'), classe: 't-lab', nom: t(lang, 'navTitreLab') },
  ]
  return (
    <section className="page p-une">
      {/* Bandeau rouge du haut */}
      <div className="une-bandeau">
        <div className="une-grain" aria-hidden="true" />
        <div className="une-bandeau-in">
          <Link to="/sommaire" className="une-btn-sommaire"><span aria-hidden="true">☰</span>{t(lang, 'sommaireTitre')}</Link>
          <nav className="une-liens">
            <Link to="/projets">{t(lang, 'mastheadIdees')}</Link>
            <span className="medaillon" aria-hidden="true">★</span>
            <Link to="/suivre">{t(lang, 'mastheadAbonner')}</Link>
            <span className="medaillon" aria-hidden="true">✦</span>
            <Link to="/lab/cv">{t(lang, 'mastheadCV')}</Link>
          </nav>
          <button type="button" className="une-langue" onClick={basculerLangue} aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}>
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
        </div>
      </div>

      {/* Carton kraft : logo de l'éditeur, grand titre, accroche, cartouche */}
      <header className="une-carton">
        <div className="une-grain" aria-hidden="true" />
        <Toile />
        <div className="une-carton-in">
          <span className="une-logo"><Logo1977 largeur="100%" fond="var(--masthead-logo-fond)" /></span>
          <div>
            <h1 className="une-titre" aria-label="Misran Labs">
              {[...'Misran Labs'].map((c, i) => {
                if (c === ' ') return <span key={i} style={{ width: '.34em' }} />
                const [rot, y, taille] = DECALAGES[i]
                return (
                  <span key={i} aria-hidden="true" style={{ transform: `translateY(${y}em) rotate(${rot}deg)`, fontSize: `${taille}em` }}>{c}</span>
                )
              })}
            </h1>
            <p className="une-accroche">{t(lang, 'mastheadTagline')}</p>
          </div>
          <div className="une-cartouche">
            <span>{t(lang, 'mastheadOuvertLabel')}</span>
            <b>{t(lang, 'mastheadOuvertHeure')} !!</b>
            <span>{t(lang, 'mastheadOuvertTous')}</span>
            <span className="date">{formatDateLong(aujourdhuiIso(), lang)}</span>
          </div>
        </div>
      </header>

      {/* Barre des 4 titres de la maison */}
      <div className="une-titres-zone">
        <nav className="une-titres" aria-label={t(lang, 'navAria')}>
          {titres.map((ti) => (
            <Link key={ti.to} to={ti.to}>
              <span className="centre">
                <span className="rythme">{ti.rythme}</span>
                <span className={`nom ${ti.classe}`}>{ti.nom}</span>
              </span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="une-image">
        <img src="/decors/kiosque-gazette.jpg" alt="" />
        <div className="pastille" style={{ left: '3cqw', top: '5cqw', width: '26cqw', height: '26cqw', transform: 'rotate(-10deg)' }}>{nt(NT.pastille1, lang)}</div>
        <div className="pastille" style={{ right: '4cqw', bottom: '13cqw', width: '30cqw', height: '30cqw', transform: 'rotate(8deg)', background: 'var(--pastille-2, var(--titre-zine))', color: '#111' }}>{nt(NT.pastille2, lang)}</div>
        <Fiole couleur="var(--titre-lab)" style={{ left: '40cqw', bottom: '6cqw', width: '17cqw' }} />
        <Link to="/sommaire" className="bulle" style={{ left: '55cqw', bottom: '27cqw', width: '22cqw', textDecoration: 'none' }}>{nt(NT.uneBulle, lang)}</Link>
      </div>
      <div className="une-pied">
        <span>#{numero.numero} · {nt(NT.uneDirige, lang)} · {nt(NT.unePrix, lang)} {nt(NT.unePrix2, lang)}</span>
        <span>{nt(NT.unePied, lang)}{nt(numero.mois, lang)} · {nt(NT.uneFeuilleter, lang)}</span>
      </div>
    </section>
  )
}

// ---------- Courrier des lecteurs + sommaire, généré du chemin de fer ----------
function Ligne({ entree, lang, sombre }) {
  return (
    <Link to={entree.path} className="ligne" style={sombre ? undefined : { '--f': entree.police, '--c': entree.couleur }}>
      <span className="nom">{titreDe(entree, lang)}</span>
      <span className="pts" />
      <span className="pg">p. {folioDe(entree.path)}</span>
    </Link>
  )
}

export function SommairePage() {
  const { lang } = useLanguage()
  const chemin = getChemin().slice(1)
  return (
    <section className="page p-sommaire">
      <div className="courrier">
        <div className="courrier-titre">
          <b>{nt(NT.chere, lang)}</b><strong>{nt(NT.fiole, lang)}</strong><small>{nt(NT.courrier, lang)}</small>
        </div>
        <div className="lettres">
          {NT.lettres.map((l, i) => (
            <div key={i}>
              <p>{nt(l.q, lang)} <span className="sig">{nt(l.sig, lang)}</span></p>
              <p className="rep">{nt(l.r, lang)}</p>
            </div>
          ))}
        </div>
      </div>
      <h2 className="sommaire-titre">{nt(NT.sommaire, lang)}</h2>
      <div className="sommaire">
        <div>
          <h3>{nt(NT.vos4titres, lang)}</h3>
          {chemin.filter((e) => e.format === 'double').map((e) => <Ligne key={e.path} entree={e} lang={lang} />)}
        </div>
        <div className="bloc-noir">
          <h3>{nt(NT.dansCeNumero, lang)}</h3>
          {chemin.filter((e) => e.format === 'page').map((e) => <Ligne key={e.path} entree={e} lang={lang} sombre />)}
        </div>
      </div>
      <Folio path="/sommaire" />
    </section>
  )
}

// ---------- Réclames : chaque idée P-NNN devient une pub d'époque ----------
function Reclame({ id, lang, className = '', avant, milieu }) {
  const idee = getIdea(id)
  const pub = NT.pubs[id]
  return (
    <Link to={`/projets/${id}`} className={`pub ${className}`}>
      {avant}
      <h3>{nt(pub.titre, lang)}</h3>
      {milieu}
      <p>{nt(pub.texte, lang)}</p>
      <span className="ref">{id}{idee ? ` · ${nt(NT.statuts[idee.statut] ?? NT.statuts.proposee, lang)}` : ''}</span>
    </Link>
  )
}

export function Reclames() {
  const { lang } = useLanguage()
  return (
    <section className="page p-pub">
      <div className="pub-tete">
        <div className="cadre">{nt(NT.pubAcheter, lang)}</div>
        <h2>{nt(NT.pubTitre, lang)}</h2>
        <div className="cadre">{nt(NT.pubVoter, lang)}</div>
      </div>
      <div className="pub-sous">{nt(NT.pubSous, lang)}</div>
      <div className="pubs">
        <Reclame
          id="P-009"
          lang={lang}
          className="pub-grande"
          avant={<p>{nt(NT.pubs['P-009'].sur, lang)}</p>}
          milieu={<div className="chrono" aria-hidden="true" />}
        />
        <Reclame id="P-011" lang={lang} avant={<span className="eclair" aria-hidden="true">⚡</span>} />
        <Reclame id="P-006" lang={lang} />
        <div className="pub-bas">
          <Reclame id="P-008" lang={lang} />
          <Reclame id="P-013" lang={lang} />
          <Reclame id="P-014" lang={lang} />
        </div>
      </div>
      <div className="tampon" style={{ left: '42cqw', bottom: '4cqw', color: 'var(--n-pub-encre)' }}>{nt(NT.pubTampon, lang)}</div>
      <Folio path="/reclames" />
    </section>
  )
}

// ---------- Le Lab vous présente ----------
export function LabPresente() {
  const { lang } = useLanguage()
  return (
    <section className="page p-lab">
      <div className="lab-tete">
        <strong>{nt(NT.titres.lab, lang)}</strong>
        <span>{nt(NT.labOutil, lang)}</span>
      </div>
      <div className="lab-bandeau">{nt(NT.labBandeau, lang)}</div>
      <div className="lab-visuel">
        <img src="/decors/bureau-lab.jpg" alt="" />
        <h2 className="lab-titre">
          {nt(NT.labTitre, lang).map((l) => <span key={l}>{l}<br /></span>)}
          <small>{nt(NT.labSous, lang)}</small>
        </h2>
        <div className="lab-nuancier" aria-hidden="true">
          <i style={{ background: 'var(--titre-gazette)' }} /><i style={{ background: 'var(--titre-zine)' }} /><i style={{ background: 'var(--titre-jeux)' }} /><i style={{ background: '#f1e7cf' }} />
        </div>
      </div>
      <div className="lab-pied">
        <p>{nt(NT.labTexte, lang)}</p>
        <Link to="/lab/audit-tokens" className="bouton">{nt(NT.labBouton, lang)}</Link>
      </div>
      <Folio path="/lab/presente" couleur="var(--n-papier)" />
    </section>
  )
}

// ---------- Avertissement au joueur ----------
export function Avertissement() {
  const { lang } = useLanguage()
  return (
    <section className="page p-avert">
      <div className="avert-cadre">
        <h2>{nt(NT.avertTitre, lang)[0]}<br />{nt(NT.avertTitre, lang)[1]}</h2>
        <p>{nt(NT.avertTexte, lang)}</p>
        <div className="sous">{nt(NT.avertSous, lang)}</div>
      </div>
      <div className="classement"><b>R</b><span>{nt(NT.avertClasse, lang).map((l) => <span key={l}>{l}<br /></span>)}</span></div>
      <Link to="/jeux/presente" className="clignote">PRESS START</Link>
      <Folio path="/avertissement" couleur="#e9e2d0" />
    </section>
  )
}

// ---------- Dossier, coupé en deux autour de la salle de jeu ----------
function Corps({ blocs, lang }) {
  return blocs.map((b, i) => {
    if (b.h) return <h3 key={i}>{nt(b.h, lang)}</h3>
    if (b.fiche) return <div key={i} className="fiche"><b>{nt(NT.pieceConviction, lang)} {b.n}</b>{nt(b.fiche, lang)}</div>
    if (b.citation) return <p key={i} className="citation">{nt(b.citation, lang)}</p>
    return <p key={i}>{avecFolios(nt(b.p, lang))}</p>
  })
}

export function Dossier() {
  const { lang } = useLanguage()
  return (
    <section className="page p-dossier">
      <span className="dossier-onglet">{nt(NT.dossierOnglet, lang)}</span>
      <div className="confidentiel">{nt(NT.confidentiel, lang)}</div>
      <h2 className="dossier-titre">{nt(NT.dossierTitre1, lang)}<br />{nt(NT.dossierTitre2, lang)} <em>{nt(NT.dossierTitre3, lang)}</em></h2>
      <p className="dossier-chapo">{nt(NT.dossierChapo, lang)}</p>
      <div className="dossier-corps">
        <Corps blocs={NT.d1} lang={lang} />
        <div className="suite"><Renvoi to="/dossier/suite" texte={NT.suiteDossier} lang={lang} /></div>
      </div>
      <Fiole style={{ right: '4cqw', bottom: '5cqw', width: '12cqw', transform: 'rotate(8deg)' }} fond="var(--n-kraft)" />
      <div className="bulle" style={{ right: '16cqw', bottom: '18cqw', width: '20cqw' }}>{nt(NT.bulleChut, lang)}</div>
      <Folio path="/dossier" />
    </section>
  )
}

export function DossierSuite() {
  const { lang } = useLanguage()
  return (
    <section className="page p-dossier">
      <span className="dossier-onglet">{nt(NT.dossierSuiteOnglet, lang)}</span>
      <h2 className="dossier-titre" style={{ fontSize: '8cqw' }}>
        {nt(NT.dossierTitre1, lang)}<br />{nt(NT.dossierTitre2, lang)} <em>{nt(NT.dossierTitre3, lang)}</em> <span style={{ fontSize: '4cqw' }}>{nt(NT.dossierFin, lang)}</span>
      </h2>
      <p style={{ margin: '0 0 2cqw' }}><Renvoi to="/dossier" texte={NT.debutDossier} lang={lang} /></p>
      <div className="dossier-corps">
        <Corps blocs={NT.d2} lang={lang} />
        <div className="suite"><Link to="/derniere-minute" className="renvoi">{nt(NT.lireGazette, lang)}</Link></div>
      </div>
      <div className="tampon" style={{ right: '5cqw', top: '4cqw', color: 'var(--titre-gazette)' }}>{nt(NT.pieceClassee, lang)}</div>
      <Folio path="/dossier/suite" />
    </section>
  )
}

// ---------- Ma salle de jeu présente ----------
export function JeuPresente() {
  const { lang } = useLanguage()
  return (
    <section className="page p-jeu">
      <Link to="/jeux/geste-parfait" className="jeu-ciel">
        <div className="jeu-sol" />
        <div className="jeu-entete">
          <small>{nt(NT.jeuPresente, lang)}</small>
          <h2>{lang === 'en' ? <>THE PERFECT<br />TOUCH</> : <>LE GESTE<br />PARFAIT</>}</h2>
        </div>
      </Link>
      <div className="jeu-pied">
        <p>{nt(NT.jeuTexte, lang)}</p>
        <Link to="/jeux/geste-parfait" className="piece">{nt(NT.jeuPiece, lang)[0]}<br />{nt(NT.jeuPiece, lang)[1]}</Link>
      </div>
      <Folio path="/jeux/presente" couleur="#e9e2d0" />
    </section>
  )
}

// ---------- Dernière minute : la Gazette du jour ----------
export function DerniereMinute() {
  const { lang } = useLanguage()
  const jour = getDays()[0]
  const uneIA = jour?.breves.find((b) => b.rubrique === 'ia') ?? jour?.breves[0]
  const uneTech = jour?.breves.find((b) => b.rubrique === 'tech' && b !== uneIA)
  return (
    <section className="page p-gazette">
      <div className="gaz-tete">
        <span>{nt(NT.derniereMinute, lang)}{jour ? ` · ${formatDateLong(jour.date, lang)}` : ''}</span>
        <strong>{nt(NT.gazetteTitre, lang)}</strong>
        <span>{nt(NT.gazetteSous, lang)}</span>
      </div>
      {jour && (
        <div className="gaz-grille">
          <div>
            {uneIA && (
              <>
                <div className="rub">{nt(NT.uneIA, lang)}</div>
                <h3>{nt(uneIA.titre, lang)}</h3>
                <p>{sansBalises(nt(uneIA.resume, lang))}</p>
              </>
            )}
            {uneTech && (
              <>
                <div className="rub">{nt(NT.tech, lang)}</div>
                <h3 className="petit">{nt(uneTech.titre, lang)}</h3>
                <p>{sansBalises(nt(uneTech.resume, lang))}</p>
              </>
            )}
            <Link to={`/breves/${jour.date}`} className="gaz-lien">{nt(NT.toutesBreves, lang)}</Link>
          </div>
          <div>
            {jour.chiffre && (
              <div className="chiffre">
                <span>{nt(NT.leChiffre, lang)}</span>
                <b>{jour.chiffre.valeur}</b>
                <span>{nt(jour.chiffre.texte, lang)}</span>
              </div>
            )}
            <Link to="/a-suivre" className="prochain">
              <h3>{nt(NT.prochainTitre, lang)}</h3>
              <p>{avecFolios(nt(NT.prochainTexte, lang))}</p>
            </Link>
          </div>
        </div>
      )}
      <Fiole style={{ left: '5cqw', bottom: '5cqw', width: '10cqw' }} />
      <div className="bulle" style={{ left: '16cqw', bottom: '13cqw', width: '22cqw' }}>{nt(NT.bulleDemain, lang)}</div>
      <Folio path="/derniere-minute" />
    </section>
  )
}

// ---------- 4e de couverture : ce qui va suivre, et l'ours en petit ----------
export function QuatriemeCouverture() {
  const { lang } = useLanguage()
  return (
    <section className="page p-fin">
      <div className="fin-bandeau">
        <div className="une-grain" aria-hidden="true" />
        <strong>{nt(NT.finBandeau, lang)}</strong>
        <span>{nt(NT.finNumero, lang)}</span>
      </div>
      <div className="fin-carton">
        <div className="une-grain" aria-hidden="true" />
        <h2 className="fin-titre">{nt(NT.finTitre, lang)[0]}<br />{nt(NT.finTitre, lang)[1]}</h2>
        <p className="fin-chapo">{nt(NT.finChapo, lang)}</p>
        <div className="fin-teasers">
          {NT.finTeasers.map((v, i) => (
            <Link key={v.to} to={v.to} className="fin-case" style={{ '--c': v.couleur, '--f': v.police, transform: `rotate(${i % 2 ? 1.2 : -1.2}deg)` }}>
              <span className="fin-sticker">{nt(v.sticker, lang)}</span>
              <span className="fin-icone" aria-hidden="true">{v.icone}</span>
              <b>{nt(v.titre, lang)}</b>
              <span>{nt(v.texte, lang)}</span>
            </Link>
          ))}
        </div>
        <Fiole couleur="var(--titre-lab)" fond="var(--masthead-fond)" style={{ right: '4cqw', bottom: '1.6cqw', width: '8cqw' }} />
        <div className="bulle" style={{ right: '14cqw', bottom: '2.4cqw', width: '34cqw', borderRadius: '40%' }}>{nt(NT.finBulle, lang)}</div>
        <Link to="/" className="fin-relire">{nt(NT.finRelire, lang)}</Link>
      </div>
      {/* L'ours, en petits caractères comme au dos d'un magazine */}
      <footer className="fin-ours">
        <span className="fin-logo"><Logo1977 largeur="100%" fond="#111" /></span>
        <div>
          <p>{t(lang, 'colophonTexte')}</p>
          <p className="fin-polices">{t(lang, 'colophonPolices')}</p>
          <p className="fin-liens">
            <Link to="/edito">{t(lang, 'colophonEdito')}</Link>
            <a href="https://github.com/michael-misran/misran-labs" target="_blank" rel="noreferrer">{t(lang, 'colophonGithub')}</a>
          </p>
        </div>
        <div className="fin-code" aria-hidden="true">
          <i />
          <span>{nt(NT.finPrix, lang)}</span>
        </div>
      </footer>
    </section>
  )
}
