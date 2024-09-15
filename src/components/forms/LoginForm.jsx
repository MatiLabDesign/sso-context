import style from "./FormStyle.module.css";
import { useAuthContext } from "../../contexts/authContext";
import LoginService from "../../services/LoginService";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await LoginService.authUser(data);

      if (response.status === 200) {
        console.log("Usuario AUTORIZADO:", response.data);
        login();
        navigate("/dashboard");
        console.log(data);
        return response.data;
      }
    } catch (error) {
      if (error.response) {
        console.error("Usuario NO autorizado:", error.response.status);
      }
      return null;
    }
  };

  return (
    <div className={style.form_container}>
      <form className={style.form_login} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.row}>
          <label className={style.label}>Usuario</label>
          <input
            className={style.input}
            type="text"
            {...register("username")}
          />
        </div>
        <div className={style.row}>
          <label className={style.label}>Contraseña</label>
          <input
            className={style.input}
            type="text"
            {...register("password")}
          />
        </div>
        <div className={style.btn_row}>
          <button className={style.btn} type="submit">Ingresar</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
