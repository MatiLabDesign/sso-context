import { Link } from "react-router-dom";
import { LOGIN } from "../config/routes/paths";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to={LOGIN}>Iniciar Sesión</Link>
    </div>
  );
};

export default Home;
