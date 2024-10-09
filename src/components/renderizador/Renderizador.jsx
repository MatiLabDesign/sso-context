// Componente Secundario
// import PcpIngreso from './../forms/etapas/PCPForm/PcpIngreso';
// import PcpRecepcion from './../forms/etapas/PCPForm/PcpRecepcion';
// import PcpInspeccion from './../forms/etapas/PCPForm/PcpInspeccion';
// import PcpEnsayo from './../forms/etapas/PCPForm/PcpEnsayo';
// import PcpSalida from './../forms/etapas/PCPForm/PcpSalida';

// const Renderizador = ({ selectedComponent }) => {
//     return (
//       <div>
//         {selectedComponent === "Component1" && <PcpIngreso/>}
//         {selectedComponent === "Component2" && <PcpRecepcion/>}
//         {selectedComponent === "Component3" && <PcpInspeccion/>}
//         {selectedComponent === "Component4" && <PcpEnsayo/>}
//         {selectedComponent === "Component5" && <PcpSalida/>}
//       </div>
//     );
//   };

//   export default Renderizador
// import React from 'react'

// const Renderizador = ({ selectedComponent }) => {
//   return (
//     <div>
//          {selectedComponent === "Component1" && <PcpIngreso/>}
//          {selectedComponent === "Component2" && <PcpRecepcion/>}
//          {selectedComponent === "Component3" && <PcpInspeccion/>}
//          {selectedComponent === "Component4" && <PcpEnsayo/>}
//          {selectedComponent === "Component5" && <PcpSalida/>}
//        </div>
//   )
// }

// export default Renderizador

import React from "react";
import PcpIngreso from './../forms/etapas/PCPForm/PcpIngreso';
import PcpRecepcion from './../forms/etapas/PCPForm/PcpRecepcion';
import PcpInspeccion from './../forms/etapas/PCPForm/PcpInspeccion';
import PcpEnsayo from './../forms/etapas/PCPForm/PcpEnsayo';
import PcpSalida from './../forms/etapas/PCPForm/PcpSalida';
import UclIngreso from './../forms/etapas/UCLForm/UclIngreso';
import UclRecepcion from './../forms/etapas/UCLForm/UclRecepcion';
import UclInspeccion from './../forms/etapas/UCLForm/UclInspeccion';
import UclEnsayo from './../forms/etapas/UCLForm/UclEnsayo';
import UclSalida from './../forms/etapas/UCLForm/UclSalida';
import BombaIngreso from './../forms/etapas/BombaForm/BombaIngreso';
import BombaRecepcion from './../forms/etapas/BombaForm/BombaRecepcion';
import BombaInspeccion from './../forms/etapas/BombaForm/BombaInspeccion';
import BombaEnsayo from './../forms/etapas/BombaForm/BombaEnsayo';
import BombaSalida from './../forms/etapas/BombaForm/BombaSalida';

const Renderizador = ({ selectedComponent }) => {
  // console.log(selectedComponent);
  switch (selectedComponent) {
    case "Component1":
      return <PcpIngreso />;
    case "Component2":
      return <PcpRecepcion />;
    case "Component3":
      return <PcpInspeccion />;
    case "Component4":
      return <PcpEnsayo />;
    case "Component5":
      return <PcpSalida />;
    case "Component6":
      return <UclIngreso/>;
    case "Component7":
      return <UclRecepcion />;
    case "Component8":
      return <UclInspeccion />;
    case "Component9":
      return <UclEnsayo />;
    case "Component10":
      return <UclSalida />;
    case "Component11":
      return <BombaIngreso/>;
    case "Component12":
      return <BombaRecepcion />;
    case "Component13":
      return <BombaInspeccion />;
    case "Component14":
      return <BombaEnsayo />;
    case "Component15":
      return <BombaSalida />;
    default:
      return <div><h3>Selecciona una OT</h3></div>;
  }
};

export default Renderizador;

