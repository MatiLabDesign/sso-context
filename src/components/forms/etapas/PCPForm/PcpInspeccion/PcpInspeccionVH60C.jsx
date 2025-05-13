import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
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

const PcpInspeccionVH60C = () => {
  const {
    handleSubmit,
    control,
    register,
    reset,
    watch,
    formState: { isDirty },
  } = useForm();

  const ordenId = window.localStorage.getItem("ordenId");

  const [imagenes, setImagenes] = useState([null, null, null]);
  const [urlsTemporales, setUrlsTemporales] = useState(Array(6).fill(null));

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
            navigate(`/dashboard/etapa/ensayo${tipoEquipoActual}`);
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

    const nuevasUrls = [...urlsTemporales];
    nuevasUrls[index] = URL.createObjectURL(file);
    setUrlsTemporales(nuevasUrls);
  };

  const handleImagenClick = (index, e) => {
    if (urlsTemporales[index]) {
      Swal.fire({
        title: `Imagen ${index + 1}`,
        imageUrl: urlsTemporales[index],
        imageHeight: 350,
        imageAlt: `Imagen ${index + 1}`,
        confirmButtonColor: "#059080",
      });
    }
    e.preventDefault();
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/dashboard/etapa/ensayoPCP`);
  };
  const handleClickA = (e) => {
    e.preventDefault();
    navigate(`/dashboard/etapa/inspeccionPCPVh60B`);
  };

  const sistemaHidraulicoPcpVh60 = [
    {
      ok: "bomOk",
      fuga: "bomFug",
      roto: "bomRot",
      eficiencia: "bomEf",
      esp: "bomEsp",
      label: "Bomba",
    },
    {
      ok: "manOk",
      fuga: "manFug",
      roto: "manRot",
      eficiencia: "manEf",
      esp: "manEsp",
      label: "Manifold",
    },
    {
      ok: "calOk",
      fuga: "calFug",
      roto: "calRot",
      eficiencia: "calEf",
      esp: "calEsp",
      label: "Cáliper",
    },
    {
      ok: "cmOk",
      fuga: "cmFug",
      roto: "cmRot",
      eficiencia: "cmEf",
      esp: "cmEsp",
      label: "Conjunto Mangueras",
    },
  ];

  const poleaPcpVh60 = [
    {
      ok: "bomOk",
      fisura: "alojRod",
      poros: "alojRet",
      diametroInad: "diam",
      numTraz: "def",
      esp: "esp",
      label: "Bomba",
    },
  ];

  // const onSubmit = async (data) => {
  //   try {
  //     const inspeccion = data;
  //     await InspeccionService.updateInspeccion(inspeccionId, inspeccion);
  //     console.log("Datos enviados exitosamente:", inspeccion);
  //     navigate("/dashboard/etapa/ensayoMiniGA");
  //   } catch (error) {
  //     console.error("Error al enviar los datos:", error);
  //   }
  // };

  return (
    <form className="recepcion-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form-title">Inspección VH60 C</h3>

      {/* Campo para comentario */}
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

      {/* Iterar sobre cada propiedad en sistemaHidraulicoPcpVh60 */}
      <h3>Items</h3>
      {sistemaHidraulicoPcpVh60.map((item) => (
        <div className="item-section" key={item.label}>
          <div className="item-tittle">
            <h4 className="item-title">{item.label}</h4>
          </div>
          <div className="item-tittle">
            <label className="form-label">Ok</label>
            <input
              type="checkbox"
              className="radio-input"
              {...register(`sistemaHidraulicoPcpVh60.${item.ok}`)}
              checked={watch(`sistemaHidraulicoPcpVh60.${item.ok}`)}
            />
          </div>
          <div className="item-tittle">
            <label className="form-label">Fugas</label>
            <input
              type="checkbox"
              className="radio-input"
              {...register(`sistemaHidraulicoPcpVh60.${item.fuga}`)}
              checked={watch(`sistemaHidraulicoPcpVh60.${item.fuga}`)}
            />
          </div>
          <div className="item-tittle">
            <label className="form-label">Roto</label>
            <input
              type="checkbox"
              className="radio-input"
              {...register(`sistemaHidraulicoPcpVh60.${item.roto}`)}
              checked={watch(`sistemaHidraulicoPcpVh60.${item.roto}`)}
            />
          </div>
          <div className="item-tittle">
            <label className="form-label">Eficiencia</label>
            <input
              type="checkbox"
              className="radio-input"
              {...register(`sistemaHidraulicoPcpVh60.${item.eficiencia}`)}
              checked={watch(`sistemaHidraulicoPcpVh60.${item.eficiencia}`)}
            />
          </div>
          <div className="item-tittle">
            <input
              className="form-input"
              {...register(`sistemaHidraulicoPcpVh60.${item.esp}`)}
              placeholder="Especificar"
            />
          </div>
        </div>
      ))}

      <h3>Polea</h3>
      {["polea"].map((itemKey) => (
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
                {...register(`poleaPcpVh60.${itemKey}.ok`)}
                checked={watch(`poleaPcpVh60.${itemKey}.ok`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Fisura</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`poleaPcpVh60.${itemKey}.fisura`)}
                checked={watch(`poleaPcpVh60.${itemKey}.fisura`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Poros</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`poleaPcpVh60.${itemKey}.poros`)}
                checked={watch(`poleaPcpVh60.${itemKey}.poros`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">D. Inadec.</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`poleaPcpVh60.${itemKey}.disenoInadecuado`)}
                checked={watch(`poleaPcpVh60.${itemKey}.disenoInadecuado`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">N° Trazab.</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`poleaPcpVh60.${itemKey}.numeroTrazabilidad`)}
                checked={watch(`poleaPcpVh60.${itemKey}.numeroTrazabilidad`)}
              />
            </div>

            <div className="item-tittle">
              <input
                className="form-input"
                {...register(`poleaPcpVh60.${itemKey}.especificar`)}
                placeholder="Especificar"
              />
            </div>
          </div>
        </div>
      ))}
      <div className="imagenes">
        {[0, 1, 2].map((index) => (
          <label key={index} className="imagen-prueba">
            {imagenes[index] ? (
              <img
                src={urlsTemporales[index]}
                alt={`Imagen ${index + 1}`}
                className="imagen-preview"
                onClick={(e) => handleImagenClick(index, e)}
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

export default PcpInspeccionVH60C;
