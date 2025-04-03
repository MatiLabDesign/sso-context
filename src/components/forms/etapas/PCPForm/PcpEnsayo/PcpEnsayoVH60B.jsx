import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../PcpEnsayo.css";
import { useNavigate } from "react-router-dom";
import EnsayoService from "../../../../../services/EnsayoService";
import ensayoPCPVH60 from "../../../../../data/ensayoPCPVH60";
import useEnsayoCalc from "../../../../../hooks/useEnsayoCalc";
import useOrdenData from "../../../../../hooks/useOrdenData";
import useEnsayoData from "../../../../../hooks/useEnsayoData";

const PcpEnsayoVH60B = () => {
  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: ensayoPCPVH60,
  });

  const formValues = watch();
  const ordenId = localStorage.getItem("ordenId");
  const navigate = useNavigate();

  const { fuerzas } = useEnsayoCalc(formValues);
  const { otActual, updateOt } = useOrdenData(ordenId);
  const [ensayoId, setEnsayoId] = useState(null);
  const { ensayoActual, createEnsayo, updateEnsayo } = useEnsayoData(
    ensayoId,
    reset
  );

  // Carga inicial de datos
  useEffect(() => {
    if (otActual?.ensayo?.id) {
      setEnsayoId(otActual.ensayo.id);
    }
  }, [otActual]);

  // Submit handler
  const onSubmit = async (data) => {
    try {
      const modeloEquipo = otActual?.equipo?.tipoEquipo?.modelo;
      const tipoEquipo = otActual?.equipo?.tipoEquipo?.tipo;

      if (ensayoId) {
        await updateEnsayo(ensayoId, { ...data, fuerzasCalculadas: fuerzas });
      } else {
        const newEnsayo = await createEnsayo({
          ...data,
          fuerzasCalculadas: fuerzas,
        });
        if (newEnsayo?.id) {
          await updateOt(ordenId, {
            ...otActual,
            ensayoPcpVh60: { id: newEnsayo.id },
          });
        }
      }

      if (modeloEquipo && tipoEquipo) {
        navigate(`/dashboard/etapa/salida${tipoEquipo}`);
      }
    } catch (error) {
      console.error("Error al procesar el ensayo:", error);
    }
  };

  return (
    <form className="recepcion-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form-title">
        {/* Recepción | {tipoEquipo} - OT N°{numeroOT} */}
        Ensayo PCP VH60 B
      </h3>

      {/* Campo para comentario */}
      <div className="form-group">
        <label className="form-label">Comentario</label>
        <input {...register("comentario")} placeholder="Comentario" />
      </div>

      {/* Iterar sobre cada propiedad en itemRecepcion */}
      {[
        "cargaAxial",
        "temperatura",
        "nivelDeRuido",
        "nivelDeVibracion",
        "fugaDeAceite",
        "nivelDeAceite",
        "pintura",
      ].map((itemKey) => (
        <div className="item-section" key={itemKey}>
          <div className="item-field">
            <div className="item-tittle">
              <h4 className="item-title">{itemKey}</h4>
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Ok</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`itemRecepcion.${itemKey}.estado`)}
                checked={watch(`itemRecepcion.${itemKey}.estado`)}
              />
            </div>
           
            <div className="item-tittle">
              <input
                className="form-input"
                {...register(`itemRecepcion.${itemKey}.observacion`)}
                placeholder="Observación"
              />
            </div>
          </div>
        </div>
      ))}

      <button type="submit" className="form-button">
        Guardar
      </button>
    </form>
  );
};

export default PcpEnsayoVH60B;
