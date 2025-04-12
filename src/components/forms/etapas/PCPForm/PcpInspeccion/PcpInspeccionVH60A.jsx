import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../PcpRecepcion2.css"; // Asegúrate de tener el archivo CSS
import { useNavigate, Link } from "react-router-dom";
import InspeccionService from "../../../../../services/InspeccionService";
import inspeccionPCPVH60 from "../../../../../data/inspeccionPCPVH60";
import useOrdenData from "../../../../../hooks/useOrdenData";
import useInspeccionData from "../../../../../hooks/useInspeccionData";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";

const PcpInspeccionVH60A = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty },
  } = useForm({
    defaultValues: inspeccionPCPVH60,
  });

  const ordenId = localStorage.getItem("ordenId");
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

  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //XXXXXXXXXXXX   N° DE ETAPA OT  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  const etapasXXX = {
    1: "Ingreso",
    2: "Recepcion",
    3: "Inspeccion A",
    4: "Inspeccion B",
    5: "Inspeccion C",
    6: "Ensayo A",
    7: "Ensayo B",
    8: "Salida",
  };
  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxXXXXXXXXXXXXXXXXXXX
  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxXXXXXXXXXXXXXXXXXXX
  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxXXXXXXXXXXXXXXXXXXX
  const handleImagenChange = (index, file) => {
    const nuevasImagenes = [...imagenes];
    nuevasImagenes[index] = file;
    setImagenes(nuevasImagenes);
  };
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
              `/dashboard/etapa/inspeccion${tipoEquipoActual}${modeloEquipoActual}B`
            );
          } else {
            console.error("❌ Error: Modelo de equipo no definido.");
          }
        } else {
          console.log("❌ Acción cancelada por el usuario.");
        }
      } else {
        console.log("🚀 Creando nueva inspección...");

        const nuevaInspeccion = await createInspeccion(data);
        console.log("✅ Nueva inspección creada:", nuevaInspeccion);

        const nuevaInspeccionId = nuevaInspeccion?.id;
        if (nuevaInspeccionId) {
          console.log("🔄 Actualizando OT con ID de nueva inspección...");

          const updatedOt = {
            ...otActual,
            inspeccionPcpVh60: { id: nuevaInspeccionId },
          };
          await Swal.fire({
            title: "Perfecto!",
            text: "Inspección creada con éxito",
            icon: "success",
            confirmButtonColor: "#059080",
          });

          console.log("🔍 JSON enviado a la API:", updatedOt);

          await updateOt(ordenId, updatedOt);

          console.log("✅ OT actualizada con éxito.");

          if (modeloEquipoActual && tipoEquipoActual) {
            navigate(
              `/dashboard/etapa/inspeccion${tipoEquipoActual}${modeloEquipoActual}B`
            );
          } else {
            console.error("❌ Error: Modelo de equipo no definido.");
          }
        } else {
          console.error(
            "❌ Error: No se pudo obtener el ID de la nueva inspección."
          );
          return;
        }
      }
    } catch (error) {
      console.error("❌ Error al procesar la inspección:", error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/dashboard/etapa/inspeccionPCPVh60B`);
  };

  const handleClickA = (e) => {
    e.preventDefault();
    navigate(`/dashboard/etapa/recepcionPCP`);
  };

  return (
    <form className="recepcion-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form-title">Inspección VH60 A</h3>

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
        <h3>Lubricantes</h3>
        {["lubricanteBlockPortaRodamientos", "lubricanteSistemaFreno"].map(
          (itemKey) => (
            <div className="item-section" key={itemKey}>
              <div className="item-field">
                <div className="item-tittle">
                  <h4 className="item-title2">{itemKey}</h4>
                </div>
                <div className="item-tittle">
                  <label className="form-label-1">Ok</label>
                  <input
                    className="radio-input"
                    type="checkbox"
                    {...register(`lubricantePcpVh60.${itemKey}.ok`)}
                    checked={watch(`lubricantePcpVh60.${itemKey}.ok`)}
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
                    checked={watch(
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
                    checked={watch(`lubricantePcpVh60.${itemKey}.agua`)}
                  />
                </div>
                <div className="item-tittle">
                  <label className="form-label-1">Sucio</label>
                  <input
                    className="radio-input"
                    type="checkbox"
                    {...register(`lubricantePcpVh60.${itemKey}.sucio`)}
                    checked={watch(`lubricantePcpVh60.${itemKey}.sucio`)}
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
        {["ejeMotriz", "blockCabezal", "placaInferior", "placaSuperior"].map(
          (itemKey) => (
            <div className="item-section" key={itemKey}>
              <div className="item-tittle">
                <h4 className="item-title">{itemKey}</h4>
              </div>
              <div className="item-tittle">
                <label className="form-label">Ok</label>
                <input
                  type="checkbox"
                  className="radio-input"
                  {...register(`itemPcpVh60.${itemKey}.ok`)}
                  checked={watch(`itemPcpVh60.${itemKey}.ok`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label">Retén</label>
                <input
                  type="checkbox"
                  className="radio-input"
                  {...register(`itemPcpVh60.${itemKey}.alojamientoReten`)}
                  checked={watch(`itemPcpVh60.${itemKey}.alojamientoReten`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label">Rodamiento</label>
                <input
                  type="checkbox"
                  className="radio-input"
                  {...register(`itemPcpVh60.${itemKey}.alojamientoRodamiento`)}
                  checked={watch(
                    `itemPcpVh60.${itemKey}.alojamientoRodamiento`
                  )}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label">Diametro</label>
                <input
                  type="checkbox"
                  className="radio-input"
                  {...register(`itemPcpVh60.${itemKey}.diametro`)}
                  checked={watch(`itemPcpVh60.${itemKey}.diametro`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label">Deformado</label>
                <input
                  type="checkbox"
                  className="radio-input"
                  {...register(`itemPcpVh60.${itemKey}.deformado`)}
                  checked={watch(`itemPcpVh60.${itemKey}.deformado`)}
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
      </div>
      <div className="imagenes">
        {[0, 1, 2, 3, 4, 5].map((index) => (
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

export default PcpInspeccionVH60A;
