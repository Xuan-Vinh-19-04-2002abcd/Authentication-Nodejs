import express, { Request, Response } from "express";
import UserController from "../controller/User/userController";
import AuthController from "../controller/AuthController/AuthController";
import { authMiddleware } from "../middleware/authMiddleware";
const router = express.Router();

router.get("/abc", (req: Request, res: Response) => {
  let x = 10
  res.send("Đây là api của web đầ tiên!");
});
router.get("/users",authMiddleware, UserController.getUsers);
router.post("/login",AuthController.login);
router.post("/register",AuthController.register);
router.post("/verifyOTP",AuthController.verifyOTP)



export default router;
