import { useAuthContext } from "../contexts/authContext";
import LoginService from "../services/LoginService";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
        console.log("Autenticación exitosa:", response.data);
        login();
        navigate("/private");
        console.log(data);
        return response.data;
      } else {
        console.error("Error en la autenticación:", response.status);
        return null;
      }
    } catch (error) {
      if (error.response) {
        console.error("Error en la solicitud:", error.response.status);
      } else {
        console.error("Error de red:", error.message);
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

export default Login;
