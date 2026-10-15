import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../shell/LanguageContext'
import { LT, lt, PICTO_AGENT } from './atelierTexte'
import { SchemaCircuit, SchemaRedacteur, SchemaControleur, SchemaCycleMission, Pictogramme } from './schemas'
import { CouvertureAtelier } from './CouvertureAtelier'
import './atelier.css'

// « L'Atelier automatique », le livre de l'IA de 1977 Éditions, mis en page
// comme une notice technique des années 70. Mécanique du tourne-pages copiée
// de src/portfolio/PortfolioLivre.jsx (D2 de la SPEC : pas de mutualisation).

const mouvementReduit = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// ---------- Éléments communs ----------

function Tetiere({ g, d }) {
  return (
    <div className="at-tetiere">
      <span>{g}</span>
      <span>{d}</span>
    </div>
  )
}

function FolioNum({ n }) {
  return <div className="at-folio">{n}</div>
}

function Intertitre({ children }) {
  return <h3 className="at-intertitre">{children}</h3>
}

// Page de texte (papier), côté déduit de la parité du folio comme au Portfolio
function PagePapier({ folio, tete, classe = '', children }) {
  const cote = folio % 2 === 0 ? 'gauche' : 'droite'
  return (
    <section className={`at-page at-papier at-${cote} ${classe}`}>
      {tete && <Tetiere g={tete[0]} d={tete[1]} />}
      <div className="at-corps">{children}</div>
      <FolioNum n={folio} />
    </section>
  )
}

// ---------- Couverture ----------

function QuatriemeCouverture({ lang }) {
  return (
    <section className="at-page at-plan at-quatrieme">
      <div className="at-corps">
        <span className="at-fleuron" aria-hidden="true">⚙</span>
        <p className="at-phrase">{lt(LT.quatriemePhrase, lang)}</p>
        <span className="at-edition">1977 Éditions</span>
      </div>
      <div className="at-plaque">
        <span className="at-k">{lt(LT.plaqueModeleK, lang)}</span><span className="at-v">{lt(LT.plaqueModeleV, lang)}</span>
        <span className="at-k">{lt(LT.plaqueAlimK, lang)}</span><span className="at-v">{lt(LT.plaqueAlimV, lang)}</span>
      </div>
    </section>
  )
}

// ---------- Liste des pages, dans l'ordre de lecture ----------
//
// Chaque entrée est [cle, rendu] : `rendu(folio, folios)` reçoit son propre
// folio, calculé depuis sa position dans la liste (jamais un nombre en dur),
// et la table `folios` (cle de partie → folio de sa page d'ouverture), pour
// que le sommaire affiche toujours les vrais numéros. `cle` n'est renseignée
// que pour la première page de chaque partie (voir LT.parties).

function pagesDuLivre(lang) {
  const agentFicheRow = (k, v) => (<tr key={k}><th>{k}</th><td>{v}</td></tr>)

  const entrees = [
    // couverture
    [null, () => <CouvertureAtelier lang={lang} />],

    // garde : avant de lire
    [null, (folio) => (
      <PagePapier folio={folio}>
        <h2>{lt(LT.gardeTitre, lang)}</h2>
        <p className="at-lettrine">{lt(LT.gardeTexte, lang)}</p>
        <p>{lt(LT.gardeLecture, lang)}</p>
      </PagePapier>
    )],

    // sommaire
    [null, (folio, folios) => (
      <PagePapier folio={folio}>
        <h2>{lt(LT.sommaireTitre, lang)}</h2>
        <ol className="at-liste-sommaire">
          {LT.parties.map((p, i) => (
            <li key={i} className={p.annexe ? 'at-annexe' : ''}>
              <span>{lt(p.titre, lang)}</span>
              <i aria-hidden="true" />
              <b>{folios[p.cle]}</b>
            </li>
          ))}
        </ol>
      </PagePapier>
    )],

    // partie 0, page 1 : intro + règle Git
    ['p0', (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.p0Titre, lang), '0.1']}>
        <h2><small>{lt(LT.p0Chapeau, lang)}</small>{lt(LT.p0Titre, lang)}</h2>
        <p>{lt(LT.p0Intro, lang)}</p>
        <div className="at-attention">
          <div className="at-bande" />
          <div><strong>{lt(LT.p0GitTitre, lang)}</strong>{lt(LT.p0GitTexte, lang)}</div>
        </div>
      </PagePapier>
    )],

    // partie 0, page 2 : dépôt public + cas d'école
    [null, (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.p0Titre, lang), '0.2']}>
        <div className="at-attention">
          <div className="at-bande" />
          <div><strong>{lt(LT.p0PublicTitre, lang)}</strong>{lt(LT.p0PublicTexte, lang)}</div>
        </div>
        <Intertitre>{lt(LT.p0CasTitre, lang)}</Intertitre>
        <p>{lt(LT.p0CasTexte, lang)}</p>
        <div className="at-ecran">
          {LT.p0Ecran.map((l, i) => (
            <div key={i} className={l.attn ? 'at-attn' : l.ok ? 'at-ok' : ''}>{lt(l, lang)}</div>
          ))}
          <div className="at-attn">{lt(LT.p0EcranVerdict, lang)}</div>
        </div>
        <p className="at-note-fig">{lt(LT.p0NoteFig, lang)}</p>
      </PagePapier>
    )],

    // partie 1, figure (plan, gauche)
    ['p1', (folio) => (
      <section className="at-page at-plan at-gauche">
        <Tetiere g={lt(LT.p1Titre, lang)} d="Fig. 3" />
        <SchemaCircuit lang={lang} />
        <div className="at-cartouche">
          <div><strong>{lt(LT.p1FigLegende, lang)}</strong>{lt(LT.p1Cartouche, lang)}</div>
          <div>{lang === 'en' ? 'Scale' : 'Échelle'}<br />1 : 1</div>
        </div>
        <FolioNum n={folio} />
      </section>
    )],

    // partie 1, texte (papier, droite)
    [null, (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.p1Titre, lang), '1.1']}>
        <h2><small>{lang === 'en' ? 'Part 1' : 'Partie 1'}</small>{lt(LT.p1Titre, lang)}</h2>
        <p>{lt(LT.p1Texte1, lang)}</p>
        <p>{lt(LT.p1Texte2, lang)}</p>
        <p>{lt(LT.p1Texte3, lang)}</p>
      </PagePapier>
    )],

    // partie 2, ouverture, gauche (plan)
    ['p2', (folio) => (
      <section className="at-page at-plan at-gauche at-ouverture">
        <div className="at-corps">
          <span className="at-num">2</span>
          <h2>{lt(LT.p2Titre, lang)}</h2>
        </div>
        <FolioNum n={folio} />
      </section>
    )],

    // partie 2, ouverture, droite (papier)
    [null, (folio) => (
      <section className="at-page at-papier at-droite at-ouverture">
        <div className="at-corps">
          <p>{lt(LT.p2OuvertureTexte, lang)}</p>
        </div>
        <FolioNum n={folio} />
      </section>
    )],

    // partie 2, fiche n° 0 « Le rédacteur » : figure (plan, gauche)
    [null, (folio) => (
      <section className="at-page at-plan at-gauche">
        <Tetiere g={lt(LT.p2Chap, lang)} d="Fig. 6" />
        <SchemaRedacteur lang={lang} />
        <div className="at-cartouche">
          <div><strong>{`Fig. 6 — ${lt(LT.p2RedacteurTitre, lang)}`}</strong>A {lang === 'en' ? 'roller' : 'rouleau'} · B {lang === 'en' ? 'keyboard' : 'clavier'} · C {lang === 'en' ? 'carriage return lever' : 'levier de retour'} · D {lang === 'en' ? 'sheet' : 'feuille'}</div>
          <div>{lang === 'en' ? 'Scale' : 'Échelle'}<br />1 : 1</div>
        </div>
        <FolioNum n={folio} />
      </section>
    )],

    // partie 2, fiche n° 0 « Le rédacteur » : fiche (papier, droite)
    [null, (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.p2Chap, lang), '2.0']}>
        <h2><small>{lt(LT.p2RedacteurFicheN, lang)}</small>{lt(LT.p2RedacteurTitre, lang)}</h2>
        <table className="at-fiche"><tbody>
          {agentFicheRow(lang === 'en' ? 'Role' : 'Rôle', lt(LT.p2RedacteurRole, lang))}
          {agentFicheRow(lang === 'en' ? 'Who sits here' : 'Qui l’occupe', lt(LT.p2RedacteurQui, lang))}
          {agentFicheRow(lang === 'en' ? 'Called' : 'Appelé', lt(LT.p2RedacteurAppelle, lang))}
          {agentFicheRow(lang === 'en' ? 'Never' : 'Ne fait jamais', lt(LT.p2RedacteurJamais, lang))}
        </tbody></table>
        <div className="at-attention">
          <div className="at-bande" />
          <div><strong>{lang === 'en' ? 'Warning' : 'Attention'}</strong>{lt(LT.p2RedacteurAttention, lang)}</div>
        </div>
        <div className="at-ecran">
          {LT.p2RedacteurEcran.map((l, i) => (
            <div key={i} className={l.ok ? 'at-ok' : ''}>{lt(l, lang)}</div>
          ))}
        </div>
      </PagePapier>
    )],

    // partie 2, le controleur : figure (plan, gauche)
    [null, (folio) => (
      <section className="at-page at-plan at-gauche">
        <Tetiere g={lt(LT.titreOnglet, lang)} d="Fig. 7" />
        <SchemaControleur lang={lang} />
        <div className="at-cartouche">
          <div><strong>{`Fig. 7 — ${lt(LT.p2ControleurTitre, lang)}`}</strong>A {lang === 'en' ? 'handle' : 'poignée'} · B {lang === 'en' ? 'checks' : 'contrôles'} · C {lang === 'en' ? 'verdict' : 'verdict'} · D pull request</div>
          <div>{lang === 'en' ? 'Scale' : 'Échelle'}<br />1 : 1</div>
        </div>
        <FolioNum n={folio} />
      </section>
    )],

    // partie 2, le controleur : fiche (papier, droite)
    [null, (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.p2Chap, lang), '2.1']}>
        <h2><small>{lt(LT.p2ControleurFicheN, lang)}</small>{lt(LT.p2ControleurTitre, lang)}</h2>
        <p>{lt(LT.p2ControleurTexte, lang)}</p>
        <table className="at-fiche"><tbody>
          {agentFicheRow(lang === 'en' ? 'Called' : 'Appelé', lt(LT.p2ControleurAppele, lang))}
          {agentFicheRow(lang === 'en' ? 'Checks' : 'Contrôle', lt(LT.p2ControleurControle, lang))}
          {agentFicheRow(lang === 'en' ? 'Never' : 'Ne fait jamais', lt(LT.p2ControleurJamais, lang))}
        </tbody></table>
        <div className="at-attention">
          <div className="at-bande" />
          <div><strong>{lang === 'en' ? 'Warning' : 'Attention'}</strong>{lt(LT.p2ControleurAttention, lang)}</div>
        </div>
        <div className="at-ecran">
          {LT.p2ControleurEcran.map((l, i) => (
            <div key={i} className={l.ok ? 'at-ok' : ''}>{lt(l, lang)}</div>
          ))}
          <div className="at-ok">{lt(LT.p2ControleurVerdict, lang)}</div>
        </div>
        <p className="at-note-fig">{lt(LT.p2ControleurNoteFig, lang)}</p>
      </PagePapier>
    )],

    // partie 2, les six autres agents (papier)
    ...LT.p2Agents.map((a) => [null, (folio) => (
      <PagePapier key={a.nom} folio={folio} tete={[lt(LT.p2Chap, lang), `2.${a.ficheN}`]}>
        <div className="at-pictogramme"><Pictogramme nom={PICTO_AGENT[a.nom]} /></div>
        <h2><small>{lang === 'en' ? `Staff card no. ${a.ficheN}` : `Fiche agent n° ${a.ficheN}`}</small>{lt(a.titre, lang)}</h2>
        <table className="at-fiche"><tbody>
          {agentFicheRow(lang === 'en' ? 'Role' : 'Rôle', lt(a.texte, lang))}
          {agentFicheRow(lang === 'en' ? 'Called' : 'Appelé', lt(a.appele, lang))}
          {agentFicheRow(lang === 'en' ? 'Never' : 'Ne fait jamais', lt(a.jamais, lang))}
          {agentFicheRow(lang === 'en' ? 'Model' : 'Modèle', a.modele)}
        </tbody></table>
      </PagePapier>
    )]),

    // partie 3, ouverture (plan)
    ['p3', (folio) => (
      <section className="at-page at-plan at-gauche at-ouverture">
        <div className="at-corps">
          <span className="at-num">3</span>
          <h2>{lt(LT.p3Titre, lang)}</h2>
          <p>{lt(LT.p3OuvertureTexte, lang)}</p>
        </div>
        <FolioNum n={folio} />
      </section>
    )],

    // partie 3, une page par routine (papier)
    ...LT.p3Routines.map((r, i) => [null, (folio) => (
      <PagePapier key={i} folio={folio} tete={[lt(LT.p3Chap, lang), `3.${i + 1}`]}>
        <h2>{lt(r.titre, lang)}</h2>
        <table className="at-fiche"><tbody>
          {agentFicheRow(lt(LT.p3HoraireK, lang), lt(r.horaire, lang))}
          {agentFicheRow(lt(LT.p3ModeleK, lang), r.modele)}
          {agentFicheRow(lt(LT.p3ProduitK, lang), lt(r.produit, lang))}
          {agentFicheRow(lt(LT.p3MichaelK, lang), lt(r.michael, lang))}
        </tbody></table>
        <p>{lt(r.texte, lang)}</p>
      </PagePapier>
    )]),

    // partie 3, tableau récapitulatif (papier)
    [null, (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.p3Chap, lang), '3.6']}>
        <h2>{lt(LT.p3TableTitre, lang)}</h2>
        <table className="at-recap">
          <thead>
            <tr>{lt(LT.p3TableCols, lang).map((c) => <th key={c}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {LT.p3TableRows.map((row, i) => (
              <tr key={i}>
                <td>{lt(row[0], lang)}</td>
                <td>{lt(row[1], lang)}</td>
                <td>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </PagePapier>
    )],

    // partie 4, ouverture (plan)
    ['p4', (folio) => (
      <section className="at-page at-plan at-gauche at-ouverture">
        <div className="at-corps">
          <span className="at-num">4</span>
          <h2>{lt(LT.p4Titre, lang)}</h2>
          <p>{lt(LT.p4OuvertureTexte, lang)}</p>
        </div>
        <FolioNum n={folio} />
      </section>
    )],

    // partie 4, figure : le cycle d'une mission (plan, gauche)
    [null, (folio) => (
      <section className="at-page at-plan at-gauche">
        <Tetiere g={lt(LT.p4Titre, lang)} d="Fig. 9" />
        <SchemaCycleMission lang={lang} />
        <div className="at-cartouche">
          <div><strong>{lt(LT.p4FigLegende, lang)}</strong>{lt(LT.p4Cartouche, lang)}</div>
          <div>{lang === 'en' ? 'Scale' : 'Échelle'}<br />1 : 1</div>
        </div>
        <FolioNum n={folio} />
      </section>
    )],

    // partie 4, texte (papier, droite)
    [null, (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.p4Chap, lang), '4.1']}>
        <h2><small>{lang === 'en' ? 'Part 4' : 'Partie 4'}</small>{lt(LT.p4Titre, lang)}</h2>
        <p>{lt(LT.p4Texte1, lang)}</p>
        <p>{lt(LT.p4Texte2, lang)}</p>
      </PagePapier>
    )],

    // partie 4, les six fichiers d'une mission (papier)
    [null, (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.p4Chap, lang), '4.2']}>
        <h2>{lt(LT.p4FichiersTitre, lang)}</h2>
        <p>{lt(LT.p4FichiersTexte, lang)}</p>
        <table className="at-recap">
          <thead>
            <tr>{lt(LT.p4FichiersCols, lang).map((c) => <th key={c}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {LT.p4FichiersRows.map((row, i) => (
              <tr key={i}>
                <td>{row[0]}</td>
                <td>{lt(row[1], lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </PagePapier>
    )],

    // partie 4, file d'attente et reprise (papier)
    [null, (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.p4Chap, lang), '4.3']}>
        <h2>{lt(LT.p4QueueTitre, lang)}</h2>
        <p>{lt(LT.p4QueueTexte1, lang)}</p>
        <p>{lt(LT.p4QueueTexte2, lang)}</p>
      </PagePapier>
    )],

    // partie 4, le modèle par étape (papier)
    [null, (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.p4Chap, lang), '4.4']}>
        <h2>{lt(LT.p4ModeleTitre, lang)}</h2>
        <p>{lt(LT.p4ModeleTexte, lang)}</p>
        <table className="at-recap">
          <thead>
            <tr>{lt(LT.p4ModeleCols, lang).map((c) => <th key={c}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {LT.p4ModeleRows.map((row, i) => (
              <tr key={i}>
                <td>{lt(row[0], lang)}</td>
                <td>{row[1]}</td>
                <td>{lt(row[2], lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </PagePapier>
    )],

    // partie 4, cas d'école : la première mission (papier)
    [null, (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.p4Chap, lang), '4.5']}>
        <h2>{lt(LT.p4CasTitre, lang)}</h2>
        <p>{lt(LT.p4CasTexte, lang)}</p>
        <div className="at-ecran">
          {LT.p4CasEcran.map((l, i) => (
            <div key={i} className={l.ok ? 'at-ok' : ''}>{lt(l, lang)}</div>
          ))}
        </div>
        <p className="at-note-fig">{lt(LT.p4CasNoteFig, lang)}</p>
      </PagePapier>
    )],

    // partie 5, ouverture (plan)
    ['p5', (folio) => (
      <section className="at-page at-plan at-gauche at-ouverture">
        <div className="at-corps">
          <span className="at-num">5</span>
          <h2>{lt(LT.p5Titre, lang)}</h2>
          <p>{lt(LT.p5OuvertureTexte, lang)}</p>
        </div>
        <FolioNum n={folio} />
      </section>
    )],

    // partie 5, les mods (1/2) : garde-git, retour-routine (papier)
    [null, (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.p5Chap, lang), '5.1']}>
        <h2><small>{lang === 'en' ? 'Part 5' : 'Partie 5'}</small>{lang === 'en' ? 'Mods' : 'Les mods'}</h2>
        <p>{lt(LT.p5ModsIntro, lang)}</p>
        {LT.p5Mods.slice(0, 2).map((m) => (
          <div key={m.nom}>
            <Intertitre>{`${m.nom} · ${m.commande}`}</Intertitre>
            <table className="at-fiche"><tbody>
              {agentFicheRow(lt(LT.p5OuLabel, lang), lt(m.ou, lang))}
              {agentFicheRow(lt(LT.p5QuandLabel, lang), lt(m.quand, lang))}
              {agentFicheRow(lt(LT.p5FaitLabel, lang), lt(m.fait, lang))}
            </tbody></table>
          </div>
        ))}
      </PagePapier>
    )],

    // partie 5, les mods (2/2) : kiosque, garde-controleur (papier)
    [null, (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.p5Chap, lang), '5.2']}>
        {LT.p5Mods.slice(2, 4).map((m) => (
          <div key={m.nom}>
            <Intertitre>{`${m.nom} · ${m.commande}`}</Intertitre>
            <table className="at-fiche"><tbody>
              {agentFicheRow(lt(LT.p5OuLabel, lang), lt(m.ou, lang))}
              {agentFicheRow(lt(LT.p5QuandLabel, lang), lt(m.quand, lang))}
              {agentFicheRow(lt(LT.p5FaitLabel, lang), lt(m.fait, lang))}
            </tbody></table>
          </div>
        ))}
      </PagePapier>
    )],

    // partie 5, le skill /mission (papier)
    [null, (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.p5Chap, lang), '5.3']}>
        <h2>{lt(LT.p5SkillTitre, lang)}</h2>
        <p>{lt(LT.p5SkillTexte, lang)}</p>
        <table className="at-recap">
          <thead>
            <tr>{lt(LT.p5SkillModeCols, lang).map((c) => <th key={c}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {LT.p5SkillModes.map((row, i) => (
              <tr key={i}>
                <td>{lt(row[0], lang)}</td>
                <td>{lt(row[1], lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>{lt(LT.p5SkillTexte2, lang)}</p>
      </PagePapier>
    )],

    // partie 5, les connexions utiles (papier)
    [null, (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.p5Chap, lang), '5.4']}>
        <h2>{lt(LT.p5ConnexTitre, lang)}</h2>
        <Intertitre>{lt(LT.p5ConnexNavTitre, lang)}</Intertitre>
        <p>{lt(LT.p5ConnexNavTexte, lang)}</p>
        <Intertitre>{lt(LT.p5ConnexFigmaTitre, lang)}</Intertitre>
        <p>{lt(LT.p5ConnexFigmaTexte, lang)}</p>
        <Intertitre>{lt(LT.p5ConnexLightpandaTitre, lang)}</Intertitre>
        <p>{lt(LT.p5ConnexLightpandaTexte, lang)}</p>
      </PagePapier>
    )],

    // partie 6, ouverture (plan)
    ['p6', (folio) => (
      <section className="at-page at-plan at-gauche at-ouverture">
        <div className="at-corps">
          <span className="at-num">6</span>
          <h2>{lt(LT.p6Titre, lang)}</h2>
          <p>{lt(LT.p6OuvertureTexte, lang)}</p>
        </div>
        <FolioNum n={folio} />
      </section>
    )],

    // partie 6, les vrais leviers sur le quota (papier)
    [null, (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.p6Chap, lang), '6.1']}>
        <h2><small>{lang === 'en' ? 'Part 6' : 'Partie 6'}</small>{lt(LT.p6LeviersTitre, lang)}</h2>
        <ul>
          {LT.p6Leviers.map((l, i) => (<li key={i}>{lt(l, lang)}</li>))}
        </ul>
        <p>{lt(LT.p6LeviersNote, lang)}</p>
      </PagePapier>
    )],

    // partie 6, économiser les tokens (papier)
    [null, (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.p6Chap, lang), '6.2']}>
        <h2>{lt(LT.p6EconomieTitre, lang)}</h2>
        <p>{lt(LT.p6EconomieTexte, lang)}</p>
        <table className="at-recap">
          <thead>
            <tr>{lt(LT.p6EconomieCols, lang).map((c) => <th key={c}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {LT.p6EconomieRows.map((row, i) => (
              <tr key={i}>
                <td>{lt(row[0], lang)}</td>
                <td>{lt(row[1], lang)}</td>
                <td>{lt(row[2], lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="at-note-fig">{lt(LT.p6EconomieNote, lang)}</p>
      </PagePapier>
    )],

    // partie 6, quel modèle pour quel travail (papier)
    [null, (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.p6Chap, lang), '6.3']}>
        <h2>{lt(LT.p6ModeleTitre, lang)}</h2>
        <table className="at-recap">
          <thead>
            <tr>{lt(LT.p6ModeleCols, lang).map((c) => <th key={c}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {LT.p6ModeleRows.map((row, i) => (
              <tr key={i}>
                <td>{lt(row[0], lang)}</td>
                <td>{row[1]}</td>
                <td>{lt(row[2], lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </PagePapier>
    )],

    // partie 7, ouverture (plan)
    ['p7', (folio) => (
      <section className="at-page at-plan at-gauche at-ouverture">
        <div className="at-corps">
          <span className="at-num">7</span>
          <h2>{lt(LT.p7Titre, lang)}</h2>
          <p>{lt(LT.p7OuvertureTexte, lang)}</p>
        </div>
        <FolioNum n={folio} />
      </section>
    )],

    // partie 7, tableau de dépannage (1/3) (papier)
    [null, (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.p7Chap, lang), '7.1']}>
        <h2><small>{lang === 'en' ? 'Part 7' : 'Partie 7'}</small>{lt(LT.p7Titre, lang)}</h2>
        <table className="at-recap">
          <thead>
            <tr>{lt(LT.p7Cols, lang).map((c) => <th key={c}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {LT.p7Rows1.map((row, i) => (
              <tr key={i}>
                <td>{lt(row[0], lang)}</td>
                <td>{lt(row[1], lang)}</td>
                <td>{lt(row[2], lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </PagePapier>
    )],

    // partie 7, tableau de dépannage (2/3) (papier)
    [null, (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.p7Chap, lang), '7.2']}>
        <table className="at-recap">
          <thead>
            <tr>{lt(LT.p7Cols, lang).map((c) => <th key={c}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {LT.p7Rows2.map((row, i) => (
              <tr key={i}>
                <td>{lt(row[0], lang)}</td>
                <td>{lt(row[1], lang)}</td>
                <td>{lt(row[2], lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </PagePapier>
    )],

    // partie 7, tableau de dépannage (3/3) (papier)
    [null, (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.p7Chap, lang), '7.3']}>
        <table className="at-recap">
          <thead>
            <tr>{lt(LT.p7Cols, lang).map((c) => <th key={c}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {LT.p7Rows3.map((row, i) => (
              <tr key={i}>
                <td>{lt(row[0], lang)}</td>
                <td>{lt(row[1], lang)}</td>
                <td>{lt(row[2], lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </PagePapier>
    )],

    // partie 8, ouverture (plan)
    ['p8', (folio) => (
      <section className="at-page at-plan at-gauche at-ouverture">
        <div className="at-corps">
          <span className="at-num">8</span>
          <h2>{lt(LT.p8Titre, lang)}</h2>
          <p>{lt(LT.p8OuvertureTexte, lang)}</p>
        </div>
        <FolioNum n={folio} />
      </section>
    )],

    // partie 8, registre (1 à 3) (papier)
    ...[0, 8, 16].map((debut, i) => [null, (folio) => {
      const operateur = (code) => (code === 'michael' ? (lang === 'en' ? 'Michael' : 'Michael') : code === 'tache' ? lt(LT.p8ProgTache, lang) : code === 'mc' ? lt(LT.p8MichaelClaude, lang) : code)
      return (
        <PagePapier key={i} folio={folio} tete={[lt(LT.p8Chap, lang), `8.${i + 1}`]}>
          {i === 0 && <h2><small>{lang === 'en' ? 'Part 8' : 'Partie 8'}</small>{lt(LT.p8Titre, lang)}</h2>}
          <table className="at-recap">
            <thead>
              <tr>{lt(LT.p8Cols, lang).map((c) => <th key={c}>{c}</th>)}</tr>
            </thead>
            <tbody>
              {LT.p8Entries.slice(debut, debut + 8).map(([label, code], j) => (
                <tr key={j}>
                  <td>{String(debut + j + 1).padStart(2, '0')}</td>
                  <td>{lt(label, lang)}</td>
                  <td>{operateur(code)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </PagePapier>
      )
    }]),

    // annexe, glossaire (1/2) (papier)
    ['glossaire', (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.glossaireChap, lang), 'A.1']}>
        <h2>{lt(LT.glossaireTitre, lang)}</h2>
        <table className="at-fiche"><tbody>
          {LT.glossaireTermes1.map(([terme, def]) => agentFicheRow(lt(terme, lang), lt(def, lang)))}
        </tbody></table>
      </PagePapier>
    )],

    // annexe, glossaire (2/2) (papier)
    [null, (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.glossaireChap, lang), 'A.2']}>
        <table className="at-fiche"><tbody>
          {LT.glossaireTermes2.map(([terme, def]) => agentFicheRow(lt(terme, lang), lt(def, lang)))}
        </tbody></table>
      </PagePapier>
    )],

    // page de notes, lignée
    [null, (folio) => (
      <PagePapier folio={folio}>
        <h2>{lt(LT.notesTitre, lang)}</h2>
        <div className="at-lignes" aria-hidden="true" />
      </PagePapier>
    )],

    // 4ᵉ de couverture
    [null, () => <QuatriemeCouverture lang={lang} />],
  ]

  const folios = {}
  entrees.forEach(([cle], i) => { if (cle) folios[cle] = i + 1 })
  return entrees.map(([, rendu], i) => () => rendu(i + 1, folios))
}

// Regroupe les pages en planches : couverture seule à droite, puis les pages
// deux par deux, la 4ᵉ de couverture seule à gauche
function enPlanches(pages) {
  const planches = [[null, pages[0]]]
  for (let i = 1; i < pages.length; i += 2) planches.push([pages[i], pages[i + 1] ?? null])
  return planches
}

function Cote({ page, cote }) {
  if (!page) return <div className={`at-cote at-cote-${cote} at-cote-vide`} />
  return <div className={`at-cote at-cote-${cote}`}>{page()}</div>
}

export default function AtelierLivre() {
  const { lang, toggle: basculerLangue } = useLanguage()
  const pages = pagesDuLivre(lang)
  const planches = enPlanches(pages)
  const derniere = planches.length - 1

  const [planche, setPlanche] = useState(() => {
    const n = parseInt(window.location.hash.slice(1), 10)
    return Number.isFinite(n) ? Math.min(Math.max(n, 0), derniere) : 0
  })
  const [tour, setTour] = useState(null)

  useEffect(() => {
    document.title = `${lt(LT.titreOnglet, lang)} · 1977 Éditions`
  }, [lang])
  useEffect(() => {
    window.history.replaceState(null, '', planche ? `#${planche}` : window.location.pathname)
  }, [planche])

  const aller = useCallback((vers) => {
    if (tour || vers < 0 || vers > derniere || vers === planche) return
    if (mouvementReduit()) { setPlanche(vers); return }
    setTour({ vers, sens: vers > planche ? 'avant' : 'arriere' })
  }, [tour, derniere, planche])
  const finTour = () => {
    if (!tour) return
    setPlanche(tour.vers)
    setTour(null)
  }

  useEffect(() => {
    const surTouche = (e) => {
      if (e.key === 'ArrowRight') aller(planche + 1)
      if (e.key === 'ArrowLeft') aller(planche - 1)
    }
    window.addEventListener('keydown', surTouche)
    return () => window.removeEventListener('keydown', surTouche)
  }, [aller, planche])

  const [x0, setX0] = useState(null)
  const glisser = {
    onTouchStart: (e) => setX0(e.touches[0].clientX),
    onTouchEnd: (e) => {
      if (x0 === null) return
      const dx = e.changedTouches[0].clientX - x0
      if (Math.abs(dx) > 50) aller(planche + (dx < 0 ? 1 : -1))
      setX0(null)
    },
  }

  const [g, d] = planches[planche]
  let gauche = g
  let droite = d
  let feuillet = null
  if (tour) {
    const [vg, vd] = planches[tour.vers]
    if (tour.sens === 'avant') {
      droite = vd
      feuillet = { cote: 'droite', recto: d, verso: vg }
    } else {
      gauche = vg
      feuillet = { cote: 'gauche', recto: g, verso: vd }
    }
  }
  const ferme = planche === 0 && !tour

  return (
    <div className="at-table">
      <nav className="at-nav no-print">
        <Link to="/" className="at-retour">← {lt(LT.bibliotheque, lang)}</Link>
        <span className="at-nav-titre">{lt(LT.titreOnglet, lang)}</span>
        <span className="at-nav-droite">
          <button type="button" onClick={() => window.print()}>{lt(LT.imprimer, lang)}</button>
          <button type="button" onClick={basculerLangue} aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}>
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
        </span>
      </nav>

      <div className={`at-livre no-print${ferme ? ' at-ferme' : ''}${planche === derniere && !tour ? ' at-dos' : ''}`} {...glisser}>
        <Cote page={gauche} cote="gauche" />
        <Cote page={droite} cote="droite" />
        {feuillet && (
          <div
            key={`${planche}>${tour.vers}`}
            className={`at-feuillet at-feuillet-${feuillet.cote}`}
            onAnimationEnd={finTour}
            aria-hidden="true"
          >
            <div className="at-face at-recto">{feuillet.recto?.()}</div>
            <div className="at-face at-verso">{feuillet.verso?.()}</div>
          </div>
        )}
        {planche > 0 && <button type="button" className="at-zone at-zone-gauche" aria-label={lt(LT.precedente, lang)} onClick={() => aller(planche - 1)} />}
        {planche < derniere && <button type="button" className="at-zone at-zone-droite" aria-label={planche === 0 ? lt(LT.ouvrir, lang) : lt(LT.suivante, lang)} onClick={() => aller(planche + 1)} />}
      </div>

      <div className="at-commandes no-print">
        <button type="button" onClick={() => aller(planche - 1)} disabled={planche === 0} aria-label={lt(LT.precedente, lang)}>‹</button>
        <span className="at-pagination">
          {planches.map((_, i) => (
            <button
              key={i}
              type="button"
              className={i === planche ? 'actif' : ''}
              aria-current={i === planche ? 'page' : undefined}
              aria-label={`${i + 1} / ${planches.length}`}
              onClick={() => aller(i)}
            />
          ))}
        </span>
        <button type="button" onClick={() => aller(planche + 1)} disabled={planche === derniere} aria-label={lt(LT.suivante, lang)}>›</button>
      </div>

      <div className="at-pile">
        {pages.map((page, i) => (
          <div key={i} className="at-pile-page">{page()}</div>
        ))}
      </div>
    </div>
  )
}
