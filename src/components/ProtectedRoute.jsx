import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { hasAcceptedConsent } from '../lib/consentStore'

export default function ProtectedRoute({ children, requireConsent = true }) {
  const { user, loading } = useAuth()

  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (requireConsent && !hasAcceptedConsent(user.id)) {
    return <Navigate to="/consent" replace />
  }

  return children
}
