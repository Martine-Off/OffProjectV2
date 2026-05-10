import { useLocation, useNavigate } from 'react-router-dom'

export default function Confirmation() {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state) {
    navigate('/', { replace: true })
    return null
  }

  const { spectacle, professionnel, structure, email, placesGratuites, placesPayantes, total } = state

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-sm flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
          style={{ backgroundColor: '#EBF4FF' }}>
          ✓
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold" style={{ color: '#1A1A2E' }}>Invitation soumise !</h1>
          <p className="text-sm text-gray-500 mt-1">Elle est en cours de traitement.</p>
        </div>

        <div className="w-full rounded-xl p-4 text-sm" style={{ backgroundColor: '#EBF4FF' }}>
          <p className="font-semibold" style={{ color: '#1A1A2E' }}>{spectacle?.nom}</p>
          <p style={{ color: '#2D7DD2' }}>{spectacle?.date} • {spectacle?.salle}</p>
        </div>

        <div className="w-full text-sm flex flex-col gap-2" style={{ color: '#1A1A2E' }}>
          {professionnel && <div className="flex justify-between"><span className="text-gray-500">Invité</span><span className="font-medium">{professionnel}</span></div>}
          {structure && <div className="flex justify-between"><span className="text-gray-500">Structure</span><span className="font-medium">{structure}</span></div>}
          <hr className="border-gray-200" />
          <div className="flex justify-between"><span className="text-gray-500">Places gratuites</span><span>{placesGratuites}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Places payantes</span><span>{placesPayantes}</span></div>
          <div className="flex justify-between font-bold"><span>Total</span><span>{total} place{total > 1 ? 's' : ''}</span></div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full py-4 rounded-2xl text-white font-semibold text-sm"
          style={{ backgroundColor: '#1A1A2E' }}
        >
          Retour à l'accueil
        </button>
        <button
          onClick={() => navigate('/nouvelle-invitation')}
          className="text-sm font-medium"
          style={{ color: '#2D7DD2' }}
        >
          Ajouter un autre invité +
        </button>
      </div>
    </div>
  )
}
