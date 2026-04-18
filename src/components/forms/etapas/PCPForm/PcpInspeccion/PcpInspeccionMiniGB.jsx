import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../PcpRecepcion2.css";
import { useNavigate, Link } from "react-router-dom";
import useOrdenData from "../../../../../hooks/useOrdenData";
import useInspeccionData from "../../../../../hooks/useInspeccionData";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import ImagenService from "../../../../../services/ImagenService";
import { IMAGEN_INSPECCION } from "../../../../../config/routes/paths";
import inspeccionPcpMiniG from "../../../../../data/inspeccionPCPminiG";
import { INSPECCION_PCPMINIGB_ITEMS } from "../../../../../constants/INSPECCION_PCPMINIG_ITEMS";

const PcpInspeccionMiniGB = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty },
  } = useForm({
    defaultValues: inspeccionPcpMiniG,
  });

  const azul = INSPECCION_PCPMINIGB_ITEMS

  const [imagenes, setImagenes] = useState(Array(6).fill(null));
  const [urlsTemporales, setUrlsTemporales] = useState(Array(6).fill(null));

  const [imagenesGuardadas, setImagenesGuardadas] = useState([]);
  const ordenId = localStorage.getItem("ordenId");
  const recepcionId = localStorage.getItem("recepcionId");
  const tipoEquipo = localStorage.getItem("tipoEquipo");
  const modeloEquipo = localStorage.getItem("modelo");
   const inspeccionId = localStorage.getItem("inspeccionId");

  //Logica para ver el tipo y el modelo del equipo>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const inspeccionIdGuardada = inspeccionId;

  console.log(inspeccionIdGuardada);
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  useEffect(() => {
  const fetchImagenes = async () => {
    if (!inspeccionId) return; // usar el ID real

    try {
      const response = await ImagenService.getImagenByInspeccionMiniGId(inspeccionId);
      setImagenesGuardadas(response.data || []); // si no hay datos, usar array vacío
    } catch (error) {
      console.error("Error al obtener las imágenes:", error);
    }
  };

  fetchImagenes();
}, [inspeccionId]);

  // Si quieres ver el valor actualizado de imagenesGuardadas, muévelo a otro useEffect
  useEffect(() => {
    console.log(imagenesGuardadas);
  }, [imagenesGuardadas]);

  

  const navigate = useNavigate();

  console.log(ordenId);

  const { allOts, otActual, updateOt, loading, error } = useOrdenData(ordenId);

  useEffect(() => {
    if (otActual) {
      console.log("✅ Datos recibidos:", otActual);

      if (otActual.inspeccionPcpMiniG && otActual.inspeccionPcpMiniG.id) {
        
      } else {
        console.warn(
          "⚠️ Advertencia: `otActual.inspeccionPcpMiniG` no tiene un ID válido."
        );
        //setInspecionId(null); // Limpia el estado para evitar errores posteriores
      }
    }
  }, [otActual]);
    
 
  // const [inspeccionId, setInspecionId] = useState(null);>REVISAR>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  useEffect(() => {
    if (inspeccionId) {
      console.log("✅ Este es el id de Inspección:", inspeccionId);
    }
  }, [inspeccionId]);

  const { inspeccionActual, updateInspeccion, updateInspeccionMinig } = useInspeccionData(inspeccionId, reset);

  useEffect(() => {
    if (inspeccionActual) {
      console.log("✅ Datos Inspección actual:", inspeccionActual);
    }
  }, [inspeccionActual]);

  const etapaSiguiente = 4;

  const handleImagenChange = (index, file) => {
    const nuevasImagenes = [...imagenesGuardadas];
    nuevasImagenes[index] = file;
    setImagenesGuardadas(nuevasImagenes);

    const nuevasUrls = [...urlsTemporales];
    nuevasUrls[index] = URL.createObjectURL(file);
    setUrlsTemporales(nuevasUrls);
  };

  const handleImagenClick = (index, e) => {
    e.preventDefault();

   
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
          navigate("/dashboard/update-imagen-form-inspeccion");
        }
      });
    } else {
      navigate("/dashboard/imagen-form-inspeccion");
    }
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
          await updateInspeccionMinig(inspeccionId, data);
          console.log("✅ Inspección actualizada correctamente:", data);
          const updatedOt = {
            ...otActual,
            etapaActual: etapaSiguiente,
          };
          await updateOt(ordenId, updatedOt);

          if (modeloEquipo && tipoEquipo) {
            navigate(
              `/dashboard/etapa/inspeccion${tipoEquipo}${modeloEquipo}C`
            );
          } else {
            console.error("❌ Error: Modelo de equipo no definido.");
          }
        } else {
          console.log("❌ Acción cancelada por el usuario.");
        }
      } else {
        console.log("🚀 Creando nueva inspección...");
      }
    } catch (error) {
      console.error("❌ Error al procesar la inspección:", error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/dashboard/etapa/inspeccionPcpMinigC`);
  };

  const handleClickA = (e) => {
    e.preventDefault();
    navigate(`/dashboard/etapa/inspeccionPcpMinigA`);
  };

  const dataImagen = () => {
    localStorage.setItem("inspeccionImagenMiniGId", inspeccionId);
    navigate(IMAGEN_INSPECCION);
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
      <h3 className="form-title">Inspección MINIG B</h3>

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
        {INSPECCION_PCPMINIGB_ITEMS.rodamientoPcpMiniG.map((item, index) => (
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
                  {...register(`itemCuboPcpMiniG.${item.ok}`)}
                  checked={watch(`itemCuboPcpMiniG.${item.ok}`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Picado</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`itemCuboPcpMiniG.${item.picado}`)}
                  checked={watch(`itemCuboPcpMiniG.${item.picado}`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Laminado</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`itemCuboPcpMiniG.${item.laminado}`)}
                  checked={watch(`itemCuboPcpMiniG.${item.laminado}`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">F.jaula</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`itemCuboPcpMiniG.${item.fallaEnJaula}`)}
                  checked={watch(`itemCuboPcpMiniG.${item.fallaEnJaula}`)}
                />
              </div>
              <div className="item-tittle">
                <label className="form-label-1">Desgaste</label>
                <input
                  className="radio-input"
                  type="checkbox"
                  {...register(`itemCuboPcpMiniG.${item.desgaste}`)}
                  checked={watch(`itemCuboPcpMiniG.${item.desgaste}`)}
                />
              </div>
              <div className="item-tittle">
                <input
                  className="form-input"
                  {...register(`itemCuboPcpMiniG.${item.esp}`)}
                  placeholder="Especificar"
                />
              </div>
            </div>
          </div>
        ))}

        <h3>Transmisión freno</h3>
        {INSPECCION_PCPMINIGB_ITEMS.itemCuboPcpMiniG.map((item, index) => (
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

export default PcpInspeccionMiniGB;
