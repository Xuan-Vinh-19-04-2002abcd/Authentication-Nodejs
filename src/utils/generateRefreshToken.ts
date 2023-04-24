import jwt from "jsonwebtoken";
import { User } from "../controller/User/userInterface";

const secretKey = "hellovinh"
export const generateRefreshToken = (user: User): string => {
    const options: jwt.SignOptions = {
        expiresIn: '7d', 
      };
    const accessToken = jwt.sign(user,secretKey,options);
  
    return accessToken;
};
export const verifyRefreshToken  = (accessToken:string):any =>{
  const decodedToken = jwt.verify(accessToken, secretKey);
  return decodedToken;
}
