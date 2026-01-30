import { useForm } from "react-hook-form";
import { useEffect } from "react";
import "../PcpEnsayo.css";
import { useNavigate } from "react-router-dom";
import useOrdenData from "../../../../../hooks/useOrdenData";
import useEnsayoData from "../../../../../hooks/useEnsayoData";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { ENSAYO_DV1_A_ITEMS } from "../../../../../constants/ENSAYO_ITEMS";
import Swal from "sweetalert2";
import ensayoDv1 from './../../../../../data/ensayoPCPDv1';

const PcpEnsayoDv1A = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
  } = useForm({
    defaultValues: ensayoDv1,
  });

  const ordenId = localStorage.getItem("ordenId");
  const ensayoId = localStorage.getItem("ensayoId");
  const tipoEquipo = localStorage.getItem("tipoEquipo");
  const modeloEquipo = localStorage.getItem("modeloEquipo");

  const navigate = useNavigate();
  const { otActual, updateOt } = useOrdenData(ordenId);
  const { updateEnsayoDv1 } = useEnsayoData(ensayoId);

  const etapaSiguiente = 7;

useEffect(() => {
  if (otActual?.ensayoDv1) {
    reset({
      ...ensayoDv1,
      ...otActual.ensayoDv1,

      // 🔒 FORZADOS DESDE DEFAULT (valores ≠ 0.0)
      presion10CurrentF: ensayoDv1.presion10CurrentF,
      presion10TorqueFabricaReferencia: ensayoDv1.presion10TorqueFabricaReferencia,

      presion20CurrentF: ensayoDv1.presion20CurrentF,
      presion20TorqueFabricaReferencia: ensayoDv1.presion20TorqueFabricaReferencia,

      presion70CurrentF: ensayoDv1.presion70CurrentF,
      presion70TorqueFabricaReferencia: ensayoDv1.presion70TorqueFabricaReferencia,

      presion100CurrentF: ensayoDv1.presion100CurrentF,
      presion100TorqueFabricaReferencia: ensayoDv1.presion100TorqueFabricaReferencia,
    });
  }
}, [otActual, reset]);




  /* ================================
     ⚙️ CÁLCULO DE TORQUE (VISUAL)
  ================================= */
  const calcularTorque = (presion) => {
    const Uout = Number(watch(`presion${presion}VoltajeSalida`)) || 0;
    const Iout = Number(watch(`presion${presion}CorrienteSalida`)) || 0;
    return Number(((7 * Uout * Iout) / 100).toFixed(2));
  };

  /* ================================
     💾 SUBMIT
  ================================= */
 const onSubmit = async (data) => {
  try {

    
    // 🔹 Confirmación antes de guardar
    const result = await Swal.fire({
      title: "¿Guardar cambios?",
      text: "Los cambios realizados se guardarán en el ensayo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#059080",
      cancelButtonColor: "#f09898",
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    console.log("Ensayo enviado:", data);

    // 🔹 Actualizar ensayo
    if (ensayoId) {
      await updateEnsayoDv1(ensayoId, {
        ...data,
        id: Number(ensayoId),
      });
    }

    // 🔹 Actualizar etapa de la OT
    await updateOt(ordenId, {
      ...otActual,
      etapaActual: etapaSiguiente,
    });

    // 🔹 Mensaje de éxito
    // await Swal.fire({
    //   title: "Guardado",
    //   text: "El ensayo se guardó correctamente",
    //   icon: "success",
    //   confirmButtonColor: "#059080",
    // });

    // 🔹 Navegación
    const modeloEquipo = otActual?.equipo?.tipoEquipo?.modelo;
    const tipoEquipo = otActual?.equipo?.tipoEquipo?.tipo;

    if (modeloEquipo && tipoEquipo) {
      navigate(`/dashboard/etapa/ensayo${tipoEquipo}${modeloEquipo}B`);
    }

  } catch (error) {
    console.error("❌ Error al guardar el ensayo:", error);

    // 🔹 Alerta de error
    await Swal.fire({
      title: "Error",
      text: "Ocurrió un problema al guardar el ensayo",
      icon: "error",
      confirmButtonColor: "#f09898",
    });
  }
};


  return (
    <form className="recepcion-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form-title">Ensayo {tipoEquipo} {modeloEquipo} A</h3>

      {/* Comentario + navegación */}
      <div className="form-group">
        <div className="label-input">
          <label className="form-label">Comentario</label>
          <input {...register("comentario")} placeholder="Comentario" />
        </div>

        <button
          type="button"
          className="form-button-2"
          onClick={() => navigate(`/dashboard/etapa/inspeccion${tipoEquipo}${modeloEquipo}C`)}
        >
          <FaArrowLeft />
        </button>

        <button
          type="button"
          className="form-button-2"
          onClick={() => navigate(`/dashboard/etapa/ensayo${tipoEquipo}${modeloEquipo}B`)}
        >
          <FaArrowRight />
        </button>

        <button type="submit" className="form-button">
          Guardar
        </button>
      </div>

      <table className="ensayoTable">
        <thead>
          <tr>
            <th>Preción</th>
            <th>Rpm</th>
            <th>Current F</th>
            <th>Iout</th>
            <th>Uout</th>
            <th>Torque</th>
            <th>Fab Ref</th>
            <th>T°</th>
          </tr>
        </thead>

        <tbody>
          {ENSAYO_DV1_A_ITEMS.map((item) => (
            <tr key={item.presion}>

              <td><strong>{item.presion}</strong></td>

              <td><strong>{item.rpm}</strong></td>

              
              <td>
                <input
                  className="inputEnsayo"
                  {...register(`presion${item.presion}CurrentF`)}
                  readOnly
                />
              </td>

              <td>
                <input
                  className="inputEnsayo"
                  type="number"
                  step="0.01"
                  {...register(`presion${item.presion}CorrienteSalida`, {
                    valueAsNumber: true,
                  })}
                />
              </td>

              <td>
                <input
                  className="inputEnsayo"
                  type="number"
                  step="0.01"
                  {...register(`presion${item.presion}VoltajeSalida`, {
                    valueAsNumber: true,
                  })}
                />
              </td>

              <td>
                <input
                  className="inputEnsayo"
                  value={calcularTorque(item.presion)}
                  readOnly
                />
              </td>

              <td><strong>{item.torqueFabricaReferencia}</strong></td>

              <td>
                <input
                  className="inputEnsayo"
                  type="number"
                  {...register(`presion${item.presion}TemperaturaCarcazaC`, {
                    valueAsNumber: true,
                  })}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <span>Calculo torque de frenado = 7 × Uout × Iout / RPM</span>
    </form>
  );
};

export default PcpEnsayoDv1A;




