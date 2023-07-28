import jwt from 'jsonwebtoken';
import { getUserWithJwt } from '../src/api/user.api';

export const wait = (seconds:number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

export const decodeJwtToken = (token:string) => {
  return jwt.decode(token) as jwt.JwtPayload;
}

// Define a function to check if the token exists and is valid
export const isTokenValid = async (token: string) => {
  try {
   
    const decodedToken = decodeJwtToken(token);
    if (decodedToken && decodedToken.exp && Date.now() / 1000 < decodedToken.exp) {
      // Make call to /user/me.
      const user = await getUserWithJwt(token);
      // Token is valid and has not expired
      return user;
    }
  } catch (error) {
    console.error("Error while decoding token...", error);
    // Token is invalid or expired
    return null
  }
  return null;
};