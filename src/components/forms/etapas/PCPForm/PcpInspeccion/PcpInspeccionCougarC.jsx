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
import useEnsayoData from "../../../../../hooks/useEnsayoData";
import inspeccionPcpCoguar from "../../../../../data/inspeccionPCPCougar";
import { INSPECCION_PCPCOUGARC_ITEMS } from "../../../../../constants/INSPECCION_PCPCOUGAR_ITEMS";


const PcpInspeccionCougarC = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty },
  } = useForm({
    defaultValues: inspeccionPcpCoguar,
  });

  const [imagenes, setImagenes] = useState(Array(6).fill(null));
  const [urlsTemporales, setUrlsTemporales] = useState(Array(6).fill(null));

  const [imagenesGuardadas, setImagenesGuardadas] = useState([]);
  const ordenId = localStorage.getItem("ordenId");
  const recepcionId = localStorage.getItem("recepcionId");
  const tipoEquipo = localStorage.getItem("tipoEquipo");
  const modeloEquipo = localStorage.getItem("modeloEquipo");
   const inspeccionId = localStorage.getItem("inspeccionId");
   const ensayoId = localStorage.getItem("ensayoId");

  //Logica para ver el tipo y el modelo del equipo>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const inspeccionIdGuardada = inspeccionId;

  console.log(inspeccionIdGuardada);
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  useEffect(() => {
  const fetchImagenes = async () => {
    if (!inspeccionIdGuardada) return; // usar el ID real

    try {
      const response = await ImagenService.getImagenByInspeccionVh60Id(inspeccionIdGuardada);
      setImagenesGuardadas(response.data || []); // si no hay datos, usar array vacío
    } catch (error) {
      console.error("Error al obtener las imágenes:", error);
    }
  };

  fetchImagenes();
}, [inspeccionIdGuardada]);

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

      if (otActual.inspeccionPcpVh60 && otActual.inspeccionPcpVh60.id) {
        // setInspecionId(otActual.inspeccionPcpVh60.id);
      } else {
        console.warn(
          "⚠️ Advertencia: `otActual.inspeccionPcpCougar` no tiene un ID válido."
        );
        // setInspecionId(null); // Limpia el estado para evitar errores posteriores
      }
    }
  }, [otActual]);
    
 
  // const [inspeccionId, setInspecionId] = useState(null);>REVISAR>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  useEffect(() => {
    if (inspeccionId) {
      console.log("✅ Este es el id de Inspección:", inspeccionId);
    }
  }, [inspeccionId]);

  const { inspeccionActual, updateInspeccion, updateInspeccionCougar } = useInspeccionData(inspeccionId, reset);
  const { newEnsayoCougar  } = useEnsayoData();
  useEffect(() => {
    if (inspeccionActual) {
      console.log("✅ Datos Inspección actual:", inspeccionActual);
    }
  }, [inspeccionActual]);

  const etapaSiguiente = 6;

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

    localStorage.setItem("inspeccionId", inspeccionId);
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
          await updateInspeccionCougar(inspeccionId, data);
          console.log("✅ Inspección actualizada correctamente:", data);
          const updatedOt = {
            ...otActual,
            etapaActual: etapaSiguiente,
          };
          await updateOt(ordenId, updatedOt);


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>          
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>          
//>>>>>>>>>>>>>>>>CREAR ENSAYO Y ACTUALIZAR ENSAYO ID EN OT>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>          
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>          

          // Reemplazar el bloque por este:
const ensayoExisteEnOt = otActual?.ensayoCougar?.id;
console.log(
  "Verificando existencia de ensayo en OT:",
  ensayoExisteEnOt
);

if (!ensayoExisteEnOt) {
  try {
    // 🔹 Crear ensayo en backend
    const resp = await newEnsayoCougar(data);
    console.log("Respuesta de creación de ensayo:", resp);

    // 🔹 Obtener ID del ensayo recién creado
    const nuevoEnsayoId = resp?.id ?? resp?.data?.id;

    if (!nuevoEnsayoId) {
      throw new Error("No se obtuvo un ID válido del nuevo ensayo.");
    }

    // 🔹 Actualizar OT vinculando el nuevo ensayo
    const updatedOt = {
      ...otActual,
      ensayoCougar: { id: nuevoEnsayoId },
      etapaActual: etapaSiguiente,
    };

    await updateOt(ordenId, updatedOt);

    // 🔹 Persistir ID para los siguientes pasos
    localStorage.setItem("ensayoId", nuevoEnsayoId);

    console.log("✅ OT actualizada con nuevo ensayo:", nuevoEnsayoId);

    await Swal.fire({
      title: "Perfecto!",
      text: "Ensayo creado y vinculado a la OT con éxito",
      icon: "success",
      confirmButtonColor: "#059080",
    });

  } catch (error) {
    console.error("❌ Error al crear ensayo y actualizar OT:", error);

    await Swal.fire({
      title: "Error",
      text: "No se pudo crear el ensayo o actualizar la OT",
      icon: "error",
      confirmButtonColor: "#f09898",
    });
  }
} else {
  console.log(
    "ℹ️ Ya existe un ensayo asociado a la OT. ID:",
    ensayoExisteEnOt
  );
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
          if (modeloEquipoActual && tipoEquipoActual) {
            navigate(
              `/dashboard/etapa/ensayo${tipoEquipoActual}`
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
    navigate(`/dashboard/etapa/ensayo${tipoEquipo}${modeloEquipo}A`);
  };

  const handleClickA = (e) => {
    e.preventDefault();
    navigate(`/dashboard/etapa/inspeccion${tipoEquipo}${modeloEquipo}B`);
  };

  const dataImagen = () => {
    // localStorage.setItem("inspeccionVh60Id", inspeccionId);
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
      <h3 className="form-title">Inspección Cougar C</h3>

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
      {INSPECCION_PCPCOUGARC_ITEMS.sistemaHidraulicoPcpCoguar.map((item) => (
        <div className="item-section" key={item.label}>
          <div className="item-tittle">
            <h4 className="item-title">{item.label}</h4>
          </div>
          <div className="item-tittle">
            <label className="form-label">Ok</label>
            <input
              type="checkbox"
              className="radio-input"
              {...register(`sistemaHidraulicoPcpCougar.${item.ok}`)}
              checked={watch(`sistemaHidraulicoPcpCougar.${item.ok}`)}
            />
          </div>
          <div className="item-tittle">
            <label className="form-label">Fugas</label>
            <input
              type="checkbox"
              className="radio-input"
              {...register(`sistemaHidraulicoPcpVhCougar${item.fuga}`)}
              checked={watch(`sistemaHidraulicoPcpVhCougar${item.fuga}`)}
            />
          </div>
          <div className="item-tittle">
            <label className="form-label">Roto</label>
            <input
              type="checkbox"
              className="radio-input"
              {...register(`sistemaHidraulicoPcpVhCougar${item.roto}`)}
              checked={watch(`sistemaHidraulicoPcpVhCougar${item.roto}`)}
            />
          </div>
          <div className="item-tittle">
            <label className="form-label">Eficiencia</label>
            <input
              type="checkbox"
              className="radio-input"
              {...register(`sistemaHidraulicoPcpVhCougar${item.eficiencia}`)}
              checked={watch(`sistemaHidraulicoPcpVhCougar${item.eficiencia}`)}
            />
          </div>
          <div className="item-tittle">
            <input
              className="form-input"
              {...register(`sistemaHidraulicoPcpVhCougar${item.esp}`)}
              placeholder="Especificar"
            />
          </div>
        </div>
      ))}

      <h3>Polea</h3>
      {INSPECCION_PCPCOUGARC_ITEMS.poleaPcpCoguar.map((itemKey) => (
        <div className="item-section" key={itemKey}>
          <div className="item-field">
            <div className="item-tittle">
              <h4 className="item-title">{itemKey.label}</h4>
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Ok</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`poleaPcpCougar.${itemKey.ok}`)}
                checked={watch(`poleaPcpCougar.${itemKey.ok}`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Fisura</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`poleaPcpCougar.${itemKey.fisura}`)}
                checked={watch(`poleaPcpCougar.${itemKey.fisura}`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">Poros</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`poleaPcpCougar.${itemKey.poros}`)}
                checked={watch(`poleaPcpCougar.${itemKey.poros}`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">D. Inadec.</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`poleaPcpCougar.${itemKey.diametroInad}`)}
                checked={watch(`poleaPcpCougar.${itemKey.diametroInad}`)}
              />
            </div>
            <div className="item-tittle">
              <label className="form-label-1">N° Trazab.</label>
              <input
                className="radio-input"
                type="checkbox"
                {...register(`poleaPcpCougar.${itemKey.numTraz}`)}
                checked={watch(`poleaPcpCougar.${itemKey.numTraz}`)}
              />
            </div>

            <div className="item-tittle">
              <input
                className="form-input"
                {...register(`poleaPcpCougar.${itemKey.esp}`)}
                placeholder="Especificar"
              />
            </div>
          </div>
        </div>
      ))}
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

export default PcpInspeccionCougarC;
