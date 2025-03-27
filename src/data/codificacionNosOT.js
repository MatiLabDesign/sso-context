const fechaActual = new Date();
const año = fechaActual.getFullYear();
const mes = String(fechaActual.getMonth() + 1).padStart(2, "0"); // Asegura que el mes tenga dos dígitos

const pcpNumero = `PCP-DH-${año}-${mes}000001`;
const uclNumero = `RRL-UCL-${año}-${mes}000001`;
const bmNumero = `RRL-SRP-${año}-${mes}`;
const genericoNumero = `TRL-OTH-${año}-${mes}`;

console.log(pcpNumero, uclNumero, bmNumero, genericoNumero);

export default pcpNumero;

// pcpNumero = PCP-DH-2025-03-000001;
// pcpNumero = PCP-DH-2025-04-000002;
// uclNumero = RRL-UCL-2025-03-000001;
// uclNumero = RRL-UCL-2025-04-000002;
// bmNumero = RRL-SRP-2025-03-000001;
// genericoNumero = TRL-OTH-2025-05-0000001;