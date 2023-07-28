import axios from "axios";
import { API_BASE_URL } from "./constants";
import { IUser } from "../types";



export const getUserWithJwt = async (jwtToken: string): Promise<IUser | undefined> => {
  try {
    const user = await axios.get(`${API_BASE_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }) as IUser;
    return user;
  } catch (error) {
    console.error("Error getting user...", error);
  }
}
