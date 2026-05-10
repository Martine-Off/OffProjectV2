import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import NewInvitation from './pages/NewInvitation'
import Confirmation from './pages/Confirmation'
import Dashboard from './pages/Dashboard'
import Scanner from './pages/Scanner'
import NotFound from './pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'nouvelle-invitation', element: <NewInvitation /> },
      { path: 'confirmation', element: <Confirmation /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'scanner', element: <Scanner /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
