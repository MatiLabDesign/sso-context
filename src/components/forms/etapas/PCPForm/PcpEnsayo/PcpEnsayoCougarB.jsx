import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "../PcpEnsayo.css";
import { useNavigate } from "react-router-dom";
import useOrdenData from "../../../../../hooks/useOrdenData";
import useEnsayoData from "../../../../../hooks/useEnsayoData";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { ENSAYO_COUGAR_B_ITEMS } from "../../../../../constants/ENSAYO_ITEMS";
import Swal from "sweetalert2";
import ensayoPCPCougar from "../../../../../data/ensayoPCPCougar";

const PcpEnsayoCougarB = () => {
  const ordenId = localStorage.getItem("ordenId");
  const ensayoId = localStorage.getItem("ensayoId");
  const modeloEquipo = localStorage.getItem("modeloEquipo");
  const tipoEquipo = localStorage.getItem("tipoEquipo");

  const navigate = useNavigate();

  // FORM
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: ensayoPCPCougar,
  });

  // DATA
  const { otActual } = useOrdenData(ordenId);
  const { ensayoActual, updateEnsayoCougar } = useEnsayoData(ensayoId);

  // 🔁 CARGA CONTROLADA (igual que Recepción)
  useEffect(() => {
    if (ensayoActual) {
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
    }
  }, [ensayoActual, reset]);

  // 💾 GUARDAR
  const onSubmit = async (data) => {
    try {
      // 🔹 No hay cambios
      if (!isDirty) {
        await Swal.fire({
          title: "Sin cambios",
          text: "No se detectaron modificaciones para guardar",
          icon: "info",
          confirmButtonColor: "#059080",
        });
        return;
      }

      // 🔹 Validación de ID
      if (!ensayoId) {
        await Swal.fire({
          title: "Error",
          text: "No existe un ensayo asociado para guardar",
          icon: "error",
          confirmButtonColor: "#f09898",
        });
        console.warn("No existe ensayoId");
        return;
      }

      // 🔹 Confirmación
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

      // 🔹 Guardado
      await updateEnsayoMinig(ensayoId, {
        ...data,
        id: Number(ensayoId),
      });

      // 🔹 Éxito
      // await Swal.fire({
      //   title: "Guardado",
      //   text: "El ensayo se guardó correctamente",
      //   icon: "success",
      //   confirmButtonColor: "#059080",
      // });

      // 🔹 Navegación
      navigate("/dashboard/etapa/salidaPCP");
    } catch (error) {
      console.error("❌ Error al guardar ensayo:", error);

      // 🔹 Error
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
      <h3 className="form-title">
        Ensayo {tipoEquipo} {modeloEquipo} B
      </h3>

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
            navigate(`/dashboard/etapa/ensayo${tipoEquipo}${modeloEquipo}A`)
          }
        >
          <FaArrowLeft />
        </button>

        <button
          type="button"
          className="form-button-2"
          onClick={() => navigate(`/dashboard/etapa/salida${tipoEquipo}`)}
        >
          <FaArrowRight />
        </button>

        <button type="submit" className="form-button">
          Guardar
        </button>
      </div>

      {/* Ítems */}
      <div className="lista-container2">
        {ENSAYO_COUGAR_B_ITEMS.map(({ estado, observacion, label }) => (
          <div className="item-section" key={estado}>
            <div className="item-field">
              <div className="item-title">
                <h4>{label}</h4>
              </div>

              <div className="item-tittle">
                <label className="form-label-1">Ok</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(estado)}
                />
              </div>

              <div className="item-tittle">
                <input
                  className="form-input"
                  {...register(observacion)}
                  placeholder="Observación"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
};

export default PcpEnsayoCougarB;
