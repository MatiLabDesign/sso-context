import { useForm } from "react-hook-form";
import "../PcpEnsayo.css";
import { useNavigate } from "react-router-dom";
import useOrdenData from "../../../../../hooks/useOrdenData";
import useEnsayoData from "../../../../../hooks/useEnsayoData";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { ENSAYO_A_ITEMS } from "../../../../../constants/ENSAYO_ITEMS";
import ensayoVH60 from "./../../../../../data/ensayoPCPVH60";

const PcpEnsayoVH60A = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
  } = useForm({
    defaultValues: ensayoVH60,
  });

  const ordenId = localStorage.getItem("ordenId");
  const ensayoId = localStorage.getItem("ensayoVh60Id");

  const navigate = useNavigate();
  const { otActual, updateOt } = useOrdenData(ordenId);
  const { updateEnsayoVh60 } = useEnsayoData(ensayoId, reset);

  const etapaSiguiente = 7;

  // función genérica para calcular torque
  const calcularTorque = (rpm) => {
    const Uout = Number(watch(`rpm${rpm}VoltajeSalida`)) || 0;
    const Iout = Number(watch(`rpm${rpm}CorrienteSalida`)) || 0;
    return Number(((7 * Uout * Iout) / rpm).toFixed(2));
  };

  // Normalizador de payload
  const buildPayload = (data) => {
    return {
      id: ensayoId ? Number(ensayoId) : 0,
      imagenesVh60: data.imagenesVh60 ?? [],

      // RPM 100
      rpm100CurrentF: Number(data.rpm100CurrentF) || 0,
      rpm100VoltajeSalida: Number(data.rpm100VoltajeSalida) || 0,
      rpm100CorrienteSalida: Number(data.rpm100CorrienteSalida) || 0,
      rpm100PosicionSalida1: Number(data.rpm100PosicionSalida1) || 0,
      rpm100PosicionSalida2: Number(data.rpm100PosicionSalida2) || 0,
      rpm100TorqueFrenado: calcularTorque(100),
      rpm100TorqueFrenado1: Number(data.rpm100TorqueFrenado1) || 0,
      rpm100TorqueFrenado2: Number(data.rpm100TorqueFrenado2) || 0,
      rpm100TorqueFabricaReferencia: Number(data.rpm100TorqueFabricaReferencia) || 0,
      rpm100TorqueReferencia1: Number(data.rpm100TorqueReferencia1) || 0,
      rpm100TorqueReferencia2: Number(data.rpm100TorqueReferencia2) || 0,
      rpm100TemperaturaCarcazaC: Number(data.rpm100TemperaturaCarcazaC) || 0,

      // RPM 200
      rpm200CurrentF: Number(data.rpm200CurrentF) || 0,
      rpm200VoltajeSalida: Number(data.rpm200VoltajeSalida) || 0,
      rpm200CorrienteSalida: Number(data.rpm200CorrienteSalida) || 0,
      rpm200PosicionSalida1: Number(data.rpm200PosicionSalida1) || 0,
      rpm200PosicionSalida2: Number(data.rpm200PosicionSalida2) || 0,
      rpm200TorqueFrenado: calcularTorque(200),
      rpm200TorqueFrenado1: Number(data.rpm200TorqueFrenado1) || 0,
      rpm200TorqueFrenado2: Number(data.rpm200TorqueFrenado2) || 0,
      rpm200TorqueFabricaReferencia: Number(data.rpm200TorqueFabricaReferencia) || 0,
      rpm200TorqueReferencia1: Number(data.rpm200TorqueReferencia1) || 0,
      rpm200TorqueReferencia2: Number(data.rpm200TorqueReferencia2) || 0,
      rpm200TemperaturaCarcazaC: Number(data.rpm200TemperaturaCarcazaC) || 0,

      // RPM 300
      rpm300CurrentF: Number(data.rpm300CurrentF) || 0,
      rpm300VoltajeSalida: Number(data.rpm300VoltajeSalida) || 0,
      rpm300CorrienteSalida: Number(data.rpm300CorrienteSalida) || 0,
      rpm300PosicionSalida1: Number(data.rpm300PosicionSalida1) || 0,
      rpm300PosicionSalida2: Number(data.rpm300PosicionSalida2) || 0,
      rpm300TorqueFrenado: calcularTorque(300),
      rpm300TorqueFrenado1: Number(data.rpm300TorqueFrenado1) || 0,
      rpm300TorqueFrenado2: Number(data.rpm300TorqueFrenado2) || 0,
      rpm300TorqueFabricaReferencia: Number(data.rpm300TorqueFabricaReferencia) || 0,
      rpm300TorqueReferencia1: Number(data.rpm300TorqueReferencia1) || 0,
      rpm300TorqueReferencia2: Number(data.rpm300TorqueReferencia2) || 0,
      rpm300TemperaturaCarcazaC: Number(data.rpm300TemperaturaCarcazaC) || 0,

      // Checks
      cargaAxialOK: Boolean(data.cargaAxialOK),
      cargaAxialObservacion: data.cargaAxialObservacion ?? "",
      temperaturaOK: Boolean(data.temperaturaOK),
      temperaturaObservacion: data.temperaturaObservacion ?? "",
      nivelDeRuidoOK: Boolean(data.nivelDeRuidoOK),
      nivelDeRuidoObservacion: data.nivelDeRuidoObservacion ?? "",
      nivelDeVibracionOK: Boolean(data.nivelDeVibracionOK),
      nivelDeVibracionObservacion: data.nivelDeVibracionObservacion ?? "",
      fugaDeAceiteOK: Boolean(data.fugaDeAceiteOK),
      fugaDeAceiteObservacion: data.fugaDeAceiteObservacion ?? "",
      nivelDeAceiteOK: Boolean(data.nivelDeAceiteOK),
      nivelDeAceiteObservacion: data.nivelDeAceiteObservacion ?? "",
      pinturaOK: Boolean(data.pinturaOK),
      pinturaObservacion: data.pinturaObservacion ?? "",
    };
  };

  // Submit handler
  const onSubmit = async (data) => {
    try {
      const payload = buildPayload(data);
      console.log("Payload final enviado:", payload);

      if (ensayoId) {
        await updateEnsayoVh60(ensayoId, payload);
        console.log("Update ensayo VH60 OK", ensayoId);
      }

      const updatedOt = {
        ...otActual,
        etapaActual: etapaSiguiente,
      };
      await updateOt(ordenId, updatedOt);

      const modeloEquipo = otActual?.equipo?.tipoEquipo?.modelo;
      const tipoEquipo = otActual?.equipo?.tipoEquipo?.tipo;

      if (modeloEquipo && tipoEquipo) {
        navigate(`/dashboard/etapa/ensayo${tipoEquipo}${modeloEquipo}B`);
      }
    } catch (error) {
      console.error("Error al procesar el ensayo:", error);
    }
  };

  return (
    <form className="recepcion-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form-title">Ensayo PCP VH60 A</h3>

      {/* comentario + botones */}
      <div className="form-group">
        <div className="label-input">
          <label className="form-label">Comentario</label>
          <input {...register("comentario")} placeholder="Comentario" />
        </div>

        <button type="button" className="form-button-2" onClick={() => navigate(`/dashboard/etapa/inspeccionPCPVh60C`)}>
          <FaArrowLeft />
        </button>
        <button type="button" className="form-button-2" onClick={() => navigate(`/dashboard/etapa/ensayoPCPVh60B`)}>
          <FaArrowRight />
        </button>
        <button type="submit" className="form-button">
          Guardar
        </button>
      </div>

      {/* tabla ensayo */}
      <table className="ensayoTable">
        <thead>
          <tr>
            <th>RPM</th>
            <th>Current F</th>
            <th>Iout</th>
            <th>Uout</th>
            <th>Pos 1</th>
            <th>Pos 2</th>
            <th>Torque</th>
            <th>Ref 1</th>
            <th>Ref 2</th>
            <th>T°</th>
          </tr>
        </thead>
        <tbody>
          {ENSAYO_A_ITEMS.map((item) => (
            <tr key={item.rpm}>
              <td><strong>{item.rpm}</strong></td>
              <td><input className="inputEnsayo" defaultValue={item.currentF} readOnly /></td>
              <td><input className="inputEnsayo" {...register(`rpm${item.rpm}CorrienteSalida`)} type="number" step="0.01" /></td>
              <td><input className="inputEnsayo" {...register(`rpm${item.rpm}VoltajeSalida`)} type="number" step="0.01" /></td>
              <td><input className="inputEnsayo" {...register(`rpm${item.rpm}PosicionSalida1`)} type="number" /></td>
              <td><input className="inputEnsayo" {...register(`rpm${item.rpm}PosicionSalida2`)} type="number" /></td>
              <td><input className="inputEnsayo" value={calcularTorque(item.rpm)} readOnly /></td>
              <td><input className="inputEnsayo" defaultValue={item.torqueRef1} readOnly /></td>
              <td><input className="inputEnsayo" defaultValue={item.torqueRef2} readOnly /></td>
              <td><input className="inputEnsayo" {...register(`rpm${item.rpm}TemperaturaCarcazaC`)} type="number" /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <span>Calculo torque de frenado = 7 × Uout × Iout / RPM</span>
    </form>
  );
};

export default PcpEnsayoVH60A;

