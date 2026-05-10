import { useLocation, useNavigate } from 'react-router-dom'

const STATIC = {
  professionnel: 'Paul TEST',
  structure: "L'Humanité",
  placesGratuites: 2,
  placesPayantes: 1,
  spectacle: { nom: 'Ballet : Le Lac des Cygnes', date: 'Vendredi 18 Octobre - 20:00', salle: 'Salle D' },
  reservationId: 'RES-94210',
  qrCode: 'OFF-2026-HHHJGN',
}

function ClockIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" d="M12 6v6l4 2" />
    </svg>
  )
}
function PersonIcon() {
  return (
    <svg className="w-4 h-4 shrink-0 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" />
      <path strokeLinecap="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}
function BuildingIcon() {
  return (
    <svg className="w-4 h-4 shrink-0 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 14v3m4-3v3m4-3v3" />
    </svg>
  )
}
function TicketIcon() {
  return (
    <svg className="w-4 h-4 shrink-0 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
  )
}
function CalendarIcon() {
  return (
    <svg className="w-4 h-4 shrink-0 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}

function RecapRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <span className="mt-0.5">{icon}</span>
      <div className="flex-1 min-w-0">
        <span className="text-xs font-semibold tracking-wide text-gray-400 uppercase">{label}</span>
        <p className="text-sm font-medium mt-0.5" style={{ color: '#1A1A2E' }}>{value}</p>
      </div>
    </div>
  )
}

function QRPlaceholder({ code }) {
  return (
    <div className="flex flex-col items-center gap-3 pt-4">
      {/* QR placeholder — grille de carrés simulant un QR code */}
      <div
        className="w-32 h-32 rounded-xl border-2 border-gray-200 overflow-hidden grid"
        style={{ gridTemplateColumns: 'repeat(7,1fr)', gap: 2, padding: 8, backgroundColor: '#fff' }}
        aria-label="QR code"
      >
        {Array.from({ length: 49 }).map((_, i) => {
          // Coins fixes du QR + pattern pseudo-aléatoire déterministe
          const corners = [0,1,2,7,8,9,14,6,13,20,42,43,44,35,36,37,41,48,47,46]
          const filled = corners.includes(i) || (i * 7 + i * 3) % 5 === 0
          return (
            <div
              key={i}
              className="rounded-[1px]"
              style={{ backgroundColor: filled ? '#1A1A2E' : 'transparent', aspectRatio: '1' }}
            />
          )
        })}
      </div>
      <span
        className="font-mono text-xs font-semibold px-3 py-1.5 rounded-lg"
        style={{ backgroundColor: '#EBF4FF', color: '#2D7DD2' }}
      >
        {code}
      </span>
    </div>
  )
}

export default function Confirmation() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const data = state ?? STATIC
  const {
    professionnel = STATIC.professionnel,
    structure = STATIC.structure,
    placesGratuites = STATIC.placesGratuites,
    placesPayantes = STATIC.placesPayantes,
    spectacle = STATIC.spectacle,
  } = data

  const reservationId = data.record?.id ? `RES-${data.record.id.slice(-5).toUpperCase()}` : STATIC.reservationId
  const qrCode = data.record?.fields?.['Code QR'] ?? STATIC.qrCode

  const typePlaces = `${placesGratuites} place${placesGratuites > 1 ? 's' : ''} gratuite${placesGratuites > 1 ? 's' : ''} + ${placesPayantes} place${placesPayantes > 1 ? 's' : ''} payante${placesPayantes > 1 ? 's' : ''}`

  /* ── blocs réutilisables ── */

  const heroBanner = (
    <div
      className="w-full px-4 py-3 flex items-center justify-center gap-2 text-white text-sm font-medium"
      style={{ backgroundColor: '#2ECC71' }}
    >
      <span className="text-base">✓</span>
      <span>Notification Slack envoyée à la compagnie</span>
    </div>
  )

  const heroBlock = (
    <div className="flex flex-col items-center gap-3 text-center">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center text-4xl text-white font-bold shadow-lg"
        style={{ backgroundColor: '#2ECC71' }}
      >
        ✓
      </div>
      <h1 className="text-2xl font-bold" style={{ color: '#1A1A2E' }}>Transmission Réussie</h1>
      <p className="text-sm text-gray-500">Votre demande a été traitée avec succès</p>
      <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
        <ClockIcon />
        <span>Transmis à la billetterie • Il y a 2 min</span>
      </div>
    </div>
  )

  const recapCard = (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#1A1A2E' }}>
          Récapitulatif de la réservation #{reservationId}
        </p>
      </div>
      <div className="px-5 py-1">
        <RecapRow icon={<PersonIcon />} label="Professionnel" value={professionnel} />
        <RecapRow icon={<BuildingIcon />} label="Structure" value={structure} />
        <RecapRow icon={<TicketIcon />} label="Type" value={typePlaces} />
        <RecapRow icon={<CalendarIcon />} label="Date" value={spectacle?.date} />
      </div>
      <div className="px-5 pb-5">
        <QRPlaceholder code={qrCode} />
      </div>
    </div>
  )

  const actions = (
    <div className="flex flex-col items-center gap-3 w-full">
      <button
        onClick={() => navigate('/')}
        className="w-full py-4 rounded-2xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#1A1A2E' }}
      >
        Retour à la liste
      </button>
      <button
        onClick={() => navigate('/nouvelle-invitation')}
        className="text-sm font-medium transition-colors hover:underline"
        style={{ color: '#2D7DD2' }}
      >
        Créer une autre invitation
      </button>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F5F7FA' }}>
      {/* Bannière */}
      {heroBanner}

      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-5 px-4 py-8">
        {heroBlock}
        {recapCard}
        {actions}
      </div>

      {/* Desktop */}
      <div className="hidden md:flex flex-1 flex-col items-center px-8 py-10 gap-8">
        <div className="w-full max-w-4xl grid grid-cols-2 gap-8 items-start">
          {/* Gauche */}
          <div className="flex flex-col gap-6 pt-4">
            {heroBlock}
          </div>
          {/* Droite */}
          <div className="flex flex-col gap-4">
            {recapCard}
          </div>
        </div>
        {/* Boutons alignés à droite */}
        <div className="w-full max-w-4xl flex justify-end">
          <div className="flex flex-col items-end gap-3 w-72">
            {actions}
          </div>
        </div>
      </div>
    </div>
  )
}
