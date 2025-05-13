import { useForm } from "react-hook-form";
import "../PcpEnsayo.css"; // Asegúrate de tener el archivo CSS
import RecepcionService from "../../../../../services/RecepcionService";
import { useNavigate } from "react-router-dom";
import ensayoPCPMiniG from "../../../../../data/ensayoPCPMiniG";
import EnsayoService from "../../../../../services/EnsayoService";

const PcpEnsayoDv1A = () => {
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
  
  const calcularTorque = () => {
    //acá la formula para calcular el torque
  }

  const onSubmit = async (data) => {
    try {
      const ensayo = data;
      await EnsayoService.createEnsayo(ensayo);

      console.log("Datos enviados exitosamente:", ensayo);
      navigate("/dashboard/etapa/salidaPcp");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };
  
  const itemEnsayoDv1 =[
    ["100", "10", "18", "135"],
    ["100", "20", "18", "150"],
    ["100", "70", "18", "320"],
    ["100", "100", "18", "450"],
  ];
  // [rpm, presion, currentF, torqueRef]

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
        "rpm200",
        "rpm300",
        "rpm400",
        "rpm500",
      ].map((itemKey) => (
        <div className="item-section" key={itemKey}>
          <div className="item-field">
            <div className="item-tittle">
              <h4 className="item-title">{itemKey}</h4>
            </div>
            <div className="item-tittle">
              <input
                className="form-input"
                {...register(`itemRecepcion.${itemKey}.requerimiento`)}
                placeholder="Current F"
              />
            </div>
            <div className="item-tittle">
              <input
                className="form-input"
                {...register(`itemRecepcion.${itemKey}.requerimiento`)}
                placeholder="U Out"
              />
            </div>
            <div className="item-tittle">
              <input
                className="form-input"
                {...register(`itemRecepcion.${itemKey}.requerimiento`)}
                placeholder="Active I Out"
              />
            </div>
            <div className="item-tittle">
              <input
                className="form-input"
                {...register(`itemRecepcion.${itemKey}.requerimiento`)}
                placeholder="Torque Fren"
              />
            </div>
            <div className="item-tittle">
              <p className="torque">15.5</p>
              {/* <input
                className="form-input"
                {...register(`itemRecepcion.${itemKey}.requerimiento`)}
                placeholder="Torque Fabrica"
              /> */}
            </div>
            <div className="item-tittle">
              <input
                className="form-input"
                {...register(`itemRecepcion.${itemKey}.requerimiento`)}
                placeholder="T° Carcaza"
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

export default PcpEnsayoDv1A;
