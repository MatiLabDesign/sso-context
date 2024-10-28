import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import './viewStyle.css';


const Private = () => {
  return (
    <div className="container">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Private;
