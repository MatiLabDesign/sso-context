import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "../../PCPForm/PcpEnsayo.css";
import { useNavigate } from "react-router-dom";
import useOrdenData from "../../../../../hooks/useOrdenData";
import useEnsayoData from "../../../../../hooks/useEnsayoData";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { ENSAYO_VH60_B_ITEMS } from "../../../../../constants/ENSAYO_ITEMS";
import Swal from "sweetalert2";
import ensayoUCL from './../../../../../data/ensayoUCL';


const UclEnsayoB = () => {
  const ordenId = localStorage.getItem("ordenId");
  const ensayoId = localStorage.getItem("ensayoId");
  const tipoEquipo = localStorage.getItem("tipoEquipo");
  const modeloEquipo = localStorage.getItem("modeloEquipo");

  const navigate = useNavigate();

  // FORM
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: ensayoUCL,
  });

  // DATA
  const { otActual } = useOrdenData(ordenId);
  const { ensayoActual, updateEnsayoUcl } = useEnsayoData(ensayoId);

  // 🔁 CARGA CONTROLADA (igual que Recepción)
  useEffect(() => {
    if (ensayoActual) {
      reset({
        ...ensayoActual,

        // 🔒 FORZAMOS VALORES TÉCNICOS DESDE DEFAULT
        // rpm100CurrentF: ensayoVH60.rpm100CurrentF,
        // rpm200CurrentF: ensayoVH60.rpm200CurrentF,
        // rpm300CurrentF: ensayoVH60.rpm300CurrentF,

        // rpm100TorqueReferencia1: ensayoVH60.rpm100TorqueReferencia1,
        // rpm100TorqueReferencia2: ensayoVH60.rpm100TorqueReferencia2,
        // rpm200TorqueReferencia1: ensayoVH60.rpm200TorqueReferencia1,
        // rpm200TorqueReferencia2: ensayoVH60.rpm200TorqueReferencia2,
        // rpm300TorqueReferencia1: ensayoVH60.rpm300TorqueReferencia1,
        // rpm300TorqueReferencia2: ensayoVH60.rpm300TorqueReferencia2,
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
    await updateEnsayoUcl(ensayoId, {
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
    navigate(`/dashboard/etapa/ensayo${tipoEquipo}B`);

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
      <h3 className="form-title">Ensayo UCL B</h3>

      {/* Comentario + navegación */}
      <div className="form-group">
        <div className="label-input">
          <label className="form-label">Comentario</label>
          <input {...register("comentario")} placeholder="Comentario" />
        </div>

        <button
          type="button"
          className="form-button-2"
          onClick={() => navigate(`/dashboard/etapa/ensayo${tipoEquipo}${modeloEquipo}A`)}
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
        {ENSAYO_VH60_B_ITEMS.map(({ estado, observacion, label }) => (
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

export default UclEnsayoB;
