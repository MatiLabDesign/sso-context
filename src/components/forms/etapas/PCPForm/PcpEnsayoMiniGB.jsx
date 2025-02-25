import { useForm } from "react-hook-form";
import "./PcpEnsayo.css"; // Asegúrate de tener el archivo CSS
import RecepcionService from "../../../../services/RecepcionService";
import { useNavigate } from "react-router-dom";
import ensayoPCPMiniG from "../../../../data/ensayoPCPMiniG";
import EnsayoService from "../../../../services/EnsayoService";

const PcpEnsayoMiniGB = () => {
  const { register, handleSubmit } = useForm({defaultValues:ensayoPCPMiniG});

  const tipoEquipo = window.localStorage.getItem("tipoEquipo");
  const etapaActual = window.localStorage.getItem("etapaActual");
  const numeroOT = window.localStorage.getItem("numeroOT");
  const ordenId = window.localStorage.getItem("ordenId");

  const navigate = useNavigate();

  // Efecto para cargar los datos persistidos//////////
  //  useEffect(() => {
  //   const fetchRecepcionData = async () => {
  //     try {
  //       const response = await RecepcionService.getRecepcionById(ordenId);
  //       if (response.data) {
  //         reset(response.data);
  //       }
  //     } catch (error) {
  //       console.error("Error al obtener los datos de recepción:", error);
  //     }
  //   };

  //   fetchRecepcionData();
  // }, [numeroOT, reset]);
  /////////////////////////////////////////

  const onSubmit = async (data) => {
    try {
      const ensayo = data;
      await EnsayoService.createEnsayo(ensayo);

      console.log("Datos enviados exitosamente:", ensayo);
      navigate("/dashboard/etapa/inspeccionVh60A");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <form className="recepcion-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form-title">
        {/* Recepción | {tipoEquipo} - OT N°{numeroOT} */}
        Ensayo PCP MiniG A
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
        "nivelAceite",
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
              />
            </div>

            {/* <div className="item-tittle">
              <input
                className="form-input"
                {...register(`itemRecepcion.${itemKey}.requerimiento`)}
                placeholder="Requerimiento"
              />
            </div> */}
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

export default PcpEnsayoMiniGB;
