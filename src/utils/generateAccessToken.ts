import jwt from "jsonwebtoken";
import { User } from "../controller/User/userInterface";

const secretKey = "hellovinh"
export const generateAccessToken = (user: User): string => {
    const options: jwt.SignOptions = {
        expiresIn: '30m', 
      };
    const accessToken = jwt.sign(user,secretKey,options);
  
    return accessToken;
  };

export const verifyAccessToken  = (accessToken:string):any =>{
    const decodedToken = jwt.verify(accessToken, secretKey);
    return decodedToken;
}
