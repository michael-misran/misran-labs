// ─── Data ─────────────────────────────────────────────────────────────────────

const PRICING = {
  'claude-sonnet-4': { input: 3,    output: 15   },
  'claude-haiku-4':  { input: 0.25, output: 1.25 },
  'claude-opus-4':   { input: 15,   output: 75   },
}

const MOCK_CALLS = [
  { id:1, ts:'2026-03-14T17:32:11', model:'claude-sonnet-4', module:'UX Audit',       inputTokens:1240, outputTokens:890  },
  { id:2, ts:'2026-03-14T17:45:03', model:'claude-sonnet-4', module:'Brief Machine',  inputTokens:320,  outputTokens:1450 },
  { id:3, ts:'2026-03-14T18:01:22', model:'claude-haiku-4',  module:'SaaS Generator', inputTokens:180,  outputTokens:2100 },
  { id:4, ts:'2026-03-14T18:12:44', model:'claude-sonnet-4', module:'UX Audit',       inputTokens:1560, outputTokens:1020 },
  { id:5, ts:'2026-03-14T18:33:09', model:'claude-opus-4',   module:'Brief Machine',  inputTokens:890,  outputTokens:640  },
]

const BUDGET_ALERT = 0.10

function calcCost(model, inputTokens, outputTokens) {
  const p = PRICING[model]
  return (inputTokens / 1_000_000 * p.input) + (outputTokens / 1_000_000 * p.output)
}

// ─── Pre-computed stats ────────────────────────────────────────────────────────

const callsWithCost = MOCK_CALLS.map(c => ({ ...c, cost: calcCost(c.model, c.inputTokens, c.outputTokens) }))
const totalCost     = callsWithCost.reduce((s, c) => s + c.cost, 0)
const totalTokens   = callsWithCost.reduce((s, c) => s + c.inputTokens + c.outputTokens, 0)
const avgCost       = totalCost / callsWithCost.length

const modelStats = Object.entries(PRICING).map(([model]) => {
  const calls = callsWithCost.filter(c => c.model === model)
  const cost  = calls.reduce((s, c) => s + c.cost, 0)
  const tok   = calls.reduce((s, c) => s + c.inputTokens + c.outputTokens, 0)
  return { model, calls: calls.length, tokens: tok, cost, pct: totalCost > 0 ? cost / totalCost * 100 : 0 }
})

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt$(n)   { return '$' + n.toFixed(4) }
function fmtTs(ts) { return ts.split('T')[1].replace('Z', '') }

function moduleBadgeStyle(mod) {
  const map = {
    'UX Audit':       { color: '#00d4ff', border: 'rgba(0,212,255,0.4)' },
    'Brief Machine':  { color: '#25e2cc', border: 'rgba(37,226,204,0.4)' },
    'SaaS Generator': { color: '#a78bfa', border: 'rgba(167,139,250,0.4)' },
  }
  return map[mod] ?? { color: '#7a9bb5', border: 'rgba(122,155,181,0.4)' }
}

function modelColor(model) {
  if (model === 'claude-sonnet-4') return '#25e2cc'
  if (model === 'claude-haiku-4')  return '#00ff88'
  if (model === 'claude-opus-4')   return '#ffaa00'
  return '#7a9bb5'
}

function costColor(cost) {
  if (cost < 0.01) return '#7a9bb5'
  if (cost < 0.05) return '#25e2cc'
  return '#f59e0b'
}

function budgetBarColor(ratio) {
  if (ratio < 0.8) return '#00ff88'
  if (ratio <= 1)  return '#f59e0b'
  return '#ff4444'
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ value, label, valueColor }) {
  return (
    <div style={{
      background: '#0d1220',
      border: '1px solid #1a2a3a',
      borderRadius: 8,
      padding: 20,
      flex: 1,
      minWidth: 0,
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 28,
        fontWeight: 700,
        color: valueColor ?? '#25e2cc',
        lineHeight: 1,
        marginBottom: 8,
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 11,
        color: '#7a9bb5',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      }}>
        {label}
      </div>
    </div>
  )
}

function BudgetBar() {
  const ratio = totalCost / BUDGET_ALERT
  const pct   = Math.min(ratio * 100, 100)
  const barColor = budgetBarColor(ratio)

  let boxColor = '#00ff88'
  let boxBg    = 'rgba(0,255,136,0.06)'
  let boxBorder= 'rgba(0,255,136,0.25)'
  let prefix   = '✓'
  if (ratio > 1)   { boxColor = '#ff4444'; boxBg = 'rgba(255,68,68,0.06)';   boxBorder = 'rgba(255,68,68,0.3)';   prefix = '✗ BUDGET DÉPASSÉ' }
  else if (ratio > 0.8) { boxColor = '#f59e0b'; boxBg = 'rgba(245,158,11,0.06)'; boxBorder = 'rgba(245,158,11,0.3)'; prefix = '⚠ LIMITE APPROCHÉE' }

  return (
    <div style={{
      background: boxBg,
      border: `1px solid ${boxBorder}`,
      borderRadius: 8,
      padding: '16px 20px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: boxColor, letterSpacing: '0.06em' }}>
          {prefix} Budget consommé : {fmt$(totalCost)} / ${BUDGET_ALERT.toFixed(2)}
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: boxColor }}>
          {(ratio * 100).toFixed(1)}%
        </span>
      </div>
      <div style={{ height: 4, background: '#1a2a3a', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: barColor, borderRadius: 2, transition: 'width 0.5s ease' }} />
      </div>
    </div>
  )
}

function CallsTable() {
  return (
    <div style={{ border: '1px solid #1a2a3a', borderRadius: 8, overflow: 'hidden' }}>
      {/* Table header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '100px 1fr 160px 90px 90px 80px',
        background: '#060a10',
        borderBottom: '1px solid #1a2a3a',
        padding: '10px 16px',
        gap: 8,
      }}>
        {['TIMESTAMP', 'MODULE', 'MODÈLE', 'INPUT', 'OUTPUT', 'COÛT'].map(h => (
          <span key={h} style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: '#4a7a94',
            letterSpacing: '0.1em',
            textAlign: h === 'INPUT' || h === 'OUTPUT' ? 'right' : 'left',
          }}>
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      {callsWithCost.map((c, i) => {
        const bs = moduleBadgeStyle(c.module)
        return (
          <div
            key={c.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '100px 1fr 160px 90px 90px 80px',
              padding: '10px 16px',
              gap: 8,
              borderBottom: i < callsWithCost.length - 1 ? '1px solid #1a2a3a' : 'none',
              background: i % 2 === 0 ? 'transparent' : 'rgba(13,18,32,0.4)',
              alignItems: 'center',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(26,42,58,0.3)'}
            onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'rgba(13,18,32,0.4)'}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#7a9bb5' }}>
              {fmtTs(c.ts)}
            </span>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              color: bs.color,
              border: `1px solid ${bs.border}`,
              borderRadius: 3,
              padding: '2px 8px',
              display: 'inline-block',
              whiteSpace: 'nowrap',
              width: 'fit-content',
            }}>
              {c.module}
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: modelColor(c.model) }}>
              {c.model}
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#7a9bb5', textAlign: 'right' }}>
              {c.inputTokens.toLocaleString()}
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#7a9bb5', textAlign: 'right' }}>
              {c.outputTokens.toLocaleString()}
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: costColor(c.cost) }}>
              {fmt$(c.cost)}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function ModelBreakdown() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
      {modelStats.map(m => (
        <div key={m.model} style={{
          background: '#0d1220',
          border: '1px solid #1a2a3a',
          borderRadius: 8,
          padding: '16px 20px',
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: modelColor(m.model),
            marginBottom: 12,
            letterSpacing: '0.04em',
          }}>
            {m.model}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
            {[
              { label: 'Appels',  value: String(m.calls) },
              { label: 'Tokens',  value: m.tokens.toLocaleString() },
              { label: 'Coût',    value: fmt$(m.cost) },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#4a7a94' }}>{label}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#c4d8e8' }}>{value}</span>
              </div>
            ))}
          </div>
          {/* Proportion bar */}
          <div style={{ height: 3, background: '#1a2a3a', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${m.pct}%`,
              background: modelColor(m.model),
              borderRadius: 2,
            }} />
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4a7a94', marginTop: 4 }}>
            {m.pct.toFixed(1)}% du coût total
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function ApiMonitorModule() {
  const budgetColor = totalCost > BUDGET_ALERT ? '#ff4444' : '#25e2cc'

  return (
    <div style={{
      padding: 32,
      overflowY: 'auto',
      height: '100%',
      fontFamily: "'Inter', sans-serif",
      color: '#e8f4f8',
      display: 'flex',
      flexDirection: 'column',
      gap: 28,
    }}>

      {/* ── Header ── */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#25e2cc', letterSpacing: '0.1em' }}>
              {'// API COST MONITOR'}
            </span>
            <div style={{ flex: 1, height: 1, background: '#1a2a3a', width: 80 }} />
          </div>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: '#f59e0b',
            border: '1px solid rgba(245,158,11,0.4)',
            background: 'rgba(245,158,11,0.06)',
            borderRadius: 3,
            padding: '3px 10px',
            letterSpacing: '0.1em',
          }}>
            SIMULATION
          </span>
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#7a9bb5' }}>
          Monitoring des appels · Données simulées
        </p>
      </div>

      {/* ── Stats row ── */}
      <div style={{ display: 'flex', gap: 12 }}>
        <StatCard value={fmt$(totalCost)}              label="SESSION COST"         valueColor={budgetColor} />
        <StatCard value={totalTokens.toLocaleString()} label="TOKENS CONSOMMÉS"     />
        <StatCard value={String(callsWithCost.length)} label="APPELS API"           />
        <StatCard value={fmt$(avgCost)}                label="COÛT MOYEN / APPEL"   />
      </div>

      {/* ── Budget alert bar ── */}
      <BudgetBar />

      {/* ── Calls table ── */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#25e2cc', letterSpacing: '0.08em' }}>
            {'// APPELS RÉCENTS'}
          </span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: '#4a7a94',
            border: '1px solid #1a2a3a',
            borderRadius: 3,
            padding: '2px 8px',
          }}>
            {callsWithCost.length} appels
          </span>
        </div>
        <CallsTable />
      </div>

      {/* ── Model breakdown ── */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#25e2cc', letterSpacing: '0.08em' }}>
            {'// RÉPARTITION PAR MODÈLE'}
          </span>
        </div>
        <ModelBreakdown />
      </div>

      {/* ── Footer ── */}
      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        color: '#4a7a94',
        lineHeight: 1.7,
        borderTop: '1px solid #1a2a3a',
        paddingTop: 16,
      }}>
        {'// Données simulées · Les vrais coûts seront trackés automatiquement'}<br />
        {'   quand une API sera branchée · Tarifs Anthropic au 14.03.2026'}
      </p>

    </div>
  )
}
