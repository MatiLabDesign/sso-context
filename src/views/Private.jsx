import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
// import './Private.css';

const Private = () => {
  return (
    <div className="container">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Private;
