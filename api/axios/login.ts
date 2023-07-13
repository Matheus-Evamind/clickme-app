import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance, { setAuthToken, setUserCredentials } from ".";
import { HashPasswordSHA256 } from "../../utils/hashPassword";
import { useNavigation } from '@react-navigation/native';


export const LoginUser = async (email: string, password: string) => {
  

  return await axiosInstance.post("/login", {
    Login: email,
    Password: HashPasswordSHA256(password)
  }).then((res) => {
     if(res.data === 200) {
        setAuthToken(res.data.Token)
        setUserCredentials(email, HashPasswordSHA256(password));
     }
  })

  axiosInstance.get("/login/getdatalogin").then((res) => {
    AsyncStorage.setItem("scheduleId", res.data.ScheduleId);
  })

}


