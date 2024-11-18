import React from "react";
import ClienteList from "../components/lists/ClienteList";
// import ClienteList2 from "../components/lists/ClienteList2";

const Client = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* estilo en linea a arreglar */}
      <h2>Listado de Clientes</h2>
      <ClienteList/>
      {/* <ClienteList2 /> */}
    </div>
  );
};

export default Client;
