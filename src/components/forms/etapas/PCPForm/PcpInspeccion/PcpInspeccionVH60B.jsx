import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../PcpRecepcion2.css"; // Asegúrate de tener el archivo CSS
import { useNavigate, Link } from "react-router-dom";
import InspeccionService from "../../../../../services/InspeccionService";
import useOrdenData from "../../../../../hooks/useOrdenData";
import useInspeccionData from "../../../../../hooks/useInspeccionData";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";

const PcpInspeccionVH60B = () => {
  const { handleSubmit, register, reset, watch, formState: { isDirty }, } = useForm();

  const ordenId = window.localStorage.getItem("ordenId");

  const [imagenes, setImagenes] = useState([null, null, null]);

  const navigate = useNavigate();
  console.log(ordenId);

  const { allOts, otActual, updateOt, loading, error } = useOrdenData(ordenId);

  useEffect(() => {
    if (otActual) {
      console.log("✅ Datos recibidos:", otActual);

      if (otActual.inspeccionPcpVh60 && otActual.inspeccionPcpVh60.id) {
        setInspecionId(otActual.inspeccionPcpVh60.id);
      } else {
        console.warn(
          "⚠️ Advertencia: `otActual.inspeccionPcpVh60` no tiene un ID válido."
        );
        setInspecionId(null); // Limpia el estado para evitar errores posteriores
      }
    }
  }, [otActual]);

  const [inspeccionId, setInspecionId] = useState(null);

  useEffect(() => {
    if (inspeccionId) {
      console.log("✅ Este es el id de Inspección:", inspeccionId);
    }
  }, [inspeccionId]);

  const { inspeccionActual, createInspeccion, updateInspeccion } =
    useInspeccionData(inspeccionId, reset);

  useEffect(() => {
    if (inspeccionActual) {
      console.log("✅ Datos Inspección actual:", inspeccionActual);
    }
  }, [inspeccionActual]);

  const onSubmit = async (data) => {
    try {
      if (!isDirty) {
        await Swal.fire({
          title: "Sin cambios",
          text: "No se detectaron modificaciones para guardar.",
          icon: "info",
          confirmButtonColor: "#059080",
        });
        return;
      }
  
      const modeloEquipoActual = otActual?.equipo?.tipoEquipo?.modelo;
      const tipoEquipoActual = otActual?.equipo?.tipoEquipo?.tipo;
  
      if (inspeccionId) {
        console.log("Inspección existente:", inspeccionId);
  
        const result = await Swal.fire({
          title: "¿Quiere guardar los datos?",
          text: "Los cambios son irreversibles",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#059080",
          cancelButtonColor: "#f09898",
          confirmButtonText: "Sí, guardar!",
          cancelButtonText: "Cancelar",
        });
  
        if (result.isConfirmed) {
          await updateInspeccion(inspeccionId, data);
          console.log("✅ Inspección actualizada correctamente:", data);
  
          if (modeloEquipoActual && tipoEquipoActual) {
            navigate(
              `/dashboard/etapa/inspeccion${tipoEquipoActual}${modeloEquipoActual}C`
            );
          } else {
            console.error("❌ Error: Modelo de equipo no definido.");
          }
        } else {
          console.log("❌ Acción cancelada por el usuario.");
        }
      } else {
        console.log("🚀 La inspección no existe...");
      }
    } catch (error) {
      console.error("❌ Error al procesar la inspección:", error);
    }
  };

  const handleImagenChange = (index, file) => {
    const nuevasImagenes = [...imagenes];
    nuevasImagenes[index] = file;
    setImagenes(nuevasImagenes);
  };
  
  

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/dashboard/etapa/inspeccionPCPVh60C`);
  };
  const handleClickA = (e) => {
    e.preventDefault();
    navigate(`/dashboard/etapa/inspeccionPCPVh60A`);
  };

  return (
    <form className="recepcion-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form-title">Inspección VH60 B</h3>

      <div className="form-group">
        <div className="label-input">
          <label className="form-label">Comentario</label>
          <input {...register("comentario")} placeholder="Comentario" />
        </div>
        <button type="button" className="form-button-2">
          <Link onClick={handleClickA}>
            <FaArrowLeft />
          </Link>
        </button>
        <button type="button" className="form-button-2">
          <Link onClick={handleClick}>
            <FaArrowRight />
          </Link>
        </button>
        <button type="submit" className="form-button">
          Guardar
        </button>
      </div>
      <div className="lista-container">
        <h3>Rodamientos</h3>
        {[
          "axial294158",
          "guiaSup6022",
          "guiaInf6017",
          "freno60051rsZ",
          "antirretornoCsk25PpC3",
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
                  {...register(`rodamientoPcpVh60.${itemKey}.ok`)}
                  checked={watch(`rodamientoPcpVh60.${itemKey}.ok`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Picado</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`rodamientoPcpVh60.${itemKey}.picado`)}
                  checked={watch(`rodamientoPcpVh60.${itemKey}.picado`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Laminado</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`rodamientoPcpVh60.${itemKey}.laminado`)}
                  checked={watch(`rodamientoPcpVh60.${itemKey}.laminado`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">F.jaula</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`rodamientoPcpVh60.${itemKey}.fallaEnJaula`)}
                  checked={watch(`rodamientoPcpVh60.${itemKey}.fallaEnJaula`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Desgaste</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`rodamientoPcpVh60.${itemKey}.desgaste`)}
                  checked={watch(`rodamientoPcpVh60.${itemKey}.desgaste`)}
                />
              </div>
              <div className="item-tittle">
                <input
                  className="form-input"
                  {...register(`rodamientoPcpVh60.${itemKey}.especificar`)}
                  placeholder="Especificar"
                />
              </div>
            </div>
          </div>
        ))}

        <h3>Transmisión freno</h3>
        {["corona", "pinion", "pastillasFreno"].map((itemKey) => (
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
                  {...register(`transmisionFrenoPcpVh60.${itemKey}.ok`)}
                  checked={watch(`transmisionFrenoPcpVh60.${itemKey}.ok`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Picado</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`transmisionFrenoPcpVh60.${itemKey}.picado`)}
                  checked={watch(`transmisionFrenoPcpVh60.${itemKey}.picado`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Desgaste</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`transmisionFrenoPcpVh60.${itemKey}.desgastado`)}
                  checked={watch(
                    `transmisionFrenoPcpVh60.${itemKey}.desgastado`
                  )}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Roto</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`transmisionFrenoPcpVh60.${itemKey}.roto`)}
                  checked={watch(`transmisionFrenoPcpVh60.${itemKey}.roto`)}
                />
              </div>
              <div className="item-tittle">
                <input
                  className="form-input"
                  {...register(
                    `transmisionFrenoPcpVh60.${itemKey}.especificar`
                  )}
                  placeholder="Especificar"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="imagenes">
        {[0, 1, 2].map((index) => (
          <label key={index} className="imagen-prueba">
            {imagenes[index] ? (
              <img
                src={URL.createObjectURL(imagenes[index])}
                alt={`Imagen ${index + 1}`}
                className="imagen-preview"
              />
            ) : (
              "+"
            )}
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleImagenChange(index, e.target.files[0])}
            />
          </label>
        ))}
      </div>
    </form>
  );
};

export default PcpInspeccionVH60B;
