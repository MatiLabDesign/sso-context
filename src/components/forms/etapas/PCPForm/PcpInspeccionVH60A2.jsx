import React from "react";
import { useForm, Controller } from "react-hook-form";
// import axios from "axios";7
import "./PcpRecepcion2.css"; // Asegúrate de tener el archivo CSS
import RecepcionService from "../../../../services/InspeccionService";
import { useNavigate } from "react-router-dom";
import PcpInspeccion from './PcpInspeccion';
import PcpInspeccionVH60A from './PcpInspeccionVH60A';
import InspeccionService from "../../../../services/InspeccionService";

const PcpInspeccionVH60A2 = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      comentario: "",
      eliminado: false,
      itemInspeccionVH60A: {
        lubricanteBlock: { estado: undefined, requerimiento: "", observacion: "" },
        lubricanteSistemaDeFreno: { estado: undefined, requerimiento: "", observacion: "" },
        ejeMotriz: { estado: undefined, requerimiento: "", observacion: "" },
        blockDeCabezal: { estado: undefined, requerimiento: "", observacion: "" },
        placaInferior: { estado: undefined, requerimiento: "", observacion: "" },
        placaSuperior: { estado: undefined, requerimiento: "", observacion: "" },
        
      },
    },
  });

  const tipoEquipo = window.localStorage.getItem("tipoEquipo");
  const etapaActual = window.localStorage.getItem("etapaActual");
  const numeroOT = window.localStorage.getItem("numeroOT");

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const inspeccion = data;
      await InspeccionService.createInspeccion(inspeccion);
        
      console.log("Datos enviados exitosamente:", inspeccion);
      navigate("/dashboard/etapa/inspeccionPCPB");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <form className="recepcion-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form-title">Inspección A | {tipoEquipo} - OT N°{numeroOT}</h3>

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
      <h3>Lubricantes</h3>
      {[
        "lubricante Block",
        "lubricante Sist Freno",
        
      ].map((itemKey) => (
        <div className="item-section" key={itemKey}>
          <div className="item-field">
            <div className="item-tittle">
              <h4 className="item-title">{itemKey}</h4>
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Ok</label>
              <Controller
                name={`itemRecepcion.${itemKey}.estado`}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      className="radio-input"
                      type="radio"
                      value= "ok"
                      {...field}
                      checked={field.value === "ok"}
                      onChange={() => field.onChange("ok")}
                    />
                  </>
                )}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">PM</label>
              <Controller
                name={`itemRecepcion.${itemKey}.estado`}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      className="radio-input"
                      type="radio"
                      value= "pm"
                      {...field}
                      checked={field.value === "pm"}
                      onChange={() => field.onChange("pm")}
                    />
                  </>
                )}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Agua</label>
              <Controller
                name={`itemRecepcion.${itemKey}.estado`}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      className="radio-input"
                      type="radio"
                      value= "agua"
                      {...field}
                      checked={field.value === "agua"}
                      onChange={() => field.onChange("agua")}
                    />
                  </>
                )}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Sucio</label>
              <Controller
                name={`itemRecepcion.${itemKey}.estado`}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      className="radio-input"
                      type="radio"
                      value= "sucio"
                      {...field}
                      checked={field.value === "sucio"}
                      onChange={() => field.onChange("sucio")}
                    />
                  </>
                )}
              />
            </div>
            {/* <div className="item-tittle">
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
            </div> */}
            
            <div className="item-tittle">
              {/* <label className="form-label">Requerimiento</label> */}
              <Controller
                name={`itemRecepcion.${itemKey}.especificar`}
                control={control}
                render={({ field }) => (
                  <input
                    className="form-input"
                    {...field}
                    placeholder="Especificar"
                  />
                )}
              />
            </div>
            
          </div>
        </div>
      ))}

      <h3>Item</h3>
      {[
        "Eje Motriz",
        "Block de Cabezal",
        "Placa Inferior",
        "Placa Superior",
        
      ].map((itemKey) => (
        <div className="item-section" key={itemKey}>
          <div className="item-field">
            <div className="item-tittle">
              <h4 className="item-title">{itemKey}</h4>
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Ok</label>
              <Controller
                name={`itemRecepcion.${itemKey}.estado`}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      className="radio-input"
                      type="radio"
                      value= "ok"
                      {...field}
                      checked={field.value === "ok"}
                      onChange={() => field.onChange("ok")}
                    />
                  </>
                )}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label">Aloj.Rodam.</label>
              <Controller
                name={`itemRecepcion.${itemKey}.estado`}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      className="radio-input"
                      type="radio"
                      value= "arod"
                      {...field}
                      checked={field.value === "arod"}
                      onChange={() => field.onChange("arod")}
                    />
                  </>
                )}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label">Aloj.Retén</label>
              <Controller
                name={`itemRecepcion.${itemKey}.estado`}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      className="radio-input"
                      type="radio"
                      value= "aret"
                      {...field}
                      checked={field.value === "aret"}
                      onChange={() => field.onChange("aret")}
                    />
                  </>
                )}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label">Diámetro</label>
              <Controller
                name={`itemRecepcion.${itemKey}.estado`}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      className="radio-input"
                      type="radio"
                      value= "diametro"
                      {...field}
                      checked={field.value === "diametro"}
                      onChange={() => field.onChange("diametro")}
                    />
                  </>
                )}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label">Deformado</label>
              <Controller
                name={`itemRecepcion.${itemKey}.estado`}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      className="radio-input"
                      type="radio"
                      value= "deformado"
                      {...field}
                      checked={field.value === "deformado"}
                      onChange={() => field.onChange("deformado")}
                    />
                  </>
                )}
              />
            </div>
            {/* <div className="item-tittle">
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
            </div> */}
            
            {/* <div className="item-tittle">
              
              <Controller
                name={`itemRecepcion.${itemKey}.especificar`}
                control={control}
                render={({ field }) => (
                  <input
                    className="form-input"
                    {...field}
                    placeholder="Especificar"
                  />
                )}
              />
            </div> */}
            
          </div>
        </div>
      ))}

      <button type="submit" className="form-button">
        Guardar
      </button>
    </form>
  );
};

export default PcpInspeccionVH60A2;
