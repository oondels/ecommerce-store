import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface GuestOnlyRouteProps {
  children: JSX.Element;
}

/**
 * A route wrapper that redirects authenticated users away from guest-only pages
 * such as login and register pages
 */
export const GuestOnlyRoute = ({ children }: GuestOnlyRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
