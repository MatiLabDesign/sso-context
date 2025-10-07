import React from 'react'
import ensayoPCPVH60 from "../../../../../data/ensayoPCPVH60";

const PcpEnsayoA = () => {

const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: ensayoPCPVH60,
  });

  const torque = ()=>{
    Uout*Iout;
    
  }


  return (
    <form>
        <h3 className="form-title">Ensayo PCP VH60 A</h3>
        
              <div className="form-group">
                <div className="label-input">
                  <label className="form-label">Comentario</label>
                  <input {...register("comentario")} placeholder="Comentario" />
                </div>
                <button className="form-button-2">
                  <Link onClick={handleClickA}>
                    <FaArrowLeft />
                  </Link>
                </button>
                <button className="form-button-2">
                  <Link onClick={handleClick}>
                    <FaArrowRight />
                  </Link>
                </button>
                <button type="submit" className="form-button">
                  Guardar
                </button>
              </div>


      
    </form>
  )
}

export default PcpEnsayoA
