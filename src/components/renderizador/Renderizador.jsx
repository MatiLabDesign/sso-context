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

const Renderizador = ({ selectedComponent }) => {
  console.log(selectedComponent);
  switch (selectedComponent) {
    case "Component1":
      return <PcpIngreso/>;
    case "Component2":
      return <PcpRecepcion />;
    case "Component3":
      return <PcpInspeccion />;
    case "Component4":
      return <PcpEnsayo />;
    case "Component5":
      return <PcpSalida />;
    default:
      return <div>Selecciona una etapa para continuar.</div>;
  }
};

export default Renderizador;

