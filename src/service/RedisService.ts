import { users } from './../controller/AuthController/AuthController';
import { User } from "../controller/User/userInterface";
interface OTP {
    username: string;
    password: string;
    otp: string;
  }
  
  export class RedisService {
    private OTPs: OTP[] = [];
  
    public saveOTP(username: string, password: string, otp: string): OTP[] {
      const OTP: OTP = { username, password, otp };
      this.OTPs.push(OTP);
      return this.OTPs;
    }

    public verifyOTP(otp:string):User[] {
        const matchingOTP = this.OTPs.find((otpObj) => otpObj.otp === otp);
        if (matchingOTP) {
            users.push({id:3,username:matchingOTP.username,password:matchingOTP.password});
            return users
        } else {
          throw new Error("Invalid OTP");
        }
      }
    
}
  