import React from 'react';
import { useForm } from 'react-hook-form';
import "./PcpInspeccion.css";
import "./PcpRecepcion2.css";

const PcpInspeccionMiniGA = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      comentario: "Inspección inicial de prueba",
      eliminado: false,
      lubricantePcpMiniG: {
        lubricanteBlockPortaRodamientos: {
          ok: false,
          particulasMetalicas: false,
          agua: false,
          sucio: true,
        },
      },
      itemPcpMiniG: {
        ejeMotriz: {
          ok: true,
          alojamientoRodamiento: false,
          alojamientoReten: false,
          diametro: 20.5,
          deformado: false,
        },
        blockCabezal: {
          ok: true,
          alojamientoRodamiento: true,
          alojamientoReten: false,
          diametro: 15.3,
          deformado: false,
        },
        placaInferior: {
          ok: false,
          alojamientoRodamiento: true,
          alojamientoReten: true,
          diametro: 18.0,
          deformado: true,
        },
      },
      rodamientoPcpMiniG: {
        ok: false,
        picado: true,
        laminado: false,
        fallaEnJaula: true,
        desgaste: "Moderado",
      },
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Comentario */}
      <div>
        <label htmlFor="comentario">Comentario:</label>
        <textarea id="comentario" {...register("comentario")} />
      </div>

      {/* Eliminado */}
      <div>
        <label htmlFor="eliminado">Eliminado:</label>
        <input className='check' type="checkbox" id="eliminado" {...register("eliminado")} />
      </div>

      {/* Lubricantes */}
      <div>
        <h3>Lubricantes</h3>

        {/* Lubricante Block Porta Rodamientos */}
        <div className='container-into'>
          <h4>Lubricante Block Porta Rodamientos</h4>
          <label htmlFor="estadoLubricanteBlock">Estado:</label>
          <input className='check' type="checkbox" id="estadoLubricanteBlock" {...register("lubricantePcpVh60.lubricanteBlockPortaRodamientos.estado")} value={true} /> Bueno
          <input className='check' type="checkbox" id="estadoLubricanteBlock" {...register("lubricantePcpVh60.lubricanteBlockPortaRodamientos.estado")} value={false} /> Malo

          <label htmlFor="especificarLubricanteBlock">Especificar:</label>
          <input type="text" id="especificarLubricanteBlock" {...register("lubricantePcpVh60.lubricanteBlockPortaRodamientos.especificar")} />
        </div>

        {/* Lubricante Sistema Freno */}
        <div>
          <h4>Lubricante Sistema Freno</h4>
          <label htmlFor="estadoLubricanteFreno">Estado:</label>
          <input className='check' type="checkbox" id="estadoLubricanteFreno" {...register("lubricantePcpVh60.lubricanteSistemaFreno.estado")} value={true} /> Bueno
          <input className='check' type="checkbox" id="estadoLubricanteFreno" {...register("lubricantePcpVh60.lubricanteSistemaFreno.estado")} value={false} /> Malo

          <label htmlFor="especificarLubricanteFreno">Especificar:</label>
          <input type="text" id="especificarLubricanteFreno" {...register("lubricantePcpVh60.lubricanteSistemaFreno.especificar")} />
        </div>
      </div>

      {/* Items */}
      <div>
        <h3>Items</h3>

        {/* Eje Motriz */}
        <div>
          <h4>Eje Motriz</h4>
          <label htmlFor="estadoEjeMotriz">Estado:</label>
          <input className='check' type="checkbox" id="estadoEjeMotriz" {...register("itemPcpVh60.ejeMotriz.estado")} value={true} /> Bueno
          <input className='check' type="checkbox" id="estadoEjeMotriz" {...register("itemPcpVh60.ejeMotriz.estado")} value={false} /> Malo

          <label htmlFor="diametroEjeMotriz">Diámetro:</label>
          <input type="text" id="diametroEjeMotriz" {...register("itemPcpVh60.ejeMotriz.diametro")} />
        </div>

        {/* Block Cabezal */}
        <div>
          <h4>Block Cabezal</h4>
          <label htmlFor="estadoBlockCabezal">Estado:</label>
          <input className='check' type="checkbox" id="estadoBlockCabezal" {...register("itemPcpVh60.blockCabezal.estado")} value={true} /> Bueno
          <input className='check' type="checkbox" id="estadoBlockCabezal" {...register("itemPcpVh60.blockCabezal.estado")} value={false} /> Malo

          <label htmlFor="diametroBlockCabezal">Diámetro:</label>
          <input className='check' type="text" id="diametroBlockCabezal" {...register("itemPcpVh60.blockCabezal.diametro")} />
        </div>

        {/* Placa Inferior */}
        <div>
          <h4>Placa Inferior</h4>
          <label htmlFor="estadoPlacaInferior">Estado:</label>
          <input className='check' type="checkbox" id="estadoPlacaInferior" {...register("itemPcpVh60.placaInferior.estado")} value={true} /> Bueno
          <input className='check' type="checkbox" id="estadoPlacaInferior" {...register("itemPcpVh60.placaInferior.estado")} value={false} /> Malo

          <label htmlFor="diametroPlacaInferior">Diámetro:</label>
          <input type="text" id="diametroPlacaInferior" {...register("itemPcpVh60.placaInferior.diametro")} />
        </div>

        {/* Placa Superior */}
        <div>
          <h4>Placa Superior</h4>
          <label htmlFor="estadoPlacaSuperior">Estado:</label>
          <input className='check' type="checkbox" id="estadoPlacaSuperior" {...register("itemPcpVh60.placaSuperior.estado")} value={true} /> Bueno
          <input className='check' type="checkbox" id="estadoPlacaSuperior" {...register("itemPcpVh60.placaSuperior.estado")} value={false} /> Malo

          <label htmlFor="diametroPlacaSuperior">Diámetro:</label>
          <input type="text" id="diametroPlacaSuperior" {...register("itemPcpVh60.placaSuperior.diametro")} />
        </div>
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
};


export default PcpInspeccionMiniGA;
