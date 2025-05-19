import { useForm } from "react-hook-form";
import "./PcpRecepcion2.css";
import { Link, useNavigate } from "react-router-dom";
import recepcionPCP from "../../../../data/recepcionPCP";
import { useEffect, useState } from "react";
import useOrdenData from "../../../../hooks/useOrdenData";
import useRecepcionData from "../../../../hooks/useRecepcionData";
import Swal from "sweetalert2";
import { FaArrowRight } from "react-icons/fa";


const PcpRecepcion = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty },
  } = useForm({
    defaultValues: recepcionPCP,
  });

  const [imagenes, setImagenes] = useState([null, null, null, null, null, null]);
  const [urlsTemporales, setUrlsTemporales] = useState(Array(6).fill(null));

  const ordenId = localStorage.getItem("ordenId");
  const navigate = useNavigate();
  const { allOts, otActual, updateOt } = useOrdenData(ordenId);
  const [recepcionId, setRecepcionId] = useState(null);

  useEffect(() => {
    if (otActual?.recepcion?.id) {
      setRecepcionId(otActual.recepcion.id);
    }
  }, [otActual]);

  const {
    recepcionActual,
    loading: recepcionLoading,
    error: recepcionError,
    createRecepcion,
    updateRecepcion,
  } = useRecepcionData(recepcionId, reset);

  const etapaSiguiente = 3;

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

  const onSubmit = async (data) => {
    try {
      if (!isDirty) {
        Swal.fire({
          title: "Sin cambios",
          text: "No se detectaron modificaciones para guardar.",
          icon: "info",
          confirmButtonColor: "#059080",
        });
        return;
      }

      const modeloEquipoActual = otActual?.equipo?.tipoEquipo?.modelo;
      const tipoEquipoActual = otActual?.equipo?.tipoEquipo?.tipo;

      if (recepcionId) {
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
          await updateRecepcion(recepcionId, data);

          if (modeloEquipoActual && tipoEquipoActual) {
            navigate(
              `/dashboard/etapa/inspeccion${tipoEquipoActual}${modeloEquipoActual}A`
            );
          }
        }
      } else {
        const nuevaRecepcion = await createRecepcion(data);
        const nuevaRecepcionId = nuevaRecepcion?.id;

        if (nuevaRecepcionId) {
          const updatedOt = {
            ...otActual,
            recepcion: { id: nuevaRecepcionId },
            etapaActual: etapaSiguiente,
          };

          await updateOt(ordenId, updatedOt);

          await Swal.fire({
            title: "Perfecto!",
            text: "Recepción creada con éxito",
            icon: "success",
            confirmButtonColor: "#059080",
          });

          if (modeloEquipoActual && tipoEquipoActual) {
            navigate(
              `/dashboard/etapa/inspeccion${tipoEquipoActual}${modeloEquipoActual}A`
            );
          }
        }
      }
    } catch (error) {
      console.error("❌ Error al procesar la recepción:", error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/dashboard/etapa/inspeccionPCPVh60A`);
  };

  return (
    <form className="recepcion-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form-title">Recepción PCP</h3>

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
        {[
          ["cgestado", "cgrequerimiento", "cgobservacion", "Cubre Grampa"],
          ["cvestado", "cvrequerimiento", "cvobservacion", "Cubre Polea"],
          ["gaestado", "garequerimiento", "gaobservacion", "Grampa Anti Eyección"],
          ["ecestado", "ecrequerimiento", "ecobservacion", "Estructura Chasis"],
          ["lsestado", "lsrequerimiento", "lsobservacion", "Linterna Separador"],
          ["mmestado", "mmrequerimiento", "mmobservacion", "Mesa de Motor"],
          ["rmestado", "rmrequerimiento", "rmobservacion", "Rieles de Motor"],
          ["stestado", "strequerimiento", "stobservacion", "Soporte de Transporte"],
          ["pcestado", "pcrequerimiento", "pcobservacion", "Polea Conducida"],
        ].map(([estadoKey, reqKey, obsKey, label]) => (
          <div className="item-section" key={estadoKey}>
            <div className="item-field">
              <div className="item-tittle">
                <h4 className="item-title">{label}</h4>
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Ok</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`itemRecepcion.${estadoKey}`)}
                  checked={watch(`itemRecepcion.${estadoKey}`)}
                />
              </div>
              <div className="item-tittle">
                <input
                  className="form-input"
                  {...register(`itemRecepcion.${reqKey}`)}
                  placeholder="Requerimiento"
                />
              </div>
              <div className="item-tittle">
                <input
                  className="form-input"
                  {...register(`itemRecepcion.${obsKey}`)}
                  placeholder="Observación"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="imagenes">
        {[0, 1, 2, 3, 4, 5].map((index) => (
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

export default PcpRecepcion;


