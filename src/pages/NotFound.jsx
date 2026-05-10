import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="min-h-full flex flex-col items-center justify-center gap-4 p-6">
      <p className="text-gray-500">Page introuvable</p>
      <button
        onClick={() => navigate('/')}
        className="text-sm text-blue-600 underline"
      >
        Retour à l'accueil
      </button>
    </div>
  )
}
