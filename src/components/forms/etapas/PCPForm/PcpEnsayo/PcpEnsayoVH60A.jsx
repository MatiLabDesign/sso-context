import { useForm } from "react-hook-form";
import { useEffect } from "react";
import "../PcpEnsayo.css";
import { useNavigate } from "react-router-dom";
import useOrdenData from "../../../../../hooks/useOrdenData";
import useEnsayoData from "../../../../../hooks/useEnsayoData";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { ENSAYO_A_ITEMS } from "../../../../../constants/ENSAYO_ITEMS";
import ensayoVH60 from "../../../../../data/ensayoPCPVH60";

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
  const ensayoId = localStorage.getItem("ensayoId");

  const navigate = useNavigate();
  const { otActual, updateOt } = useOrdenData(ordenId);
  const { updateEnsayoVh60 } = useEnsayoData(ensayoId);

  const etapaSiguiente = 7;

  /* ================================
     🔁 CARGA CORRECTA DEL ENSAYO
  ================================= */
  // useEffect(() => {
  //   if (otActual?.ensayoVh60) {
  //     reset({
  //       ...ensayoVH60,
  //       ...otActual.ensayoVh60,
  //     });
  //   }
  // }, [otActual, reset]);

//   useEffect(() => {
//   if (otActual?.ensayoVh60) {
//     reset({
//       ...otActual.ensayoVh60,

//       // 🔒 FORZAMOS CurrentF DESDE DEFAULT
//       rpm100CurrentF: ensayoVH60.rpm100CurrentF,
//       rpm200CurrentF: ensayoVH60.rpm200CurrentF,
//       rpm300CurrentF: ensayoVH60.rpm300CurrentF,
//     });
//   }
// }, [otActual, reset]);

useEffect(() => {
  if (otActual?.ensayoVh60) {
    reset({
      ...otActual.ensayoVh60,

      // 🔒 FORZADOS DESDE DEFAULT (NO VIENEN DEL BACKEND)
      rpm100CurrentF: ensayoVH60.rpm100CurrentF,
      rpm200CurrentF: ensayoVH60.rpm200CurrentF,
      rpm300CurrentF: ensayoVH60.rpm300CurrentF,

      rpm100TorqueReferencia1: ensayoVH60.rpm100TorqueReferencia1,
      rpm100TorqueReferencia2: ensayoVH60.rpm100TorqueReferencia2,

      rpm200TorqueReferencia1: ensayoVH60.rpm200TorqueReferencia1,
      rpm200TorqueReferencia2: ensayoVH60.rpm200TorqueReferencia2,

      rpm300TorqueReferencia1: ensayoVH60.rpm300TorqueReferencia1,
      rpm300TorqueReferencia2: ensayoVH60.rpm300TorqueReferencia2,
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
      console.log("Ensayo enviado:", data);

      if (ensayoId) {
        await updateEnsayoVh60(ensayoId, {
          ...data,
          id: (ensayoId),
        });
      }

      await updateOt(ordenId, {
        ...otActual,
        etapaActual: etapaSiguiente,
      });

      const modeloEquipo = otActual?.equipo?.tipoEquipo?.modelo;
      const tipoEquipo = otActual?.equipo?.tipoEquipo?.tipo;

      if (modeloEquipo && tipoEquipo) {
        navigate(`/dashboard/etapa/ensayo${tipoEquipo}${modeloEquipo}B`);
      }
    } catch (error) {
      console.error("❌ Error al guardar el ensayo:", error);
    }
  };

  return (
    <form className="recepcion-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form-title">Ensayo PCP VH60 A</h3>

      {/* Comentario + navegación */}
      <div className="form-group">
        <div className="label-input">
          <label className="form-label">Comentario</label>
          <input {...register("comentario")} placeholder="Comentario" />
        </div>

        <button
          type="button"
          className="form-button-2"
          onClick={() => navigate(`/dashboard/etapa/inspeccionPCPVh60C`)}
        >
          <FaArrowLeft />
        </button>

        <button
          type="button"
          className="form-button-2"
          onClick={() => navigate(`/dashboard/etapa/ensayoPCPVh60B`)}
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
          {ENSAYO_A_ITEMS.map((item) => (
            <tr key={item.rpm}>
              <td><strong>{item.rpm}</strong></td>

              <td>
                <input
                  className="inputEnsayo"
                  {...register(`rpm${item.rpm}CurrentF`)}
                  readOnly
                />
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
                <input
                  className="inputEnsayo"
                  {...register(`rpm${item.rpm}TorqueReferencia1`)}
                  readOnly
                />
              </td>

              <td>
                <input
                  className="inputEnsayo"
                  {...register(`rpm${item.rpm}TorqueReferencia2`)}
                  readOnly
                />
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

export default PcpEnsayoVH60A;



