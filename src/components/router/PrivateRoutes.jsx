import { useAuthContext } from "../../contexts/authContext";
import { Navigate, Outlet } from "react-router-dom";
import { LOGIN } from "../../config/routes/paths";

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to={LOGIN} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PrivateRoutes;
