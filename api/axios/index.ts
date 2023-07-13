import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const axiosInstance = axios.create({ baseURL: 'https://maisaai-evadata.evamind.com.br/api' });

export const setAuthToken = (token?: string) => {
    if (token) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
      AsyncStorage.setItem("token", token);
    } else {
      delete axiosInstance.defaults.headers.common.Authorization;
      AsyncStorage.removeItem("token");

    }
  };

export const setUserCredentials = (email: string, password: string) => {
  AsyncStorage.setItem("email", email);
  AsyncStorage.setItem("password", password);
}

export const removeUserCredentials = () => {
  AsyncStorage.removeItem("email");
  AsyncStorage.removeItem("password");
}
export default axiosInstance;