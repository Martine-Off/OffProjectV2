import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

/* ── données statiques ── */

const FILTERS = [
  { label: 'Tous',       color: '#2D7DD2', bg: '#2D7DD2' },
  { label: 'En attente', color: '#F39C12', bg: '#FEF3CD' },
  { label: 'Validé',     color: '#2ECC71', bg: '#D5F5E3' },
  { label: 'Envoyé',     color: '#3498DB', bg: '#D6EAF8' },
]

const STATUS_STYLE = {
  'En attente': { color: '#F39C12', bg: '#FEF3CD' },
  'Validé':     { color: '#2ECC71', bg: '#D5F5E3' },
  'Envoyé':     { color: '#3498DB', bg: '#D6EAF8' },
}

const DEMANDES = [
  { id: 1, compagnie: 'Cie du Nord',       spectacle: 'Le Lac des Cygnes', places: 3, statut: 'En attente', time: 'Soumis il y a 5 min' },
  { id: 2, compagnie: 'Les Arts en Scène', spectacle: 'Hamlet',            places: 2, statut: 'Validé',     time: 'Validé à 14h20' },
  { id: 3, compagnie: "Spectacul'Air",     spectacle: 'Don Giovanni',      places: 5, statut: 'Envoyé',     time: 'Email envoyé' },
  { id: 4, compagnie: 'Troupe du Soleil',  spectacle: 'Carmen',            places: 4, statut: 'En attente', time: 'Soumis il y a 12 min' },
]

const KPI = [
  { label: 'Taux de venue',        value: '92%',  sub: 'des réservations honorées', icon: <TrendIcon /> },
  { label: 'Total Réservations',   value: '68',   sub: 'ce mois-ci',                icon: <TicketIcon /> },
  { label: 'Passages Scan',        value: '42/68', sub: 'scans validés',            icon: <ScanIcon /> },
]

const SIDEBAR_LINKS = [
  { label: 'Tableau de Bord', path: '/dashboard', icon: <DashboardNavIcon /> },
  { label: 'Invitations',     path: '/nouvelle-invitation', icon: <InviteIcon /> },
  { label: 'Scanner QR',      path: '/scanner',  icon: <QRNavIcon /> },
  { label: 'Contacts Pro',    path: '/contacts', icon: <ContactsIcon /> },
  { label: 'Paramètres',      path: '/settings', icon: <SettingsIcon /> },
]

/* ── icônes ── */

function SearchIcon({ className = 'w-5 h-5' }) {
  return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" /></svg>
}
function BellIcon({ className = 'w-5 h-5' }) {
  return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
}
function ClockIcon({ className = 'w-3.5 h-3.5' }) {
  return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 6v6l4 2" /></svg>
}
function ChevronRightIcon() {
  return <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M9 18l6-6-6-6" /></svg>
}
function HomeIcon() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 10V13h4v8m5-8v8a1 1 0 01-1 1H6a1 1 0 01-1-1v-8" /></svg>
}
function DashboardNavIcon() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
}
function ScannerNavIcon() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2m8-16h2a2 2 0 012 2v2m0 8v2a2 2 0 01-2 2h-2" /><rect x="9" y="9" width="6" height="6" rx="1" /></svg>
}
function ProfilNavIcon() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path strokeLinecap="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
}
function InviteIcon() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
}
function QRNavIcon() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2m8-16h2a2 2 0 012 2v2m0 8v2a2 2 0 01-2 2h-2" /><rect x="9" y="9" width="6" height="6" rx="1" /></svg>
}
function ContactsIcon() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4" /><path strokeLinecap="round" d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><path strokeLinecap="round" d="M16 3.13a4 4 0 010 7.75M21 20c0-3.3-2.24-6-5-6" /></svg>
}
function SettingsIcon() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
}
function TrendIcon() {
  return <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
}
function TicketIcon() {
  return <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
}
function ScanIcon() {
  return <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2m8-16h2a2 2 0 012 2v2m0 8v2a2 2 0 01-2 2h-2" /><rect x="9" y="9" width="6" height="6" rx="1" /></svg>
}

/* ── composants partagés ── */

function StatusBadge({ statut }) {
  const s = STATUS_STYLE[statut] ?? { color: '#6B7280', bg: '#F3F4F6' }
  return (
    <span className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0"
      style={{ color: s.color, backgroundColor: s.bg }}>
      {statut}
    </span>
  )
}

function DemandeCard({ item, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-2 text-left hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold text-sm truncate" style={{ color: '#1A1A2E' }}>{item.compagnie}</span>
        <StatusBadge statut={item.statut} />
      </div>
      <p className="text-xs text-gray-500 truncate">{item.spectacle}</p>
      <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
        <span className="font-medium">{item.places} pers.</span>
        <span className="flex items-center gap-1">
          <ClockIcon />
          {item.time}
          <ChevronRightIcon />
        </span>
      </div>
    </button>
  )
}

function QuotaCard() {
  const pct = 84
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold tracking-widest uppercase text-gray-500">
          Occupation du contingent Pro
        </p>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ color: '#F39C12', backgroundColor: '#FEF3CD' }}>
          Attention
        </span>
      </div>
      <div>
        <div className="flex justify-between text-sm font-semibold mb-1.5" style={{ color: '#1A1A2E' }}>
          <span>168 / 200 places pros</span>
          <span>{pct}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${pct}%`, backgroundColor: '#2D7DD2' }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1.5">Presque complet</p>
      </div>
    </div>
  )
}

/* ── bottom nav mobile ── */

function BottomNav({ navigate }) {
  const items = [
    { label: 'Accueil',   icon: <HomeIcon />,         path: '/nouvelle-invitation' },
    { label: 'Dashboard', icon: <DashboardNavIcon />, path: '/dashboard', active: true },
    { label: 'Scanner',   icon: <ScannerNavIcon />,   path: '/scanner' },
    { label: 'Profil',    icon: <ProfilNavIcon />,    path: '/profil' },
  ]
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex md:hidden z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {items.map(item => (
        <button key={item.label} onClick={() => navigate(item.path)}
          className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors"
          style={{ color: item.active ? '#2D7DD2' : '#9CA3AF' }}>
          {item.icon}
          <span className="text-[10px]">{item.label}</span>
        </button>
      ))}
    </nav>
  )
}

/* ── sidebar desktop ── */

function Sidebar({ navigate }) {
  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 min-h-screen sticky top-0"
      style={{ backgroundColor: '#1A1A2E' }}>
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-xl">⚡</span>
          <span className="text-white font-bold text-base tracking-tight">Off Project</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {SIDEBAR_LINKS.map(link => {
          const active = link.path === '/dashboard'
          return (
            <button key={link.label} onClick={() => navigate(link.path)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left w-full"
              style={{
                color: active ? '#fff' : 'rgba(255,255,255,0.55)',
                backgroundColor: active ? 'rgba(45,125,210,0.25)' : 'transparent',
              }}>
              <span style={{ color: active ? '#2D7DD2' : 'rgba(255,255,255,0.4)' }}>{link.icon}</span>
              {link.label}
            </button>
          )
        })}
      </nav>

      {/* CTA */}
      <div className="px-4 py-5 border-t border-white/10">
        <Link
          to="/nouvelle-invitation"
          className="block w-full py-3 rounded-xl text-white text-sm font-semibold text-center transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#2D7DD2' }}>
          + Nouvelle Invitation
        </Link>
      </div>
    </aside>
  )
}

/* ── KPI card ── */

function KpiCard({ label, value, sub, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</p>
        <span style={{ color: '#2D7DD2' }}>{icon}</span>
      </div>
      <p className="text-3xl font-bold" style={{ color: '#1A1A2E' }}>{value}</p>
      <p className="text-xs text-gray-400">{sub}</p>
    </div>
  )
}

/* ── panneau contingent desktop ── */

function ContingentPanel() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold tracking-widest uppercase text-gray-500">Contingent Pro</p>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ color: '#F39C12', backgroundColor: '#FEF3CD' }}>Attention</span>
      </div>
      <div>
        <div className="flex justify-between text-sm font-bold mb-2" style={{ color: '#1A1A2E' }}>
          <span>168 / 200 places</span><span>84%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div className="h-full rounded-full" style={{ width: '84%', backgroundColor: '#2D7DD2' }} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 pt-1">
        {[['Places gratuites', '142'], ['Places payantes', '26']].map(([label, val]) => (
          <div key={label} className="rounded-xl p-3 text-center" style={{ backgroundColor: '#F5F7FA' }}>
            <p className="text-xs text-gray-400">{label}</p>
            <p className="text-xl font-bold mt-1" style={{ color: '#1A1A2E' }}>{val}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProchainSpectaclePanel({ navigate }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-3">
      <p className="text-xs font-bold tracking-widest uppercase text-gray-500">Prochain Spectacle</p>
      <div className="rounded-xl p-3" style={{ backgroundColor: '#EBF4FF' }}>
        <p className="font-semibold text-sm" style={{ color: '#1A1A2E' }}>Ballet : Le Lac des Cygnes</p>
        <p className="text-xs mt-0.5" style={{ color: '#2D7DD2' }}>18 oct 20h00 • Salle D</p>
      </div>
      <button
        onClick={() => navigate('/scanner')}
        className="w-full py-3 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#1A1A2E' }}>
        Ouvrir le Scanner
      </button>
    </div>
  )
}

/* ── page principale ── */

export default function Dashboard() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('Tous')

  const filtered = activeFilter === 'Tous'
    ? DEMANDES
    : DEMANDES.filter(d => d.statut === activeFilter)

  const now = new Date()
  const dateStr = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#F5F7FA' }}>

      {/* Sidebar desktop */}
      <Sidebar navigate={navigate} />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* ── MOBILE ── */}
        <div className="md:hidden flex flex-col pb-24">
          {/* Header mobile */}
          <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between">
            <h1 className="text-base font-bold" style={{ color: '#1A1A2E' }}>Tableau de bord</h1>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500">
                <SearchIcon />
              </button>
              <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500">
                <BellIcon />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
              </button>
            </div>
          </header>

          <div className="flex flex-col gap-5 px-4 pt-5">
            {/* Filter pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {FILTERS.map(f => {
                const active = activeFilter === f.label
                return (
                  <button key={f.label} onClick={() => setActiveFilter(f.label)}
                    className="shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: active ? f.bg : '#fff',
                      color: active ? '#fff' : f.color,
                      border: `1.5px solid ${active ? f.bg : f.color}`,
                    }}>
                    {f.label}
                  </button>
                )
              })}
            </div>

            {/* Section header */}
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold tracking-widest uppercase text-gray-500">Demandes récentes</p>
              <span className="text-xs text-gray-400">{filtered.length} au total</span>
            </div>

            {/* Cartes */}
            <div className="flex flex-col gap-3">
              {filtered.map(item => (
                <DemandeCard key={item.id} item={item} onClick={() => {}} />
              ))}
            </div>

            {/* Quota */}
            <QuotaCard />
          </div>
        </div>

        {/* ── DESKTOP ── */}
        <div className="hidden md:flex flex-col gap-6 p-8">

          {/* Header desktop */}
          <header className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#1A1A2E' }}>Bonjour Paul,</h1>
              <p className="text-sm text-gray-400 mt-0.5">Voici un résumé de votre activité</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 w-52"
                  style={{ color: '#1A1A2E' }}
                />
              </div>
              <button className="relative p-2.5 rounded-xl bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                <BellIcon />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
              </button>
              <span className="text-sm text-gray-400 capitalize whitespace-nowrap">{dateStr}</span>
              <Link
                to="/nouvelle-invitation"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold whitespace-nowrap transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#2D7DD2' }}
              >
                + Nouvelle Invitation
              </Link>
            </div>
          </header>

          {/* KPI */}
          <div className="grid grid-cols-3 gap-4">
            {KPI.map(k => <KpiCard key={k.label} {...k} />)}
          </div>

          {/* Corps : grille demandes + sidebar droite */}
          <div className="grid grid-cols-[1fr_280px] gap-6 items-start">

            {/* Demandes */}
            <div className="flex flex-col gap-4">
              {/* Filters */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {FILTERS.map(f => {
                    const active = activeFilter === f.label
                    return (
                      <button key={f.label} onClick={() => setActiveFilter(f.label)}
                        className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
                        style={{
                          backgroundColor: active ? f.bg : '#fff',
                          color: active ? '#fff' : f.color,
                          border: `1.5px solid ${active ? f.bg : f.color}`,
                        }}>
                        {f.label}
                      </button>
                    )
                  })}
                </div>
                <span className="text-xs text-gray-400">{filtered.length} au total</span>
              </div>

              <p className="text-xs font-bold tracking-widest uppercase text-gray-500 -mb-1">Demandes récentes</p>

              {/* Grille 2 colonnes */}
              <div className="grid grid-cols-2 gap-4">
                {filtered.map(item => (
                  <DemandeCard key={item.id} item={item} onClick={() => {}} />
                ))}
              </div>
            </div>

            {/* Sidebar droite */}
            <div className="flex flex-col gap-4">
              <ContingentPanel />
              <ProchainSpectaclePanel navigate={navigate} />
            </div>
          </div>
        </div>
      </div>

      {/* FAB mobile */}
      <Link
        to="/nouvelle-invitation"
        className="fixed bottom-20 right-4 md:hidden w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl font-light shadow-lg z-40 transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#2D7DD2', boxShadow: '0 4px 16px rgba(45,125,210,0.4)' }}
        aria-label="Nouvelle Invitation"
      >
        +
      </Link>

      {/* Bottom nav mobile */}
      <BottomNav navigate={navigate} />
    </div>
  )
}
