import { Routes } from "react-router-dom";
import { PublicRoutesComponent } from "./PublicRoutesComponent";
import { PrivateRoutesComponent } from "./PrivateRoutesComponent";

const DashboardRoutes = () => {
  return (
    <Routes>
      {PublicRoutesComponent()}
      {PrivateRoutesComponent()}
    </Routes>
  );
};

export default DashboardRoutes;

