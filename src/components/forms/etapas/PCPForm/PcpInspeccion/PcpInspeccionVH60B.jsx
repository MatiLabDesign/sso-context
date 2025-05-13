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
  const {
    handleSubmit,
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
    navigate(`/dashboard/etapa/inspeccionPCPVh60C`);
  };
  const handleClickA = (e) => {
    e.preventDefault();
    navigate(`/dashboard/etapa/inspeccionPCPVh60A`);
  };

  const rodamientos = [
    {
      ok: "axOk",
      picado: "axPic",
      laminado: "axLam",
      fallaEnJaula: "axFj",
      desgaste: "axDesg",
      esp: "axEsp",
      label: "Axial 294158",
    },
    {
      ok: "gsOk",
      picado: "gsPic",
      laminado: "guiaSup6022.laminado",
      fallaEnJaula: "gsFj",
      desgaste: "gsDesg",
      esp: "gsEsp",
      label: "Guía Superior 6022",
    },
    {
      ok: "giOk",
      picado: "giPic",
      laminado: "giLam",
      fallaEnJaula: "giFj",
      desgaste: "giDesg",
      esp: "giEsp",
      label: "Guía Inferior 6017",
    },
    {
      ok: "frOk",
      picado: "frPic",
      laminado: "frLam",
      fallaEnJaula: "frFj",
      desgaste: "frDesg",
      esp: "frEsp",
      label: "Freno 6005-1RS-Z",
    },
    {
      ok: "arOk",
      picado: "arPic",
      laminado: "arLamo",
      fallaEnJaula: "arFj",
      desgaste: "arDesg",
      esp: "arEsp",
      label: "Antirretorno CSK25-PP-C3",
    },
  ];

  const transmision = [
    {
      ok: "corOk",
      picado: "corPic",
      desgastado: "corDesg",
      roto: "corRot",
      esp: "corEsp",
      label: "Corona",
    },
    {
      ok: "pinOk",
      picado: "pinPic",
      desgastado: "piDesg",
      roto: "pinRot",
      esp: "pinEsp",
      label: "Piñón",
    },
    {
      ok: "pfOk",
      picado: "pfPic",
      desgastado: "pfDesg",
      roto: "pfRot",
      esp: "pfEsp",
      label: "Pastillas de Freno",
    },
  ];

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
        {rodamientos.map((item, index) => (
          <div className="item-section" key={index}>
            <div className="item-field">
              <div className="item-tittle">
                <h4 className="item-title">{item.label}</h4>
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Ok</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`rodamientoPcpVh60.${item.ok}`)}
                  checked={watch(`rodamientoPcpVh60.${item.ok}`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Picado</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`rodamientoPcpVh60.${item.picado}`)}
                  checked={watch(`rodamientoPcpVh60.${item.picado}`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Laminado</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`rodamientoPcpVh60.${item.laminado}`)}
                  checked={watch(`rodamientoPcpVh60.${item.laminado}`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">F.jaula</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`rodamientoPcpVh60.${item.fallaEnJaula}`)}
                  checked={watch(`rodamientoPcpVh60.${item.fallaEnJaula}`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Desgaste</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`rodamientoPcpVh60.${item.desgaste}`)}
                  checked={watch(`rodamientoPcpVh60.${item.desgaste}`)}
                />
              </div>
              <div className="item-tittle">
                <input
                  className="form-input"
                  {...register(`rodamientoPcpVh60.${item.esp}`)}
                  placeholder="Especificar"
                />
              </div>
            </div>
          </div>
        ))}

        <h3>Transmisión freno</h3>
        {transmision.map((item, index) => (
          <div className="item-section" key={index}>
            <div className="item-field">
              <div className="item-tittle">
                <h4 className="item-title">{item.label}</h4>
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Ok</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`transmisionFrenoPcpVh60.${item.ok}`)}
                  checked={watch(`transmisionFrenoPcpVh60.${item.ok}`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Picado</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`transmisionFrenoPcpVh60.${item.picado}`)}
                  checked={watch(`transmisionFrenoPcpVh60.${item.picado}`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Desgaste</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`transmisionFrenoPcpVh60.${item.desgastado}`)}
                  checked={watch(`transmisionFrenoPcpVh60.${item.desgastado}`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Roto</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`transmisionFrenoPcpVh60.${item.roto}`)}
                  checked={watch(`transmisionFrenoPcpVh60.${item.roto}`)}
                />
              </div>
              <div className="item-tittle">
                <input
                  className="form-input"
                  {...register(`transmisionFrenoPcpVh60.${item.esp}`)}
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

export default PcpInspeccionVH60B;
