import React from "react";
import ClienteList from "../components/lists/ClienteList";

const Client = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* estilo en linea a arreglar */}
      <h2>Listado de Clientes</h2>
      <ClienteList />
    </div>
  );
};

export default Client;
