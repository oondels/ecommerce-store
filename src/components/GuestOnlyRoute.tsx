import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface GuestOnlyRouteProps {
  children: JSX.Element;
}

/**
 * A route wrapper that redirects authenticated users away from guest-only pages
 * such as login and register pages
 */
export const GuestOnlyRoute = ({ children }: GuestOnlyRouteProps) => {
  const { user } = useAuth();
  
  // If user is already logged in, redirect to home page
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
