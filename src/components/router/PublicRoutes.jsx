import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { PRIVATE } from "../../config/routes/paths";
import { useAuthContext } from "../../contexts/authContext";

const PublicRoutes = () => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to={PRIVATE} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PublicRoutes;
