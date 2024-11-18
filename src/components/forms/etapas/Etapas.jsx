import React, { useState, useContext, useEffect } from "react";
import "./Etapas.css";
import { Link, Outlet } from "react-router-dom";
import { ENSAYOPCP, INGRESOPCP, INSPECCIONPCP, RECEPCIONPCP, SALIDAPCP } from "../../../config/routes/paths";
import Renderizador from "../../renderizador/Renderizador"; // Importamos el renderizador
import CleanLocal from "../../renderizador/CleanLocal";
import TipoEquipo from './../../../views/TipoEquipo';




const Etapas = () => {
  //  const selectedComponent = window.localStorage.getItem('selectedComponent')
   const [selectedComponent, setSelectedComponent] = useState('');
   
  //  const [tipoEquipo, setTipoEquipo] = useState('');
  //  const [etapaActual, setEtapaActual] = useState('');
  //  const [numeroOT, setNumeroOT] = useState('');
   
   
   useEffect(() => {
    const tipoEquipo = window.localStorage.getItem("tipoEquipo");
    const etapaActual = window.localStorage.getItem("etapaActual");
    const numeroOT = window.localStorage.getItem("numeroOT");
    console.log(tipoEquipo)
    const selected = window.localStorage.setItem("selectedComponent", selectedComponent);
    
    if (tipoEquipo === "PCP") {
     switch (etapaActual) {
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
   } else if (tipoEquipo === "UCL") {
     switch (etapaActual) {
       case "1":
         setSelectedComponent("Component6");
         // navigate('/dashboard/etapa');
         break;
       case "2":
         setSelectedComponent("Component7");
         break;
       case "3":
         setSelectedComponent("Component8");
         break;
       case "4":
         setSelectedComponent("Component9");
         break;
       case "5":
         setSelectedComponent("Component10");
         break;
       default:
         setSelectedComponent(null);
     }
   } else if (tipoEquipo === "BM") {
     switch (etapaActual) {
       case "1":
         setSelectedComponent("Component11");
         break;
       case "2":
         setSelectedComponent("Component12");
         break;
       case "3":
         setSelectedComponent("Component13");
         break;
       case "4":
         setSelectedComponent("Component14");
         break;
       case "5":
         setSelectedComponent("Component15");
         break;
       default:
         setSelectedComponent(null);
     }
   } else {
     console.log("no anduvo");
   }
  }, []);

   
   
  
  return (
    
    <div className="etapas-container">
      <nav className="nav-container">

    <Link to={INGRESOPCP}>
      <div className="round-button">
        <span className="etapa-name">I</span>
      </div>
    </Link>
    
    <Link to={RECEPCIONPCP}>
      <div className="round-button">
        <span className="etapa-name">R</span>
      </div>
      </Link>

      <Link to={INSPECCIONPCP}>
    
      <div className="round-button">
        <span className="etapa-name">I</span>
      </div>
      </Link>
    

      <Link to={ENSAYOPCP}>
      <div className="round-button">
        <span className="etapa-name">E</span>
      </div>
      </Link>
    

      <Link to={SALIDAPCP}>
      <div className="round-button">
        <span className="etapa-name">S</span>
      </div>
      </Link>
    
      
      </nav>

      <div className="etapas-forms">
        
      {/* <Renderizador selectedComponent={selectedComponent}/> */}
      <CleanLocal/>
      
        <Outlet />
      </div>
    </div>
    
  );
};

export default Etapas;
