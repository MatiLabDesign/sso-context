import './UclFormStyle.css';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import RecepcionService from "../../../../services/RecepcionService";
import { RECEPCION_ITEMS_UCL } from "../../../../constants/RECEPCION_ITEMS_UCL";
import tiposEquipo from './../../../../data/tipoEquipoData';

const UclRecepcion = () => {

  const tipoEquipo = localStorage.getItem('tipoEquipo');
  const modeloEquipo = localStorage.getItem('modeloEquipo');

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
    
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const recepcion = data;
    RecepcionService.createUclRecepcion(recepcion);
    navigate(`/dashboard/etapa/inspeccion${tipoEquipo}${modeloEquipo}A`);
    console.log(recepcion);
  };

  return (
    <form className="recepcion-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form-title">Recepción UCL</h3>

      <div className="form-group">
        <div className="label-container">
          <label className="form-label">Comentario</label>
          <input {...register("comentario")} placeholder="Comentario" />
        </div>
        <button type="button" className="form-button-2">
          <Link onClick={handleClick}>
            <FaArrowRight />
          </Link>
        </button>

        <div className="button-container">
          <button type="submit" className="form-button">
            Guardar
          </button>
        </div>
      </div>

      <div className="lista-container">
        {RECEPCION_ITEMS_UCL.map(({ estado, requerimiento, observacion, label }) => (
          <div className="item-section" key={estado}>
            <div className="item-field">
              <div className="item-tittle">
                <h4 className="item-title">{label}</h4>
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Ok</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`itemRecepcion.${estado}`)}
                  checked={watch(`itemRecepcion.${estado}`)}
                />
              </div>
              <div className="item-tittle">
                <input
                  className="form-input"
                  {...register(`itemRecepcion.${requerimiento}`)}
                  placeholder="Requerimiento"
                />
              </div>
              <div className="item-tittle">
                <input
                  className="form-input"
                  {...register(`itemRecepcion.${observacion}`)}
                  placeholder="Observación"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="imagenes">
        {[0, 1, 2, 3, 4, 5].map((index) => {
          const imagenSrc = obtenerSrcImagen(index);

          return imagenSrc ? (
            <label key={index} className="imagen-prueba">
              <img
                src={imagenSrc}
                alt={`Imagen ${index + 1}`}
                className="imagen-preview"
                onClick={(e) => handleImagenClick(index, e)}
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleImagenChange(index, e.target.files[0])}
              />
            </label>
          ) : (
            <div key={index} className="imagen-prueba">
              <div
                className="boton-agregar-imagen"
                onClick={() => dataImagen()}
              >
                <span>+</span>
              </div>
            </div>
          );
        })}
      </div> */}
    </form>
  );
};

export default UclRecepcion;
