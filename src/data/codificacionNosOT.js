const fechaActual = new Date();
const año = fechaActual.getFullYear();
const mes = String(fechaActual.getMonth() + 1).padStart(2, "0"); // Asegura que el mes tenga dos dígitos

const pcpNumero = `PCP-DH-${año}-${mes}`;
const uclNumero = `RRL-UCL-${año}-${mes}`;
const bmNumero = `RRL-SRP-${año}-${mes}`;
const genericoNumero = `TRL-OTH-${año}-${mes}`;

console.log(pcpNumero, uclNumero, bmNumero, genericoNumero);

export default pcpNumero;