import { User } from "../User/userInterface";
import { Request, Response } from "express";
import { loginService } from "../../service/AuthService";
import { registerSchema } from "../../Request/RegisterRequest";
import { EmailService } from "../../service/EmailService";
import { RedisService } from "../../service/RedisService";
import 'reflect-metadata';
import { error } from "console";
import { ValidationError } from "sequelize";
export const users: User[] = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];
const emailService = new EmailService();
const redisService = new RedisService();

class AuthController {
  public async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }
    const tokens = await loginService(user);
    res.cookie("accessToken", tokens.accessToken, { httpOnly: true });

    res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true });
    res.json(tokens)
  }

  public async register(req: Request, res: Response) {
    const { username, password } = req.body;
    const registrationValid = registerSchema.validate({username,password});

    if("error" in registrationValid){
      return res.status(401).json({error: 'Invalid username or password'});
    }
    
      // Gửi email xác nhận đăng ký tới người dùng
      const otp = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
      const emailText = `Xin chào ${username},\n\nCảm ơn bạn đã đăng ký tài khoản tại trang web của chúng tôi!
      \n\nVui Lòng xác nhận mã OTP chúng tôi mới gửi cho bạn ${otp} `;
      const isSendSuccessfully = emailService.sendEmail(username, 'Xác nhận mã otp', emailText);
      const OTPs = redisService.saveOTP(username,password,otp);
      if(isSendSuccessfully){
        return res.status(201).json({message:"Successfully",data :OTPs});
      }
      return res.status(401).json({error: 'Send Email Fail'});
  }
  public verifyOTP(req:Request,res:Response){
      const {otp} = req.body;
      return res.status(200).json({message:"Register Succesfully",data: redisService.verifyOTP(otp)});
  }

}
export default new AuthController()