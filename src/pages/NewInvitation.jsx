import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createRecord } from '../lib/airtable'

const SPECTACLE = {
  nom: 'Ballet : Le Lac des Cygnes',
  date: '18 oct 20h00',
  salle: 'Salle D',
}

const TABLE_ID = 'tbl82vEhte5d2ziZW'

function Stepper({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span style={{ color: '#1A1A2E' }} className="text-sm font-medium">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-lg font-medium text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors"
        >
          −
        </button>
        <span style={{ color: '#1A1A2E' }} className="w-6 text-center font-semibold text-base">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-medium text-white transition-colors"
          style={{ backgroundColor: '#2D7DD2' }}
        >
          +
        </button>
      </div>
    </div>
  )
}

function Badge({ children }) {
  return (
    <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full"
      style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}>
      {children}
    </span>
  )
}

function BottomNav() {
  const navigate = useNavigate()
  const items = [
    { label: 'Accueil',   icon: <HomeIcon />,      path: '/dashboard' },
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { label: 'Scanner',   icon: <ScannerIcon />,   path: '/scanner' },
    { label: 'Profil',    icon: <ProfilIcon />,    path: '/profil' },
  ]
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex md:hidden z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {items.map(item => (
        <button
          key={item.label}
          onClick={() => navigate(item.path)}
          className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-gray-500 hover:text-blue-600 transition-colors"
        >
          {item.icon}
          <span className="text-[10px]">{item.label}</span>
        </button>
      ))}
    </nav>
  )
}

function HomeIcon() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 10V13h4v8m5-8v8a1 1 0 01-1 1H6a1 1 0 01-1-1v-8" /></svg>
}
function DashboardIcon() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
}
function ScannerIcon() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2m8-16h2a2 2 0 012 2v2m0 8v2a2 2 0 01-2 2h-2" /><rect x="9" y="9" width="6" height="6" rx="1" /></svg>
}
function ProfilIcon() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path strokeLinecap="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
}

export default function NewInvitation() {
  const navigate = useNavigate()

  const [professionnel, setProfessionnel] = useState('')
  const [structure, setStructure] = useState('')
  const [email, setEmail] = useState('paul.chevalier@email.com')
  const [placesGratuites, setPlacesGratuites] = useState(2)
  const [placesPayantes, setPlacesPayantes] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const total = placesGratuites + placesPayantes

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const today = new Date().toISOString().split('T')[0]
      const record = await createRecord(TABLE_ID, {
        Statut: 'Soumis',
        "Nombre d'invitations": placesGratuites,
        'Nb payantes': placesPayantes,
        'Date soumission': today,
        Professionnel: ['rec3y3N9Bo2NJmgUw'],
      })
      navigate('/confirmation', {
        state: {
          record,
          spectacle: SPECTACLE,
          professionnel,
          structure,
          email,
          placesGratuites,
          placesPayantes,
          total,
        },
      })
    } catch (err) {
      setError('Erreur lors de la soumission. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Info card spectacle */}
      <div className="rounded-2xl p-4" style={{ backgroundColor: '#EBF4FF' }}>
        <p className="font-semibold text-sm" style={{ color: '#1A1A2E' }}>{SPECTACLE.nom}</p>
        <p className="text-sm mt-0.5" style={{ color: '#2D7DD2' }}>
          {SPECTACLE.date} • {SPECTACLE.salle}
        </p>
      </div>

      {/* Détails de l'invité */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: '#1A1A2E' }}>
          Détails de l'invité
        </h2>

        {/* Professionnel */}
        <div className="mb-3">
          <label className="block text-xs font-medium mb-1" style={{ color: '#1A1A2E' }}>
            Nom du Professionnel <Badge>Requis</Badge>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
              </svg>
            </span>
            <select
              value={professionnel}
              onChange={e => setProfessionnel(e.target.value)}
              className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 appearance-none"
              style={{ color: professionnel ? '#1A1A2E' : '#9CA3AF', focusRingColor: '#2D7DD2' }}
              required
            >
              <option value="" disabled>Nom, Prénom</option>
              <option value="Paul Chevalier">Paul Chevalier</option>
              <option value="Marie Dupont">Marie Dupont</option>
              <option value="Jean Martin">Jean Martin</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>

        {/* Structure */}
        <div className="mb-3">
          <label className="block text-xs font-medium mb-1" style={{ color: '#1A1A2E' }}>
            Structure / Organisation <Badge>Requis</Badge>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 14v3m4-3v3m4-3v3" />
              </svg>
            </span>
            <input
              type="text"
              value={structure}
              onChange={e => setStructure(e.target.value)}
              placeholder="Rechercher un établissement..."
              className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 placeholder-gray-400"
              style={{ color: '#1A1A2E' }}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: '#1A1A2E' }}>Email</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2"
              style={{ color: '#1A1A2E' }}
            />
          </div>
        </div>
      </section>

      {/* Séparateur */}
      <hr className="border-gray-200" />

      {/* Nombre de places */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: '#1A1A2E' }}>
          Nombre de places
        </h2>

        <Stepper label="Places gratuites" value={placesGratuites} onChange={setPlacesGratuites} />
        <hr className="border-gray-100" />
        <Stepper label="Places payantes" value={placesPayantes} onChange={setPlacesPayantes} />
        <hr className="border-gray-200 mt-1" />

        <div className="flex justify-between items-center pt-3">
          <span className="font-bold text-sm" style={{ color: '#1A1A2E' }}>Total</span>
          <span className="font-bold text-sm" style={{ color: '#1A1A2E' }}>{total} place{total > 1 ? 's' : ''}</span>
        </div>
      </section>

      {/* Erreur */}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{error}</p>
      )}

      {/* Bouton soumettre */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-2xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-opacity disabled:opacity-60"
        style={{ backgroundColor: '#1A1A2E' }}
      >
        {loading ? (
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        ) : (
          <>Soumettre l'invitation <span>✓</span></>
        )}
      </button>

      {/* Lien secondaire */}
      <button
        type="button"
        className="text-sm text-center font-medium transition-colors"
        style={{ color: '#2D7DD2' }}
        onClick={() => {
          setProfessionnel('')
          setStructure('')
          setEmail('')
          setPlacesGratuites(2)
          setPlacesPayantes(1)
        }}
      >
        Ajouter un autre invité +
      </button>
    </form>
  )

  const recapCard = (
    <div className="rounded-2xl border border-gray-200 p-6 flex flex-col gap-4 sticky top-6">
      <h3 className="font-semibold text-base" style={{ color: '#1A1A2E' }}>Récapitulatif</h3>

      <div className="rounded-xl p-4" style={{ backgroundColor: '#EBF4FF' }}>
        <p className="font-semibold text-sm" style={{ color: '#1A1A2E' }}>{SPECTACLE.nom}</p>
        <p className="text-sm mt-0.5" style={{ color: '#2D7DD2' }}>
          {SPECTACLE.date} • {SPECTACLE.salle}
        </p>
      </div>

      <div className="flex flex-col gap-2 text-sm" style={{ color: '#1A1A2E' }}>
        <div className="flex justify-between">
          <span className="text-gray-500">Places gratuites</span>
          <span className="font-medium">{placesGratuites}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Places payantes</span>
          <span className="font-medium">{placesPayantes}</span>
        </div>
        <hr className="border-gray-200 my-1" />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{total} place{total > 1 ? 's' : ''}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-4 rounded-2xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-opacity disabled:opacity-60"
        style={{ backgroundColor: '#1A1A2E' }}
      >
        {loading ? (
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        ) : (
          <>Soumettre l'invitation <span>✓</span></>
        )}
      </button>
    </div>
  )

  return (
    <div className="min-h-screen pb-20 md:pb-0" style={{ backgroundColor: '#F5F7FA' }}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="#1A1A2E" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <h1 className="text-base font-semibold absolute left-1/2 -translate-x-1/2" style={{ color: '#1A1A2E' }}>
            Nouvelle Invitation
          </h1>

          <span className="text-xl">⚡</span>
        </div>
      </header>

      {/* Layout */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Mobile : une colonne */}
        <div className="md:hidden">
          {formContent}
        </div>

        {/* Desktop : deux colonnes */}
        <div className="hidden md:grid md:grid-cols-[1fr_360px] md:gap-8">
          <div>{formContent}</div>
          <div>{recapCard}</div>
        </div>
      </div>

      {/* Bottom nav mobile */}
      <BottomNav />
    </div>
  )
}
