import { useNavigate } from 'react-router-dom'

function BottomNav() {
  const navigate = useNavigate()
  const items = [
    { label: 'Accueil',   icon: <HomeIcon />,         path: '/dashboard' },
    { label: 'Dashboard', icon: <DashboardIcon />,    path: '/dashboard' },
    { label: 'Scanner',   icon: <ScannerIcon />,      path: '/scanner' },
    { label: 'Profil',    icon: <ProfilIcon />,       path: '/profil', active: true },
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

export default function Profil() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0" style={{ backgroundColor: '#F5F7FA' }}>
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 h-14">
          <button onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="#1A1A2E" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-base font-semibold absolute left-1/2 -translate-x-1/2"
            style={{ color: '#1A1A2E' }}>
            Profil
          </h1>
          <span className="w-9" />
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-8">
        <p className="text-sm text-gray-400">Page Profil — à venir</p>
      </div>

      <BottomNav />
    </div>
  )
}
