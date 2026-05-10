import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/* ── icônes ── */

function BackIcon() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
}

function QRFrameIcon() {
  return (
    <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2m8-16h2a2 2 0 012 2v2m0 8v2a2 2 0 01-2 2h-2" />
      <rect x="7" y="7" width="4" height="4" rx="0.5" />
      <rect x="13" y="7" width="4" height="4" rx="0.5" />
      <rect x="7" y="13" width="4" height="4" rx="0.5" />
      <path strokeLinecap="round" d="M13 13h1m0 0h1m0 0v1m0 0v1m0 0h1m0 0h1" />
    </svg>
  )
}

function CheckIcon() {
  return <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
}

function XIcon() {
  return <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
}

function SpinnerIcon() {
  return <svg className="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
}

/* ── QR placeholder ── */

function QRPlaceholder({ code, size = 96 }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="rounded-xl border-2 border-gray-200 overflow-hidden grid bg-white"
        style={{ width: size, height: size, gridTemplateColumns: 'repeat(7,1fr)', gap: 1.5, padding: 8 }}
        aria-label="QR code"
      >
        {Array.from({ length: 49 }).map((_, i) => {
          const corners = [0, 1, 2, 6, 7, 8, 13, 14, 40, 41, 42, 46, 47, 48, 35, 36]
          const filled = corners.includes(i) || (i * 7 + i * 3) % 5 === 0
          return (
            <div key={i} className="rounded-[1px]"
              style={{ backgroundColor: filled ? '#1A1A2E' : 'transparent', aspectRatio: '1' }} />
          )
        })}
      </div>
      <span className="font-mono text-xs font-semibold px-3 py-1.5 rounded-lg"
        style={{ backgroundColor: '#EBF4FF', color: '#2D7DD2' }}>
        {code}
      </span>
    </div>
  )
}

/* ── états ── */

function StateInitial({ code, setCode, onSubmit, loading }) {
  return (
    <div className="flex flex-col items-center gap-6 px-6 py-10">
      {/* Cadre pointillé */}
      <div className="w-full max-w-xs aspect-square rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-4"
        style={{ backgroundColor: '#F8FAFC' }}>
        <QRFrameIcon />
        <p className="text-sm text-gray-400 text-center px-6 leading-snug">
          Pointez la caméra vers le QR code du billet
        </p>
      </div>

      <p className="text-sm text-gray-400">— ou —</p>

      {/* Saisie manuelle */}
      <div className="w-full max-w-xs flex flex-col gap-3">
        <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Entrez le code QR manuellement
        </label>
        <input
          type="text"
          value={code}
          onChange={e => setCode(e.target.value.toUpperCase())}
          placeholder="OFF-2026-HHHJGN-01"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm font-mono focus:outline-none focus:ring-2 placeholder-gray-300 text-center tracking-wider"
          style={{ color: '#1A1A2E', '--tw-ring-color': '#2D7DD2' }}
          onKeyDown={e => e.key === 'Enter' && !loading && code.trim() && onSubmit()}
        />
        <button
          onClick={onSubmit}
          disabled={loading || !code.trim()}
          className="w-full py-3.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 transition-opacity disabled:opacity-50"
          style={{ backgroundColor: '#2D7DD2' }}
        >
          {loading ? <><SpinnerIcon /> Validation…</> : 'Valider'}
        </button>
      </div>
    </div>
  )
}

function StateAutorise({ code, onReset }) {
  const now = new Date()
  const timeStr = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: '#E8F5E9' }}>
      {/* Bannière */}
      <div className="w-full px-4 py-3 flex items-center justify-center gap-2 text-white text-sm font-medium"
        style={{ backgroundColor: '#2ECC71' }}>
        <span>✓</span>
        <span>Notification Slack envoyée à la compagnie</span>
      </div>

      <div className="flex flex-col items-center gap-5 px-6 py-8">
        {/* Cercle */}
        <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg"
          style={{ backgroundColor: '#2ECC71' }}>
          <CheckIcon />
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold" style={{ color: '#1B5E20' }}>Accès Autorisé</h2>
          <p className="text-sm mt-1" style={{ color: '#388E3C' }}>Billet validé avec succès</p>
        </div>

        {/* Carte info */}
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4">
          <div>
            <p className="font-bold text-base" style={{ color: '#1A1A2E' }}>Paul TEST</p>
            <p className="text-sm text-gray-500 mt-0.5">L'Humanité — Journaliste</p>
            <p className="text-xs text-gray-400 mt-1">Ballet : Le Lac des Cygnes • 20:00 • Salle D</p>
          </div>

          <hr className="border-gray-100" />

          <QRPlaceholder code={code || 'OFF-2026-HHHJGN-01'} size={100} />

          <div className="flex items-center justify-between">
            <span className="text-xs font-bold px-3 py-1.5 rounded-full"
              style={{ backgroundColor: '#D5F5E3', color: '#27AE60' }}>
              INVITATION GRATUITE
            </span>
            <span className="text-xs text-gray-400">Place 1 sur 1</span>
          </div>

          <div className="rounded-xl px-4 py-2.5 text-center text-xs font-semibold tracking-wide"
            style={{ backgroundColor: '#F5F7FA', color: '#6B7280' }}>
            SCANNÉ À {timeStr} • ENTRÉE EST
          </div>
        </div>

        {/* Bouton */}
        <button
          onClick={onReset}
          className="w-full max-w-sm py-4 rounded-2xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#1A1A2E' }}
        >
          Scanner le suivant
        </button>
      </div>
    </div>
  )
}

function StateRefuse({ code, onReset }) {
  const now = new Date()
  const timeStr = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: '#FFEBEE' }}>
      {/* Bannière */}
      <div className="w-full px-4 py-3 flex items-center justify-center gap-2 text-white text-sm font-medium"
        style={{ backgroundColor: '#E74C3C' }}>
        <span>⚠</span>
        <span>Contacter la compagnie si problème</span>
      </div>

      <div className="flex flex-col items-center gap-5 px-6 py-8">
        {/* Cercle */}
        <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg"
          style={{ backgroundColor: '#E74C3C' }}>
          <XIcon />
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold" style={{ color: '#B71C1C' }}>Accès Refusé</h2>
          <p className="text-sm mt-1" style={{ color: '#C0392B' }}>Ce billet a déjà été utilisé</p>
        </div>

        {/* Carte info */}
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4">
          <QRPlaceholder code={code || 'OFF-2026-HHHJGN-01'} size={100} />

          <div className="rounded-xl px-4 py-2.5 text-center text-xs font-semibold"
            style={{ backgroundColor: '#FFF9F9', color: '#9CA3AF' }}>
            Dernier scan — Aujourd'hui, {timeStr}
          </div>

          <div className="flex justify-center">
            <span className="text-xs font-bold px-4 py-2 rounded-full"
              style={{ backgroundColor: '#FFEBEE', color: '#E74C3C' }}>
              Entrée non autorisée
            </span>
          </div>
        </div>

        {/* Bouton outline */}
        <button
          onClick={onReset}
          className="w-full max-w-sm py-4 rounded-2xl font-semibold text-sm border-2 transition-colors hover:bg-red-50"
          style={{ color: '#E74C3C', borderColor: '#E74C3C', backgroundColor: 'transparent' }}
        >
          Retour au scanner
        </button>
      </div>
    </div>
  )
}

/* ── page principale ── */

export default function Scanner() {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [etat, setEtat] = useState('initial') // 'initial' | 'autorise' | 'refuse'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleValider() {
    if (!code.trim()) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(import.meta.env.VITE_N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrCode: code.trim() }),
      })
      if (res.ok) {
        setEtat('autorise')
      } else {
        setEtat('refuse')
      }
    } catch {
      setEtat('refuse')
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setCode('')
    setEtat('initial')
    setError(null)
  }

  const isResultState = etat === 'autorise' || etat === 'refuse'

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: etat === 'autorise' ? '#E8F5E9' : etat === 'refuse' ? '#FFEBEE' : '#F5F7FA' }}>

      {/* Header — masqué sur les états résultat (la bannière les remplace) */}
      {!isResultState && (
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="max-w-lg mx-auto flex items-center justify-between px-4 h-14">
            <button onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors">
              <BackIcon />
            </button>
            <h1 className="text-base font-semibold absolute left-1/2 -translate-x-1/2"
              style={{ color: '#1A1A2E' }}>
              Validation Billet
            </h1>
            <span className="w-9" /> {/* équilibre */}
          </div>
        </header>
      )}

      {/* Header sur les états résultat */}
      {isResultState && (
        <div className="sticky top-0 z-40 bg-transparent px-4 pt-3 pb-1">
          <button onClick={handleReset}
            className="flex items-center gap-1.5 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
            style={{ color: etat === 'autorise' ? '#1B5E20' : '#B71C1C' }}>
            <BackIcon />
            Scanner
          </button>
        </div>
      )}

      {/* Contenu centré desktop */}
      <div className="flex-1 flex flex-col md:items-center md:justify-start md:py-8">
        <div className="w-full md:max-w-[600px]">
          {etat === 'initial' && (
            <StateInitial code={code} setCode={setCode} onSubmit={handleValider} loading={loading} />
          )}
          {etat === 'autorise' && (
            <StateAutorise code={code} onReset={handleReset} />
          )}
          {etat === 'refuse' && (
            <StateRefuse code={code} onReset={handleReset} />
          )}
        </div>
      </div>

    </div>
  )
}
