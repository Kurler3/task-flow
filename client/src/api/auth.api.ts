import axios from "axios";
import { AuthFormValues, IAxiosError, ILoginResponse, IUser } from "../types"
import { API_BASE_URL } from "./constants";


export const loginApi = async (authValue: AuthFormValues<true>): Promise<ILoginResponse|undefined>  => {
  try {
    const tokenResult = await axios.post(`${API_BASE_URL}/auth/login`, authValue);
    return tokenResult.data;  
  } catch (error: IAxiosError) {
    alert(error.response.data.message);
  }
  
}

export const registerApi = async (authValue: AuthFormValues<false>): Promise<IUser> => {
    return (await axios.post(`${API_BASE_URL}/auth/register`, authValue)).data;
}
