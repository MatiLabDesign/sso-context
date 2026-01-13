import React from "react";
import './UclFormStyle.css';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import InspeccionService from "../../../../services/InspeccionService";
import { INSPECCION_A_ITEMS_UCL } from "../../../../constants/INSPECCION_ITEMS_UCL";

const UclInspeccionA = () => {

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const inspeccion = data;
    
    InspeccionService.createInspeccion(inspeccion);
    navigate("/dashboard/etapa/inspeccionUCLB");
    console.log(inspeccion);
  };

  return (
    <form className="recepcion-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form-title">Inspección VH60 A</h3>

      <div className="form-group">
        <div className="label-input">
          <label className="form-label">Comentario</label>
          <input {...register("comentario")} placeholder="Comentario" />
        </div>
        {/* <button type="button" className="form-button-2">
          <Link onClick={handleClickA}>
            <FaArrowLeft />
          </Link>
        </button>
        <button type="button" className="form-button-2">
          <Link onClick={handleClick}>
            <FaArrowRight />
          </Link>
        </button> */}
        <button type="submit" className="form-button">
          Guardar
        </button>
      </div>
      <div className="lista-container">
        <h3>Lubricantes</h3>
        {INSPECCION_A_ITEMS_UCL.lubricantes.map(({ ok, pm, agua, sucio, esp, label }) => (
          <div className="item-section" key={ok}>
            <div className="item-field">
              <div className="item-tittle">
                <h4 className="item-title2">{label}</h4>
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Ok</label>
                <input
                  type="checkbox"
                  className="radio-input"
                  {...register(`lubricantePcpVh60.${ok}`)}
                  checked={watch(`lubricantePcpVh60.${ok}`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">PM</label>
                <input
                  type="checkbox"
                  className="radio-input"
                  {...register(`lubricantePcpVh60.${pm}`)}
                  checked={watch(`lubricantePcpVh60.${pm}`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Agua</label>
                <input
                  type="checkbox"
                  className="radio-input"
                  {...register(`lubricantePcpVh60.${agua}`)}
                  checked={watch(`lubricantePcpVh60.${agua}`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Sucio</label>
                <input
                  type="checkbox"
                  className="radio-input"
                  {...register(`lubricantePcpVh60.${sucio}`)}
                  checked={watch(`lubricantePcpVh60.${sucio}`)}
                />
              </div>
              <div className="item-tittle">
                <input
                  className="form-input"
                  placeholder="Especificar"
                  {...register(`lubricantePcpVh60.${esp}`)}
                />
              </div>
            </div>
          </div>
        ))}

        <h3>Dispositivo Inversor</h3>
        {INSPECCION_A_ITEMS_UCL.inversor.map((item) => (
          <div className="item-section" key={item.label}>
            <div className="item-tittle">
              <h4 className="item-title">{item.label}</h4>
            </div>
            {/* <div className="item-tittle">
              <label className="form-label">Ok</label>
              <input
                type="checkbox"
                className="radio-input"
                {...register(`itemPcpVh60.${item.ok}`)}
                checked={watch(`itemPcpVh60.${item.ok}`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label">Retén</label>
              <input
                type="checkbox"
                className="radio-input"
                {...register(`itemPcpVh60.${item.reten}`)}
                checked={watch(`itemPcpVh60.${item.reten}`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label">Rodamiento</label>
              <input
                type="checkbox"
                className="radio-input"
                {...register(`itemPcpVh60.${item.rodamiento}`)}
                checked={watch(`itemPcpVh60.${item.rodamiento}`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label">Diámetro</label>
              <input
                type="checkbox"
                className="radio-input"
                {...register(`itemPcpVh60.${item.diametro}`)}
                checked={watch(`itemPcpVh60.${item.diametro}`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label">Deformado</label>
              <input
                type="checkbox"
                className="radio-input"
                {...register(`itemPcpVh60.${item.deformado}`)}
                checked={watch(`itemPcpVh60.${item.deformado}`)}
              />
            </div>
            <div className="item-tittle">
              <input
                className="form-input"
                {...register(`itemPcpVh60.${item.esp}`)}
                placeholder="Especificar"
              />
            </div> */}
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

export default UclInspeccionA;
