import { type Request, type Response } from "express";

import type { CreateUserDTO } from "./dto/create-user.dto.ts";
import { type GetUserParams } from "./params/get-user.params.ts";
import { type UsersService } from "./users.service.ts";

export class UserController {
  constructor(private readonly usersService: UsersService) {}

  getUsers = async (_req: Request, res: Response) => {
    const users = await this.usersService.getUsers();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
    const safeUsers = users.map(({ password, ...user }) => user);
    return res.json(safeUsers);
  };

  getUser = async (req: Request<GetUserParams>, res: Response) => {
    const user = await this.usersService.getUserById(req.params["id"]);
    if (!user) return res.status(404).json({ message: "User not found" });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
    const { password, ...safeUser } = user;
    return res.json(safeUser);
  };

  createUser = async (
    req: Request<unknown, unknown, CreateUserDTO>,
    res: Response,
  ) => {
    const user = await this.usersService.createUser(req.body);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
    const { password, ...safeUser } = user;
    res.status(201).json(safeUser);
  };
}
