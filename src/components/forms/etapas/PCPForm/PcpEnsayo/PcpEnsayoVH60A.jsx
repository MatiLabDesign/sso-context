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
import useEnsayoCalculo from "../../../../../hooks/useEnsayoCalculo";

const PcpEnsayoVH60A = () => {
  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: ensayoPCPVH60,
  });

  const formValues = watch();
  const ordenId = localStorage.getItem("ordenId");
  const navigate = useNavigate();

  const { fuerzas } = useEnsayoCalc(formValues);
  const { torqueFrenado } = useEnsayoCalculo(formValues);
  const { otActual, updateOt } = useOrdenData(ordenId);
  const [ensayoId, setEnsayoId] = useState(null);
  const { ensayoActual, newEnsayoVh60, updateEnsayoVh60 } = useEnsayoData(
    ensayoId,
    reset
  );

  const etapaSiguiente = 7;

  // Carga inicial de datos
  useEffect(() => {
    if (otActual?.ensayo?.id) {
      setEnsayoId(otActual.ensayo.id);
    }
    console.log("Valores de torque:", torqueFrenado);
  }, [otActual]);

  // Submit handler
  const onSubmit = async (data) => {
    try {
      const modeloEquipo = otActual?.equipo?.tipoEquipo?.modelo;
      const tipoEquipo = otActual?.equipo?.tipoEquipo?.tipo;

      if (ensayoId) {
        await updateEnsayoVh60(ensayoId, {
          ...data,
          fuerzasCalculadas: fuerzas,
        });
      } else {
        const nuevoEnsayo = await newEnsayoVh60({
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
            <th>Current F</th>
            <th>Iout</th>
            <th>Uout</th>
            <th>Pos 1</th>
            <th>Pos 2</th>
            {/* <th>Torque 1</th> */}
            <th>Torque</th>
            {/* <th>Torque 2</th> */}
            <th>Ref 1</th>
            <th>Ref 2</th>
            <th>T°</th>
          </tr>
        </thead>
        <tbody>
          {ENSAYO_A_ITEMS.map((item) => (
            <tr key={item.rpm}>
              <td>
                <strong>{item.rpm}</strong>
              </td>
              <td>
                <input
                  className="inputEnsayo"
                  {...register(`rpm${item.rpm}CurrentF`)}
                  value={item.currentF}
                  readOnly
                />
              </td>
              <td>
                <input
                  className="inputEnsayo"
                  {...register(`rpm${item.rpm}CorrienteSalida`)}
                  type="number"
                />
              </td>
              <td>
                <input
                  className="inputEnsayo"
                  {...register(`rpm${item.rpm}VoltajeSalida`)}
                  type="number"
                />
              </td>
              <td>
                <input
                  className="inputEnsayo"
                  {...register(`rpm${item.rpm}PosicionSalida1`)}
                  type="number"
                />
              </td>
              <td>
                <input
                  className="inputEnsayo"
                  {...register(`rpm${item.rpm}PosicionSalida2`)}
                  type="number"
                />
              </td>
              <td>
                <input
                  className="inputEnsayo"
                  {...register("rpm100TorqueFrenado")}
                  value={torqueFrenado}
                  readOnly
                />

                {/* <p>{torqueFrenado[0]}</p> */}
              </td>
              {/* <td>
                  <input
                    className="inputEnsayo"
                    {...register(`rpm${item.rpm}TorqueFrenado2`)}
                    type="number"
                  />
                </td> */}
              <td>
                <input
                  className="inputEnsayo"
                  value={item.torqueRef1}
                  readOnly
                />
              </td>
              <td>
                <input
                  className="inputEnsayo"
                  value={item.torqueRef2}
                  readOnly
                />
              </td>
              <td>
                <input
                  className="inputEnsayo"
                  {...register(`rpm${item.rpm}TemperaturaCarcazaC`)}
                  type="number"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <span>Calculo torque de frenado = 7 x Uout x Iout / RPM</span>
    </form>
  );
};

export default PcpEnsayoVH60A;
