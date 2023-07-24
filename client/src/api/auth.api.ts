import axios from "axios";
import { IAuthFormValue, ILoginResponse, IUser } from "../types"
import { API_BASE_URL } from "./constants";


export const loginApi = async (authValue: IAuthFormValue): Promise<ILoginResponse> => {
    const tokenResult = await axios.post(`${API_BASE_URL}/auth/login`, authValue) as ILoginResponse;
    return tokenResult;
}

export const registerApi = async (authValue: IAuthFormValue): Promise<IUser> => {
    return await axios.post(`${API_BASE_URL}/auth/register`, authValue);
}
