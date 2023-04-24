import { verifyAccessToken } from "../utils/generateAccessToken";
import { generateAccessToken } from "../utils/generateAccessToken";
import { verifyRefreshToken } from "../utils/generateRefreshToken";
import { Request, Response, NextFunction } from "express";


const handleUnauthorized = (res: Response) => {
    res.status(401).send("Access denied.");
};

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return handleUnauthorized(res);
    }

    const token = authHeader.split(" ")[1];
    try {
        const decodedToken = verifyAccessToken(token);
        return next();
    } catch (err) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return handleUnauthorized(res);
        }

        let decodedToken;
        try {
            decodedToken = await verifyRefreshToken(refreshToken);
        } catch (err) {
            return handleUnauthorized(res);
        }

        if (!decodedToken) {
            return handleUnauthorized(res);
        }

        const { user, exp } = decodedToken;
        const now = Math.floor(Date.now() / 1000);

        if (exp > now) {
            const accessToken = generateAccessToken(user);
            res.cookie("accessToken", accessToken, { httpOnly: true });
            return next();
        } else {
            return handleUnauthorized(res);
        }
    }
};
