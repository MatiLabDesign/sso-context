// routes/PublicRoutes.js
import { Route } from "react-router-dom";
import { LOGIN } from "../config/routes/paths";
import PublicRoutes from "../components/router/PublicRoutes";
import Home from "../views/Home";
import Login from "../views/Login";

export const PublicRoutesComponent = () => {
  return (
      <Route path="/" element={<PublicRoutes />}>
        <Route index element={<Home />} />
        <Route path={LOGIN} element={<Login />} />
      </Route>
    
  );
};

