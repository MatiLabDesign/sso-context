import React from 'react';
import { useForm } from 'react-hook-form';
import "../PcpInspeccion.css";
import "../PcpRecepcion2.css";
import { useNavigate } from 'react-router-dom';
import inspeccionPcpDv1 from './../../../../../data/inspeccionPCPDv1';

const PcpInspeccionDv1A = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: inspeccionPcpDv1
  });

  const tipoEquipo = window.localStorage.getItem("tipoEquipo");
  const etapaActual = window.localStorage.getItem("etapaActual");
  const numeroOT = window.localStorage.getItem("numeroOT");

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const inspeccion = data;
      // await InspeccionService.createInspeccion(inspeccion);

      console.log("Datos enviados exitosamente:", inspeccion);
      navigate("/dashboard/etapa/inspeccionPCPDv1B");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <form className="recepcion-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form-title">
        {/* Inspección A | {tipoEquipo} - OT N°{numeroOT} */}
        Inspección Dv1 A
      </h3>

      {/* Campo para comentario */}
      <div className="form-group">
        <label className="form-label">Comentario</label>
        <input {...register("comentario")} placeholder="Comentario" />
      </div>

      {/* Iterar sobre cada propiedad en itemRecepcion */}
      <h3>Lubricantes</h3>

      {/* //modificar nombre de acuerdo al Json */}
      {["lubBlockPortaRod"].map(
        (itemKey) => (
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
                  {...register(`lubricantePcpVh60.${itemKey}.ok`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">PM</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(
                    `lubricantePcpVh60.${itemKey}.particulasMetalicas`
                  )}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Agua</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`lubricantePcpVh60.${itemKey}.agua`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Sucio</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`lubricantePcpVh60.${itemKey}.sucio`)}
                />
              </div>

              <div className="item-tittle">
                <input
                  className="form-input"
                  {...register(`lubricantePcpVh60.${itemKey}.especificar`)}
                  placeholder="Especificar"
                />
              </div>
            </div>
          </div>
        )
      )}

      <h3>Item</h3>
      {["ejeMotriz", "blockCabezal", "placaInferior"].map(
        (itemKey) => (
          <div className="item-section" key={itemKey}>
            <div className="item-tittle">
              <h4 className="item-title">{itemKey}</h4>
            </div>
            <div className="item-tittle">
              <label className="form-label">Ok</label>
              <input
                type="checkbox"
                name="check aceite"
                className="radio-input"
                {...register(`itemPcpVh60.${itemKey}.ok`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label">Retén</label>
              <input
                type="checkbox"
                name="check aceite"
                className="radio-input"
                {...register(`itemPcpVh60.${itemKey}.alojamientoReten`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label">Rodamiento</label>
              <input
                type="checkbox"
                name="check aceite"
                className="radio-input"
                {...register(`itemPcpVh60.${itemKey}.alojamientoRodamiento`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label">Diametro</label>
              <input
                type="checkbox"
                name="check aceite"
                className="radio-input"
                {...register(`itemPcpVh60.${itemKey}.diametro`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label">Deformado</label>
              <input
                type="checkbox"
                name="check aceite"
                className="radio-input"
                {...register(`itemPcpVh60.${itemKey}.deformado`)}
              />
            </div>

            <div className="item-tittle">
              <input
                className="form-input"
                {...register(`itemPcpVh60.${itemKey}.especificar`)}
                placeholder="Especificar"
              />
            </div>
          </div>
        )
      )}

      <button type="submit" className="form-button">
        Guardar
      </button>
    </form>
  );
};

export default PcpInspeccionDv1A;