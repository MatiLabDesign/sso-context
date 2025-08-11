import { useForm } from "react-hook-form";
import "./PcpRecepcion2.css";
import { Link, useNavigate } from "react-router-dom";
import recepcionPCP from "../../../../data/recepcionPCP";
import { useEffect, useState } from "react";
import useOrdenData from "../../../../hooks/useOrdenData";
import useRecepcionData from "../../../../hooks/useRecepcionData";
import useInspeccionData from "../../../../hooks/useInspeccionData";
import Swal from "sweetalert2";
import { FaArrowRight } from "react-icons/fa";
import { IMAGEN } from "../../../../config/routes/paths";
import ImagenService from "../../../../services/ImagenService";
import inspeccionPcpDv1 from "./../../../../data/inspeccionPCPDv1";
import inspeccionPcpMiniG from "./../../../../data/inspeccionPCPminiG";
import inspeccionPcpCoguar from "./../../../../data/inspeccionPCPCougar";
import useImagenData from "../../../../hooks/useImagenData";
import { RECEPCION_ITEMS } from "../../../../constants/RECEPCION_ITEMS";

const PcpRecepcion = () => {
  
  const { register, handleSubmit, reset, watch, formState: { isDirty },
  } = useForm({ defaultValues: recepcionPCP });

  const ordenId = localStorage.getItem("ordenId");
  const tipoEquipo=localStorage.getItem("tipoEquipo");
  const modeloEquipo = localStorage.getItem("modeloEquipo");
  const [recepcionId, setRecepcionId] = useState(null);
  const [inspeccionId, setInspeccionId] = useState(null);
  const [tipoInspeccion, setTipoInspeccion] = useState(null);
  
  
  const navigate = useNavigate();

  //  CUSTOM HOOKS
  const { allOts, otActual, updateOt } = useOrdenData(ordenId);

  const { recepcionActual, loading: recepcionLoading, error: recepcionError,
  createRecepcion, updateRecepcion
  } = useRecepcionData(recepcionId, reset);

  const { newInspeccion } = useInspeccionData(inspeccionId);

  const { newImagen } = useImagenData();

  // IMAGENES----------------------<<<<<<<<<

  const [imagenes, setImagenes] = useState(Array(6).fill(null));
  const [urlsTemporales, setUrlsTemporales] = useState(Array(6).fill(null));

  const [imagenesGuardadas, setImagenesGuardadas] = useState([]);

  const recepcionIdGuardada = localStorage.getItem("recepcionId");
  console.log(recepcionIdGuardada);

  useEffect(() => {
    const fetchImagenes = async () => {
      // Solo ejecutar si existe un ID de recepción
      if (!recepcionIdGuardada) return;

      try {
        const response = await ImagenService.getImagenByRecepcionId(
          recepcionIdGuardada
        );
        if (response.data) {
          setImagenesGuardadas(response.data);
          console.log(imagenesGuardadas);
        }
      } catch (error) {
        setError("Error al obtener las imágenes de la recepción");
        console.error("Error al obtener las imágenes:", error);
      }
    };

    fetchImagenes();
  }, [recepcionIdGuardada]);

  // Si quieres ver el valor actualizado de imagenesGuardadas, muévelo a otro useEffect
  useEffect(() => {
    console.log(imagenesGuardadas);
  }, [imagenesGuardadas]);

  

  useEffect(() => {
    if (otActual?.recepcion?.id) {
      setRecepcionId(otActual.recepcion.id);
    }
  }, [otActual]);

  useEffect(() => {
    if (
      otActual?.inspeccionPcpVh60?.id ||
      otActual?.inspeccionPcpDV1?.id ||
      otActual?.inspeccionPcpMiniG?.id ||
      otActual?.inspeccionPcpCoguar?.id
    ) {
      setInspeccionId(
        otActual?.inspeccionPcpVh60?.id ||
          otActual?.inspeccionPcpDV1?.id ||
          otActual?.inspeccionPcpMiniG?.id ||
          otActual?.inspeccionPcpCoguar?.id
      );
    }
  }, [otActual]);

  useEffect(() => {
  
    setTipoInspeccion(`${tipoEquipo}${modeloEquipo}`);
}, [otActual]);

  

  const etapaSiguiente = 3;
  const etapaInspeccion = 4;

  const handleImagenChange = (index, file) => {
    const nuevasImagenes = [...imagenes];
    nuevasImagenes[index] = file;
    setImagenes(nuevasImagenes);

    const nuevasUrls = [...urlsTemporales];
    nuevasUrls[index] = URL.createObjectURL(file);
    setUrlsTemporales(nuevasUrls);
  };

  const handleImagenClick = (index, e) => {
    e.preventDefault();

    localStorage.setItem("recepcionId", recepcionId);
    localStorage.setItem("imagenIndex", index);

    // Obtener descripción si existe en imagenesGuardadas
    const descripcion =
      imagenesGuardadas[index]?.descripcion || "Imagen sin descripción";

    const imagenSrc = obtenerSrcImagen(index);
    if (imagenSrc) {
      Swal.fire({
        title: descripcion,
        imageUrl: imagenSrc,
        imageHeight: 350,
        imageAlt: `Imagen ${index + 1}`,
        confirmButtonColor: "#eb7302",
        cancelButtonColor: "#059080",
        showCancelButton: true,
        confirmButtonText: "Editar",
        cancelButtonText: "Cerrar",
        // footer: '¿Quieres editar esta imagen?'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard/imagen-update-form");
        }
      });
    } else {
      navigate("/dashboard/imagen-form");
    }
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
        

          if (!inspeccionId) {
            // Solo crear si NO hay una inspección existente
            const nuevaInspeccion = await newInspeccion(data, modeloEquipo);
            const nuevaInspeccionId = nuevaInspeccion?.id;

            if (nuevaInspeccionId) {
              const updatedOt = {
                ...otActual,
                inspeccionPcpVh60: { id: nuevaInspeccionId },
                etapaActual: etapaSiguiente,
              };

              await updateOt(ordenId, updatedOt);
              localStorage.setItem("Tipo Inspección", tipoInspeccion);
              console.log("localstore = tipoInspeccion guardado");

              await Swal.fire({
                title: "Perfecto!",
                text: "Inspección creada con éxito",
                icon: "success",
                confirmButtonColor: "#059080",
              });
            }
          }

          if (modeloEquipoActual && tipoEquipoActual) {
            navigate(
              `/dashboard/etapa/inspeccion${tipoEquipoActual}${modeloEquipoActual}A`
            );
          }
        }
      } else {
        //Tengo que ver si saco el CREATERECEPCION
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

  const dataImagen = () => {
    localStorage.setItem("recepcionId", recepcionId);
    navigate(IMAGEN);
  };

  const obtenerSrcImagen = (index) => {
    if (urlsTemporales[index]) {
      return urlsTemporales[index];
    }

    const imagenGuardada = imagenesGuardadas[index];

    if (imagenGuardada?.url) {
      const base = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
      // Asegurarse de que la URL comience con '/' si no es absoluta
      const cleanUrl = imagenGuardada.url.startsWith("/")
        ? imagenGuardada.url
        : `/${imagenGuardada.url}`;

      return `${base}${cleanUrl}`;
    }

    return null;
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
        {RECEPCION_ITEMS.map(({ estado, requerimiento, observacion, label }) => (
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

      <div className="imagenes">
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
      </div>
    </form>
  );
};

export default PcpRecepcion;
