import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

const Private = () => {
  return (
    <>
    <Sidebar/>
    
      <Outlet/>
      {/* No renderiza el outlet del sidebar */}
    
    </>
  
);
};

  export default Private;
