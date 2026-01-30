import { useForm } from "react-hook-form";
import { useEffect } from "react";
import "../PcpEnsayo.css";
import { useNavigate } from "react-router-dom";
import useOrdenData from "../../../../../hooks/useOrdenData";
import useEnsayoData from "../../../../../hooks/useEnsayoData";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { ENSAYO_COUGAR_A_ITEMS } from "../../../../../constants/ENSAYO_ITEMS";
import Swal from "sweetalert2";
import ensayoPCPCougar from "../../../../../data/ensayoPCPCougar";

const PcpEnsayoCougarA = () => {
  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: ensayoPCPCougar,
  });

  const ordenId = localStorage.getItem("ordenId");
  const ensayoId = localStorage.getItem("ensayoId");
  const tipoEquipo = localStorage.getItem("tipoEquipo");
  const modeloEquipo = localStorage.getItem("modeloEquipo");

  const navigate = useNavigate();
  const { otActual, updateOt } = useOrdenData(ordenId);
  const { updateEnsayoCougar } = useEnsayoData(ensayoId);

  const etapaSiguiente = 7;

  useEffect(() => {
  if (!otActual?.ensayoCougar) return;

  reset({
    ...ensayoPCPCougar,

    // 🔒 FORZADOS DESDE DEFAULT (NO VIENEN DEL BACKEND)

    // RPM 100
    rpm100CurrentF: ensayoPCPCougar.rpm100CurrentF,
    rpm100VoltajeSalida: ensayoPCPCougar.rpm100VoltajeSalida,
    rpm100TorqueReferencia1: ensayoPCPCougar.rpm100TorqueReferencia1,
    rpm100TorqueReferencia2: ensayoPCPCougar.rpm100TorqueReferencia2,

    // RPM 200
    rpm200CurrentF: ensayoPCPCougar.rpm200CurrentF,
    rpm200VoltajeSalida: ensayoPCPCougar.rpm200VoltajeSalida,
    rpm200TorqueReferencia1: ensayoPCPCougar.rpm200TorqueReferencia1,
    rpm200TorqueReferencia2: ensayoPCPCougar.rpm200TorqueReferencia2,

    // RPM 230
    rpm230CurrentF: ensayoPCPCougar.rpm230CurrentF,
    rpm230VoltajeSalida: ensayoPCPCougar.rpm230VoltajeSalida,
    rpm230TorqueReferencia1: ensayoPCPCougar.rpm230TorqueReferencia1,
    rpm230TorqueReferencia2: ensayoPCPCougar.rpm230TorqueReferencia2,

    // RPM 300
    rpm300CurrentF: ensayoPCPCougar.rpm300CurrentF,
    rpm300VoltajeSalida: ensayoPCPCougar.rpm300VoltajeSalida,
    rpm300TorqueReferencia1: ensayoPCPCougar.rpm300TorqueReferencia1,
    rpm300TorqueReferencia2: ensayoPCPCougar.rpm300TorqueReferencia2,
     
  });
}, [otActual, reset]);

  /* ================================
     ⚙️ CÁLCULO DE TORQUE (VISUAL)
  ================================= */
  const calcularTorque = (rpm) => {
    const Uout = Number(watch(`rpm${rpm}.VoltajeSalida`)) || 0;
    const Iout = Number(watch(`rpm${rpm}.CorrienteSalida`)) || 0;

    if (!rpm) return "";

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
        await updateEnsayoCougar(ensayoId, {
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
      <h3 className="form-title">Ensayo PCP Cougar trabajando A</h3>

      {/* Comentario + navegación */}
      <div className="form-group">
        <div className="label-input">
          <label className="form-label">Comentario</label>
          <input {...register("comentario")} placeholder="Comentario" />
        </div>

        <button
          type="button"
          className="form-button-2"
          onClick={() =>
            navigate(`/dashboard/etapa/inspeccion${tipoEquipo}${modeloEquipo}C`)
          }
        >
          <FaArrowLeft />
        </button>

        <button
          type="button"
          className="form-button-2"
          onClick={() =>
            navigate(`/dashboard/etapa/ensayo${tipoEquipo}${modeloEquipo}B`)
          }
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
            <th>Pos 1</th>
            <th>Pos 2</th>
            <th>Torque</th>
            <th>Ref 1</th>
            <th>Ref 2</th>
            <th>T°</th>
          </tr>
        </thead>

        <tbody>
          {ENSAYO_COUGAR_A_ITEMS.map((item) => (
            <tr key={item.rpm}>
              
              <td>
                <strong>{item.rpm}</strong>
              </td>
              <td>
                <strong>{item.currentF}</strong>
              </td>

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
                <strong>{item.voltajeSalida}</strong>
              </td>

              {/* <td>
                <input
                  className="inputEnsayo"
                  type="number"
                  step="0.01"
                  {...register(`rpm${item.rpm}VoltajeSalida`, {
                    valueAsNumber: true,
                  })}
                  readOnly
                />
              </td> */}

              <td>
                <input
                  className="inputEnsayo"
                  type="number"
                  {...register(`rpm${item.rpm}PosicionSalida1`, {
                    valueAsNumber: true,
                  })}
                />
              </td>

              <td>
                <input
                  className="inputEnsayo"
                  type="number"
                  {...register(`rpm${item.rpm}PosicionSalida2`, {
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

              <td>
                <strong>{item.torqueReferencia1}</strong>
              </td>

              <td>
                <strong>{item.torqueReferencia2}</strong>
              </td>

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

export default PcpEnsayoCougarA;
