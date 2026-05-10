import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import NewInvitation from './pages/NewInvitation'
import Confirmation from './pages/Confirmation'
import Dashboard from './pages/Dashboard'
import Scanner from './pages/Scanner'
import Profil from './pages/Profil'
import NotFound from './pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'nouvelle-invitation', element: <NewInvitation /> },
      { path: 'confirmation', element: <Confirmation /> },
      { path: 'scanner', element: <Scanner /> },
      { path: 'profil', element: <Profil /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
