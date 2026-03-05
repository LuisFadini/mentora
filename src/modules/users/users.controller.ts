import { type Request, type Response } from "express";

import type { CreateUserDTO } from "./dto/create-user.dto.ts";
import { type GetUserParams } from "./params/get-user.params.ts";
import { type UsersService } from "./users.service.ts";

export class UserController {
  constructor(private readonly usersService: UsersService) {}

  getUsers = async (_req: Request, res: Response) => {
    const users = await this.usersService.getUsers();
    return res.json(users);
  };

  getUser = async (req: Request<GetUserParams>, res: Response) => {
    const user = await this.usersService.getUserById(req.params["id"]);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  };

  createUser = async (
    req: Request<unknown, unknown, CreateUserDTO>,
    res: Response,
  ) => {
    const user = await this.usersService.createUser(req.body);
    res.status(201).json(user);
  };
}
