import axios from "axios";
import { IAuthFormValue } from "../types"
import { API_BASE_URL } from "./constants";

export const loginApi = async (authValue: IAuthFormValue) => {
    const tokenResult = await axios.post(`${API_BASE_URL}/auth/login`, authValue);
    return tokenResult;
}

