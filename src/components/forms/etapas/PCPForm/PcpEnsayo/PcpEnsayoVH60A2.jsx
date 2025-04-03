import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import "../PcpEnsayo.css";
import { useNavigate } from "react-router-dom";
import EnsayoService from "../../../../../services/EnsayoService";
import ensayoPCPVH60 from "../../../../../data/ensayoPCPVH60";

const PcpEnsayoVH60A = () => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: ensayoPCPVH60
  });
  const [fuerzas, setFuerzas] = useState({});
  
  // Usamos useWatch para observar los cambios en los inputs
  const formValues = useWatch({ control });

  const tipoEquipo = window.localStorage.getItem("tipoEquipo");
  const etapaActual = window.localStorage.getItem("etapaActual");
  const numeroOT = window.localStorage.getItem("numeroOT");
  const ordenId = window.localStorage.getItem("ordenId");

  const navigate = useNavigate();

  function calcularFuerza(Uout, Iout, RPM) {
    if (!Uout || !Iout || RPM === 0) return 0;
    return (7 * Uout * Iout) / RPM;
  }

  // Efecto para calcular fuerzas cuando cambian los valores
  useEffect(() => {
    if (!formValues?.itemEnsayo) return;
    
    const nuevasFuerzas = {};
    const rpmMap = { rpm200: 200, rpm300: 300, rpm400: 400, rpm500: 500 };
    
    Object.keys(rpmMap).forEach(key => {
      const item = formValues.itemEnsayo?.[key];
      if (item) {
        nuevasFuerzas[key] = calcularFuerza(
          parseFloat(item.voltajeSalida) || 0,
          parseFloat(item.corrienteSalida) || 0,
          rpmMap[key]
        );
      }
    });
    
    setFuerzas(nuevasFuerzas);
  }, [formValues]);

  const onSubmit = async (data) => {
    try {
      const ensayo = {
        ...data,
        fuerzasCalculadas: fuerzas
      };
      
      await EnsayoService.createEnsayo(ensayo);
      console.log("Datos enviados exitosamente:", ensayo);
      navigate("/dashboard/etapa/salidaPcp");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <form className="recepcion-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form-title">Ensayo PCP VH60 A</h3>

      {/* Campo para comentario */}
      <div className="form-group">
        <label className="form-label">Comentario</label>
        <input {...register("comentario")} placeholder="Comentario"/>
      </div>

      {/* Iterar sobre cada RPM */}
      {["rpm200", "rpm300", "rpm400", "rpm500"].map((itemKey) => (
        <div className="item-section" key={itemKey}>
          <div className="item-field">
            <div className="item-tittle">
              <h4 className="item-title">{itemKey}</h4>
            </div>
            <div className="item-tittle">
              <input
                className="form-input"
                {...register(`itemEnsayo.${itemKey}.currentF`)}
                placeholder="Current F"
                type="number"
                step="0.01"
              />
            </div>
            <div className="item-tittle">
              <input
                className="form-input"
                {...register(`itemEnsayo.${itemKey}.voltajeSalida`)}
                placeholder="Voltaje Salida"
                type="number"
                step="0.01"
              />
            </div>
            <div className="item-tittle">
              <input
                className="form-input"
                {...register(`itemEnsayo.${itemKey}.corrienteSalida`)}
                placeholder="Corriente Salida"
                type="number"
                step="0.01"
              />
            </div>
            {/* <div className="item-tittle">
              <input 
                className="form-input"
                {...register(`itemEnsayo.${itemKey}.torqueFrenado`)}
                placeholder="Torque Frenado"
                type="number"
                step="0.01"
                value={fuerzas[itemKey]?.toFixed(2) || "0.00"}
                readOnly
              />
            </div> */}
            <div className="item-tittle">
              <p className="torque">
                {fuerzas[itemKey]?.toFixed(2) || "0.00"} lbf
              </p>
            </div>
            <div className="item-tittle">
              <input
                className="form-input"
                {...register(`itemEnsayo.${itemKey}.temperaturaCarcazaC`)}
                placeholder="Temperatura Carcaza (°C)"
                type="number"
                step="0.1"
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

export default PcpEnsayoVH60A;