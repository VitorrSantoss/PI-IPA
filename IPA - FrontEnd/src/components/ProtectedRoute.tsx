import { Navigate } from "react-router-dom";
import authService from "@/services/authService";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isAuth = authService.isAuthenticated();
  return isAuth ? children : <Navigate to="/login" replace />;
}
