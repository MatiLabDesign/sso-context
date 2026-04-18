import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import "./viewStyle.css";
import Header from "./Header";

const Private = () => {
  return (
    <div className="container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        {/* <Header /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default Private;
