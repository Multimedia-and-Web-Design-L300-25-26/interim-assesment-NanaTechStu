// src/components/common/ProtectedRoute.jsx
// Wraps routes that require authentication
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to sign-in, preserving the intended destination
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}
