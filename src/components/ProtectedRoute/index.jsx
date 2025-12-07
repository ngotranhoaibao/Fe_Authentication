import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "@/contexts/authContext";

const ProtectedRoute = ({ children, role }) => {
  const { userInfo } = useContext(AuthContext);
  const location = useLocation();

const accessToken = localStorage.getItem("accessToken");
const isAuthenticated = !!accessToken && !!userInfo?.user;

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }
  const currentRole = userInfo?.user?.role ?? null;

  if (role) {
    const allowed = Array.isArray(role) ? role : String(role).split(/\s+/);
    if (!allowed.includes(currentRole)) {
      return <Navigate to="/" replace />;
    }
  }
  return children;
};

export default ProtectedRoute;
