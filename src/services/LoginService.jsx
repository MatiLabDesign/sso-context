import axios from "axios";
import { LOGIN_URL } from "../constants/API_URL";

class LoginService {
  authUser(users) {
    return axios.post(LOGIN_URL, users);
  }
}

export default new LoginService();
