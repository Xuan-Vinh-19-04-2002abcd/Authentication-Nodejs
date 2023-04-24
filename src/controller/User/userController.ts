import { Request, Response } from "express";

class UserController {
  getUsers(req: Request, res: Response): void {
    res.send("Get all users");
  }

  getUserById(req: Request, res: Response): void {
    const id = req.params.id;
    res.send(`Get user with ID ${id}`);
  }

  createUser(req: Request, res: Response): void {
    const { name, email } = req.body;
    res.send(`Create user with name ${name} and email ${email}`);
  }

  updateUser(req: Request, res: Response): void {
    const id = req.params.id;
    const { name, email } = req.body;
    res.send(`Update user with ID ${id} with name ${name} and email ${email}`);
  }

  deleteUser(req: Request, res: Response): void {
    const id = req.params.id;
    res.send(`Delete user with ID ${id}`);
  }
}

export default new UserController();
