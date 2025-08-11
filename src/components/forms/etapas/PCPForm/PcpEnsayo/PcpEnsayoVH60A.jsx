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
import { ENSAYO_A_ITEMS } from "../../../../../constants/ENSAYO_ITEMS";

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

  const etapaSiguiente = 7;

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

        const updatedOt = {
          ...otActual,
          ensayoVh60: { id: nuevoEnsayo.id },
          etapaActual: etapaSiguiente,
        };
        if (nuevoEnsayo?.id) {
          await updateOt(ordenId, updatedOt);
        }
      }

      const updatedOt = {
        ...otActual,
        etapaActual: etapaSiguiente,
      };

      await updateOt(ordenId, updatedOt);

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
      <table className="ensayoTable">
        <thead>
          <tr>
            <th>RPM</th>
            <th>Corriente</th>
            <th>Voltaje</th>
            <th>Pos 1</th>
            <th>Pos 2</th>
            <th>Torque 1</th>
            <th>Torque 2</th>
            <th>Ref 1</th>
            <th>Ref 2</th>
            <th>Temperatura</th>
          </tr>
        </thead>
        <tbody>
          {ENSAYO_A_ITEMS.map(
            ({
              rpm,
              currentF: rpm100CurrentF,
              torqueRef1: rpm100TorqueReferencia1,
              torqueRef2: rpm100TorqueReferencia2,
            }) => (
              <tr key={rpm}>
                <td>
                  <strong>{rpm}</strong>
                </td>
                <td>
                  <p className="datoEnsayo" {...register(`rpm${rpm}CurrentF`)}>
                    {rpm100CurrentF}
                  </p>
                </td>
                <td>
                  <input
                    className="inputEnsayo"
                    {...register(`rpm${rpm}VoltajeSalida`)}
                    type="number"
                  />
                </td>
                <td>
                  <input
                    className="inputEnsayo"
                    {...register(`rpm${rpm}PosicionSalida1`)}
                    type="number"
                  />
                </td>
                <td>
                  <input
                    className="inputEnsayo"
                    {...register(`rpm${rpm}PosicionSalida2`)}
                    type="number"
                  />
                </td>
                <td>
                  <input
                    className="inputEnsayo"
                    {...register(`rpm${rpm}TorqueFrenado1`)}
                    type="number"
                  />
                </td>
                <td>
                  <input
                    className="inputEnsayo"
                    {...register(`rpm${rpm}TorqueFrenado2`)}
                    type="number"
                  />
                </td>
                <td>
                  <p className="datoEnsayo">{rpm100TorqueReferencia1}</p>
                </td>
                <td>
                  <p className="datoEnsayo">{rpm100TorqueReferencia2}</p>
                </td>
                <td>
                  <input
                    className="inputEnsayo"
                    {...register(`rpm${rpm}TemperaturaCarcazaC`)}
                    type="number"
                  />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </form>
  );
};

export default PcpEnsayoVH60A;
