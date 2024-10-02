import React, { useState } from "react";
import "./Etapas.css";
import { Link, Outlet } from "react-router-dom";
import { ENSAYO, INGRESO, INSPECCION, RECEPCION, SALIDA } from "../../../config/routes/paths";
import Renderizador from "../../renderizador/Renderizador";

const Etapas = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const handleComponentRender = (etapaAcual) => {
    switch (etapaAcual) {
      case "1":
        setSelectedComponent("Component1");
        break;
      case "2":
        setSelectedComponent("Component2");
        break;
      case "3":
        setSelectedComponent("Component3");
        break;
      case "4":
        setSelectedComponent("Component4");
        break;
      case "5":
        setSelectedComponent("Component5");
        break;
      default:
        setSelectedComponent(null);
    }
  };
  
  
  return (
    <div className="etapas-container">
      <nav className="nav-container">

    <Link to={INGRESO}>
      <div className="round-button">
        <span className="etapa-name">I</span>
      </div>
    </Link>
    <Link to={RECEPCION}>
      <div className="round-button">
        <span className="etapa-name">R</span>
      </div>
    </Link>
    <Link to={INSPECCION}>
      <div className="round-button">
        <span className="etapa-name">I</span>
      </div>
    </Link>
    <Link to={ENSAYO}>
      <div className="round-button">
        <span className="etapa-name">E</span>
      </div>
    </Link>
    <Link to={SALIDA}>
      <div className="round-button">
        <span className="etapa-name">S</span>
      </div>
    </Link>
      
      </nav>

      <div className="etapas-forms">
      <Renderizador selectedComponent={selectedComponent}/>
      
        {/* <Outlet /> */}
      </div>
    </div>
  );
};

export default Etapas;
