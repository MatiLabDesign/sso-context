import React, { useState, useContext } from "react";
import "./Etapas.css";
import { Link, Outlet } from "react-router-dom";
import { ENSAYOPCP, INGRESOPCP, INSPECCIONPCP, RECEPCIONPCP, SALIDAPCP } from "../../../config/routes/paths";

import { selectedContext } from "../../lists/OtList";


const Etapas = () => {
  //  const selectedComponent = useContext(selectedContext.selectedComponent);
  // const handleComponentRender = (etapaAcual) => {
  //   switch (etapaAcual) {
  //     case "1":
  //       setSelectedComponent("Component1");
  //       break;
  //     case "2":
  //       setSelectedComponent("Component2");
  //       break;
  //     case "3":
  //       setSelectedComponent("Component3");
  //       break;
  //     case "4":
  //       setSelectedComponent("Component4");
  //       break;
  //     case "5":
  //       setSelectedComponent("Component5");
  //       break;
  //     default:
  //       setSelectedComponent(null);
  //   }
  // };
  
  
  return (
    <div className="etapas-container">
      <nav className="nav-container">

    <Link to={INGRESOPCP}>
      <div className="round-button">
        <span className="etapa-name">I</span>
      </div>
    </Link>
    
      <div className="round-button">
        <span className="etapa-name">R</span>
      </div>
    
      <div className="round-button">
        <span className="etapa-name">I</span>
      </div>
    
      <div className="round-button">
        <span className="etapa-name">E</span>
      </div>
    
      <div className="round-button">
        <span className="etapa-name">S</span>
      </div>
    
      
      </nav>

      <div className="etapas-forms">
      {/* <Renderizador selectedComponent={selectedComponent}/> */}
      
        <Outlet />
      </div>
    </div>
  );
};

export default Etapas;
