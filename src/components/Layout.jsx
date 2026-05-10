import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-full flex flex-col bg-white">
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  )
}
