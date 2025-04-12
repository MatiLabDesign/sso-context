import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../PcpEnsayo.css";
import { Link, useNavigate } from "react-router-dom";
import EnsayoService from "../../../../../services/EnsayoService";
import ensayoPCPVH60 from "../../../../../data/ensayoPCPVH60";
import useEnsayoCalc from "../../../../../hooks/useEnsayoCalc";
import useOrdenData from "../../../../../hooks/useOrdenData";
import useEnsayoData from "../../../../../hooks/useEnsayoData";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const PcpEnsayoVH60A = () => {
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
        const nuevoEnsayo = await createEnsayo({
          ...data,
          fuerzasCalculadas: fuerzas,
        });
        if (nuevoEnsayo?.id) {
          await updateOt(ordenId, {
            ...otActual,
            ensayoVh60: { id: nuevoEnsayo.id },
          });
        }
      }

      if (modeloEquipo && tipoEquipo) {
        navigate(`/dashboard/etapa/ensayo${tipoEquipo}${modeloEquipo}B`);
      }
    } catch (error) {
      console.error("Error al procesar el ensayo:", error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/dashboard/etapa/ensayoPCPVh60B`);
  };
  const handleClickA = (e) => {
    e.preventDefault();
    navigate(`/dashboard/etapa/inspeccionPCPVh60C`);
  };

  return (
    <form className="recepcion-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form-title">Ensayo PCP VH60 A</h3>

      <div className="form-group">
              <div className="label-input">
                <label className="form-label">Comentario</label>
                <input {...register("comentario")} placeholder="Comentario" />
              </div>
              <button className="form-button-2">
                <Link onClick={handleClickA}>
                  <FaArrowLeft />
                </Link>
              </button>
              <button className="form-button-2">
                <Link onClick={handleClick}>
                  <FaArrowRight />
                </Link>
              </button>
              <button type="submit" className="form-button">
                Guardar
              </button>
            </div>
      <div className="lista-container2">
        {["rpm200", "rpm300", "rpm400", "rpm500"].map((itemKey) => (
          <div className="item-section" key={itemKey}>
            <div className="item-field">
              <div className="item-tittle2">
                <h4 className="item-title">{itemKey}</h4>
              </div>

              <div className="item-tittle">
                <label>C F</label>
                <input
                  className="form-input2"
                  {...register(`itemEnsayo.${itemKey}.currentF`)}
                  placeholder="Current F"
                  type="number"
                  step="0.01"
                />
              </div>

              <div className="item-tittle">
                <label>U Out</label>
                <input
                  className="form-input2"
                  {...register(`itemEnsayo.${itemKey}.voltajeSalida`)}
                  placeholder="Voltaje (V)"
                  type="number"
                  step="0.01"
                />
              </div>

              <div className="item-tittle">
                <label>I Out</label>
                <input
                  className="form-input2"
                  {...register(`itemEnsayo.${itemKey}.corrienteSalida`)}
                  placeholder="Corriente (A)"
                  type="number"
                  step="0.01"
                />
              </div>

              <div className="item-tittle">
                <label>Tq .</label>
                <div className="torque-value2">
                  {fuerzas[itemKey]?.toFixed(2) || "0.00"} lbf
                </div>
              </div>
              <div className="item-tittle">
                <label>Ref .</label>
                <div className="torque-value">0.35 lbf</div>
              </div>

              <div className="item-tittle">
                <label>T°</label>
                <input
                  className="form-input2"
                  {...register(`itemEnsayo.${itemKey}.temperaturaCarcazaC`)}
                  placeholder="Temperatura (°C)"
                  type="number"
                  step="0.1"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
};

export default PcpEnsayoVH60A;
