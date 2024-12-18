import  {useEffect} from "react";
import { useForm, Controller } from "react-hook-form";
// import axios from "axios";7
import "./PcpRecepcion2.css"; // Asegúrate de tener el archivo CSS
import RecepcionService from "../../../../services/RecepcionService";
import { useNavigate } from "react-router-dom";

const PcpRecepcion2 = () => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      comentario: "",
      eliminado: false,
      itemRecepcion: {
        cubreGrampa: { estado: undefined, requerimiento: "", observacion: "" },
        cubrePolea: { estado: undefined, requerimiento: "", observacion: "" },
        cubreVastago: { estado: undefined, requerimiento: "", observacion: "" },
        grampaAntiEyeccion: { estado: undefined, requerimiento: "", observacion: "" },
        estructuraChasis: { estado: undefined, requerimiento: "", observacion: "" },
        linternaSeparador: { estado: undefined, requerimiento: "", observacion: "" },
        mesaDeMotor: { estado: undefined, requerimiento: "", observacion: "" },
        rielesDeMotor: { estado: undefined, requerimiento: "", observacion: "" },
        soporteDeTransporte: { estado: undefined, requerimiento: "", observacion: "" },
        poleaConducida: { estado: undefined, requerimiento: "", observacion: "" },
      },
    },
  });

  const tipoEquipo = window.localStorage.getItem("tipoEquipo");
  const etapaActual = window.localStorage.getItem("etapaActual");
  const numeroOT = window.localStorage.getItem("numeroOT");
  const ordenId = window.localStorage.getItem("ordenId");

  const navigate = useNavigate();

   // Efecto para cargar los datos persistidos//////////
   useEffect(() => {
    const fetchRecepcionData = async () => {
      try {
        const response = await RecepcionService.getRecepcionById(ordenId);
        if (response.data) {
          reset(response.data); 
        }
      } catch (error) {
        console.error("Error al obtener los datos de recepción:", error);
      }
    };

    fetchRecepcionData();
  }, [numeroOT, reset]);
/////////////////////////////////////////
  

  const onSubmit = async (data) => {
    try {
      const recepcion = data;
      await RecepcionService.createRecepcion(recepcion);
        
      console.log("Datos enviados exitosamente:", recepcion);
      navigate("/dashboard/etapa/inspeccionPCP");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <form className="recepcion-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form-title">Recepción | {tipoEquipo} - OT N°{numeroOT}</h3>

      {/* Campo para comentario */}
      <div className="form-group">
        <label className="form-label">Comentario</label>
        <Controller
          name="comentario"
          control={control}
          render={({ field }) => (
            <input
              className="comentario-input"
              {...field}
              placeholder="Comentario"
            />
          )}
        />
      </div>

      {/* Iterar sobre cada propiedad en itemRecepcion */}
      {[
        "cubreGrampa",
        "cubrePolea",
        "cubreVastago",
        "grampaAntiEyeccion",
        "estructuraChasis",
        "linternaSeparador",
        "mesaDeMotor",
        "rielesDeMotor",
        "soporteDeTransporte",
        "poleaConducida",
      ].map((itemKey) => (
        <div className="item-section" key={itemKey}>
          <div className="item-field">
            <div className="item-tittle">
              <h4 className="item-title">{itemKey}</h4>
            </div>
            <div className="item-tittle">
              <label className="form-label">Ok</label>
              <Controller
                name={`itemRecepcion.${itemKey}.estado`}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      className="radio-input"
                      type="radio"
                      value= "true"
                      {...field}
                      checked={field.value === true}
                      onChange={() => field.onChange(true)}
                    />
                  </>
                )}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label">Falta</label>
              <Controller
                name={`itemRecepcion.${itemKey}.estado`}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      className="radio-input"
                      type="radio"
                      value="false"
                      {...field}
                      checked={field.value === false}
                      onChange={(e) => field.onChange(false)}
                    />
                  </>
                )}
              />
            </div>
            <div className="item-tittle">
              {/* <label className="form-label">Requerimiento</label> */}
              <Controller
                name={`itemRecepcion.${itemKey}.requerimiento`}
                control={control}
                render={({ field }) => (
                  <input
                    className="form-input"
                    {...field}
                    placeholder="Requerimiento"
                  />
                )}
              />
            </div>
            <div className="item-tittle">
              {/* <label className="form-label">Observación</label> */}
              <Controller
                name={`itemRecepcion.${itemKey}.observacion`}
                control={control}
                render={({ field }) => (
                  <input
                    className="form-input"
                    {...field}
                    placeholder="Observación"
                  />
                )}
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

export default PcpRecepcion2;
