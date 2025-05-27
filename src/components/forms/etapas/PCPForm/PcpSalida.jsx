import React, { useState, useEffect } from "react";
import "./PcpFormStyle.css";
import "./PcpSalida.css";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useOrdenData from "../../../../hooks/useOrdenData";
import Swal from "sweetalert2";
import { IMAGEN } from "../../../../config/routes/paths";

const PcpSalida = () => {
  const numeroOrden = window.localStorage.getItem("numeroOT");
  const tipoEquipo = window.localStorage.getItem("tipoEquipo");
  const ordenId = localStorage.getItem("ordenId");

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();

  const navigate = useNavigate();
  const { otActual, updateOt } = useOrdenData(ordenId);

  const [imagenes, setImagenes] = useState(Array(3).fill(null));
  const [urlsTemporales, setUrlsTemporales] = useState(Array(3).fill(null));

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
      const result = await Swal.fire({
        title: "¿Confirmar salida del equipo?",
        text: "Esta acción marcará la orden como finalizada",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#059080",
        cancelButtonColor: "#f09898",
        confirmButtonText: "Sí, confirmar salida!",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        // Actualizamos el estado de la OT a false (finalizada)
        const updatedOt = {
          ...otActual,
          activa: false
          // comentarioSalida: data.comentario,
          // numeroRemito: data.numeroRemito,
          // observacionesSalida: data.observaciones
        };

        await updateOt(ordenId, updatedOt);

        await Swal.fire({
          title: "¡Perfecto!",
          text: "Salida registrada con éxito. La orden ha sido finalizada.",
          icon: "success",
          confirmButtonColor: "#059080",
        });

        navigate("/dashboard/listar-ot");
      }
    } catch (error) {
      console.error("❌ Error al procesar la salida:", error);
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error al procesar la salida",
        icon: "error",
        confirmButtonColor: "#059080",
      });
    }
  };

  return (
    <div className="recepcion-form">
      <h3 className="form-title">Salida PCP</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-groupS">
          <div className="label-container">
            <label className="form-label">Comentario</label>
            <input
              {...register("comentario", {
                required: "El comentario es requerido"
              })}
              placeholder="Comentario de salida"
            />
            {errors.comentario && (
              <p className="error-message">{errors.comentario.message}</p>
            )}
          </div>

          <div className="label-container">
            <label className="form-label">N° de Remito</label>
            <input
              {...register("numeroRemito", {
                required: "El número de remito es requerido"
              })}
              placeholder="Ingrese número de remito"
            />
            {errors.numeroRemito && (
              <p className="error-message">{errors.numeroRemito.message}</p>
            )}
          </div>
          <div className="imagenes">
            {[0, 1, 2].map((index) => {
              const hayImagen = imagenes[index];

              return hayImagen ? (
                <label key={index} className="imagen-prueba">
                  <img
                    src={urlsTemporales[index]}
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
                  <Link
                    to={IMAGEN}
                    className="boton-agregar-imagen"
                  >
                    +
                  </Link>
                </div>
              );
            })}
          </div>

          {/* <div className="label-container">
            <label className="form-label">Observaciones</label>
            <textarea 
              {...register("observaciones")} 
              placeholder="Observaciones adicionales" 
              rows="3"
            />
          </div> */}

          <div className="button-container">
            {otActual?.activa !== false && (
              <button type="submit" className="btn-salida">
                Terminar
              </button>
            )}

          </div>
        </div>


      </form>
    </div>
  );
};

export default PcpSalida;
