import { User } from "../controller/User/userInterface";
import { generateAccessToken } from "../utils/generateAccessToken";
import { generateRefreshToken } from "../utils/generateRefreshToken";
export const loginService = (user:User):any => {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    return ({accessToken,refreshToken})
}

