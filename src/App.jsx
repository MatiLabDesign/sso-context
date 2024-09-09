import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LOGIN, LOGOUT, PRIVATE} from "./config/routes/paths";
import Home from "./views/Home";
import Login from "./views/Login";
import Private from "./views/Private";
import Logout from "./views/Logout";
import { AuthContextProvider } from "./contexts/authContext";
import PublicRoutes from "./components/router/PublicRoutes";
import PrivateRoutes from "./components/router/PrivateRoutes";


function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoutes/>}>
            <Route index element={<Home />} />
            <Route path={LOGIN} element={<Login />} />
          </Route>
          <Route path={PRIVATE} element={<PrivateRoutes/>}>
            <Route index element={<Private />} />
            <Route path={LOGOUT} element={<Logout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
