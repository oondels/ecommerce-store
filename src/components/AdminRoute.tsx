import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface AdminRouteProps {
  children: JSX.Element;
  requiredRole?: 'admin';
}

export const AdminRoute = ({ children, requiredRole }: AdminRouteProps) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (requiredRole && user?.role !== requiredRole) return <Navigate to="/unauthorized" replace />;

  return children;
};
