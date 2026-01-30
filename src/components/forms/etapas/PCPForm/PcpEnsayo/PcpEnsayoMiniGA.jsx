import { useForm } from "react-hook-form";
import { useEffect } from "react";
import "../PcpEnsayo.css";
import { useNavigate } from "react-router-dom";
import useOrdenData from "../../../../../hooks/useOrdenData";
import useEnsayoData from "../../../../../hooks/useEnsayoData";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { ENSAYO_MINIG_A_ITEMS } from "../../../../../constants/ENSAYO_ITEMS";
import Swal from "sweetalert2";
import ensayoMiniG from "../../../../../data/ensayoPCPMiniG";

const PcpEnsayoMiniGA = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
  } = useForm({
    defaultValues: ensayoMiniG,
  });

  const ordenId = localStorage.getItem("ordenId");
  const ensayoId = localStorage.getItem("ensayoId");
  const modeloEquipo = localStorage.getItem("modeloEquipo");
  const tipoEquipo = localStorage.getItem("tipoEquipo");

  const navigate = useNavigate();
  const { otActual, updateOt } = useOrdenData(ordenId);
  const { updateEnsayoMinig } = useEnsayoData(ensayoId);

  const etapaSiguiente = 7;

useEffect(() => {
  if (otActual?.ensayoMiniG) {
    reset({
      ...otActual.ensayoMiniG,

      // 🔒 FORZADOS DESDE DEFAULT MiniG (solo valores ≠ 0)
      ...(ensayoMiniG.rpm200CurrentF !== 0 && {
        rpm200CurrentF: ensayoMiniG.rpm200CurrentF,
      }),

      ...(ensayoMiniG.rpm300CurrentF !== 0 && {
        rpm300CurrentF: ensayoMiniG.rpm300CurrentF,
      }),

      ...(ensayoMiniG.rpm400CurrentF !== 0 && {
        rpm400CurrentF: ensayoMiniG.rpm400CurrentF,
      }),

      ...(ensayoMiniG.rpm500CurrentF !== 0 && {
        rpm500CurrentF: ensayoMiniG.rpm500CurrentF,
      }),

      ...(ensayoMiniG.rpm300TorqueFabricaReferencia !== 0 && {
        rpm300TorqueFabricaReferencia:
          ensayoMiniG.rpm300TorqueFabricaReferencia,
      }),

      ...(ensayoMiniG.rpm400TorqueFabricaReferencia !== 0 && {
        rpm400TorqueFabricaReferencia:
          ensayoMiniG.rpm400TorqueFabricaReferencia,
      }),

      ...(ensayoMiniG.rpm500TorqueFabricaReferencia !== 0 && {
        rpm500TorqueFabricaReferencia:
          ensayoMiniG.rpm500TorqueFabricaReferencia,
      }),
    });
  }
}, [otActual, reset]);




  /* ================================
     ⚙️ CÁLCULO DE TORQUE (VISUAL)
  ================================= */
  const calcularTorque = (rpm) => {
    const Uout = Number(watch(`rpm${rpm}VoltajeSalida`)) || 0;
    const Iout = Number(watch(`rpm${rpm}CorrienteSalida`)) || 0;
    return Number(((7 * Uout * Iout) / rpm).toFixed(2));
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
      await updateEnsayoMinig(ensayoId, {
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
    // const modeloEquipo = otActual?.equipo?.tipoEquipo?.modelo;
    // const tipoEquipo = otActual?.equipo?.tipoEquipo?.tipo;

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
      <h3 className="form-title">Ensayo {tipoEquipo} {modeloEquipo} en proceso A</h3>

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

      {/* Tabla de ensayo */}
      <table className="ensayoTable">
        <thead>
          <tr>
            <th>RPM</th>
            <th>Current F</th>
            <th>Iout</th>
            <th>Uout</th>
            <th>Torque</th>
            <th>Fab Ref</th>
            <th>T°</th>
          </tr>
        </thead>

        <tbody>
          {ENSAYO_MINIG_A_ITEMS.map((item) => (
            <tr key={item.rpm}>

              <td><strong>{item.rpm}</strong></td>

              <td><strong>{item.currentF}</strong></td>

              <td>
                <input
                  className="inputEnsayo"
                  type="number"
                  step="0.01"
                  {...register(`rpm${item.rpm}CorrienteSalida`, {
                    valueAsNumber: true,
                  })}
                />
              </td>

              <td>
                <input
                  className="inputEnsayo"
                  type="number"
                  step="0.01"
                  {...register(`rpm${item.rpm}VoltajeSalida`, {
                    valueAsNumber: true,
                  })}
                />
              </td>
              
              <td>
                <input
                  className="inputEnsayo"
                  value={calcularTorque(item.rpm)}
                  readOnly
                />
              </td>
              
              <td><strong>{item.torqueFabricaReferencia}</strong></td>

              <td>
                <input
                  className="inputEnsayo"
                  type="number"
                  {...register(`rpm${item.rpm}TemperaturaCarcazaC`, {
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

export default PcpEnsayoMiniGA;
