import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ImagenForm.css";
import style from "./FormStyle.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { IMAGEN_URL } from "../../constants/API_URL";
import Swal from "sweetalert2";
import useImagenData from "../../hooks/useImagenData";

const ImagenForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();
  const [imagen, setImagen] = useState(null);
  const [urlTemporal, setUrlTemporal] = useState(null);
  const inputRef = useRef();

  const { newImagen } = useImagenData(imagen);

  const handleImagenChange = (file) => {
    setImagen(file);
    setUrlTemporal(URL.createObjectURL(file));
  };

  const handleContenedorClick = () => {
    inputRef.current?.click();
  };

  const imgRecepcionId = window.localStorage.getItem("recepcionId");

  const onSubmit = async (data) => {
    console.log("📤 Datos del formulario:", data);
    console.log("🖼 Imagen cargada:", imagen);
    
    try {
      if (!imagen) {
        Swal.fire({
          title: "Error",
          text: "Debes seleccionar una imagen",
          icon: "error",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#059080",
        });
        return;
      }

      // Crear FormData para enviar la imagen y datos
      const formData = new FormData();
      
      // Adjuntar la imagen
      formData.append("file", imagen);
      // También enviar los datos como campos individuales en caso de que el backend los espere así
      formData.append("descripcion", data.descripcion || "");
      formData.append("publicar", data.publicar ? "true" : "false");
      formData.append("recepcionId", imgRecepcionId || null);
      //

      
      
      // Enviar al backend ----ARREGLADO
      const response = await newImagen(formData);
      
      console.log("✅ Imagen guardada exitosamente:", response.data);
      
      Swal.fire({
        title: "Éxito",
        text: "Imagen guardada exitosamente",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#059080",  
      });
      
      // Limpiar el formulario
      setImagen(null);
      setUrlTemporal(null);
      
      // Navegar a la página de recepción PCP
      navigate("/dashboard/etapa/recepcionPCP");
      
    } catch (error) {
      console.error("❌ Error al guardar la imagen:", error);
      
      Swal.fire({
        title: "Error",
        text: "Error al guardar la imagen: " + (error.response?.data || error.message),
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#059080",
      });
    }
  };

  return (
    <div>
      <h2>Cargar imagen</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form_equipo_b}>
        <div className="Imagen_container" onClick={handleContenedorClick}>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={inputRef}
            onChange={(e) => handleImagenChange(e.target.files[0])}
          />
          <img
            className="imagen_upload"
            src={urlTemporal || "/phot.png"}
            alt="Miniatura"
          />
        </div>

        <div className={style.input_equipo}>
          <label>Descripción</label>
          <input
            type="text"
            {...register("descripcion",
              //  { required: true }
              )}
          />
          {errors.descripcion && <p className="error">La descripción es requerida</p>}
        </div>

        <div className={style.input_tipo}>
          <label>Publicar</label>
          <input type="checkbox" {...register("publicar")} />
        </div>

        <button className={style.form_control_s2} type="submit">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default ImagenForm;

