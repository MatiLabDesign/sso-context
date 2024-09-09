import styles from "./FormStyle.module.css";
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Usuario</label>
          <input type="text" {...register("username")} />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="text" {...register("password")} />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
