import { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionTitle from '../design-system/SectionTitle'
import { useJarvisData, APPLICATION_STATUSES } from './maiaShared'

function Card({ to, icon, title, children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'var(--bg2)',
          border: `1px solid ${hovered ? 'var(--primary)' : 'var(--border)'}`,
          borderRadius: 20,
          padding: 20,
          cursor: 'pointer',
          transition: 'border-color 0.2s ease',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          height: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18 }}>{icon}</span>
          <span style={{ fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{title}</span>
        </div>
        {children}
      </div>
    </Link>
  )
}

function StatCount({ color, label, count }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
      <span style={{ color: 'var(--text2)', flex: 1 }}>{label}</span>
      <span style={{ fontFamily: "var(--font-mono)", color: 'var(--text)' }}>{count}</span>
    </div>
  )
}

export default function MAIADashboard() {
  const { items: contracts } = useJarvisData('subscriptions')
  const { items: bills } = useJarvisData('bills')
  const { items: applications } = useJarvisData('jobApplications')

  const pendingBills = bills?.filter((b) => b.status === 'pending').length ?? 0

  return (
    <div style={{ padding: 40, overflow: 'auto', height: '100%' }}>
      <SectionTitle>MAIA</SectionTitle>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 8 }}>
        <Card to="/maia/contrats" icon="📄" title="Contrats">
          <span style={{ fontSize: 13, color: 'var(--text2)' }}>
            {contracts === null ? '…' : `${contracts.length} contrat${contracts.length > 1 ? 's' : ''}`}
          </span>
        </Card>

        <Card to="/maia/factures" icon="🧾" title="Factures">
          <span style={{ fontSize: 13, color: 'var(--text2)' }}>
            {bills === null ? '…' : `${pendingBills} en attente sur ${bills.length}`}
          </span>
        </Card>

        <Card to="/maia/candidatures" icon="💼" title="Candidatures">
          {applications === null && <span style={{ fontSize: 13, color: 'var(--text2)' }}>…</span>}
          {applications?.length === 0 && <span style={{ fontSize: 13, color: 'var(--text2)' }}>Aucune candidature.</span>}
          {applications && applications.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {APPLICATION_STATUSES.map((s) => {
                const count = applications.filter((a) => a.status === s.value).length
                if (count === 0) return null
                return <StatCount key={s.value} color={s.color} label={s.label} count={count} />
              })}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
