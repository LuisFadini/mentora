import { type Request, type Response } from "express";

import { omit } from "../../shared/utils/omit.ts";
import type { CreateUserDTO } from "./dto/create-user.dto.ts";
import type { UpdateUserDTO } from "./dto/update-user.dto.ts";
import { type GetUserParams } from "./params/get-user.params.ts";
import { type UsersService } from "./users.service.ts";

export class UserController {
  constructor(private readonly usersService: UsersService) {}

  getUsers = async (_req: Request, res: Response) => {
    const users = await this.usersService.getUsers();
    const safeUsers = users.map((user) => omit(user, ["password"]));
    return res.json(safeUsers);
  };

  getUser = async (req: Request<GetUserParams>, res: Response) => {
    const user = await this.usersService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const safeUser = omit(user, ["password"]);
    return res.json(safeUser);
  };

  createUser = async (
    req: Request<unknown, unknown, CreateUserDTO>,
    res: Response,
  ) => {
    const user = await this.usersService.createUser(req.body);
    const safeUser = omit(user, ["password"]);
    res.status(201).json(safeUser);
  };

  updateUser = async (
    req: Request<GetUserParams, unknown, UpdateUserDTO>,
    res: Response,
  ) => {
    const updatedUser = await this.usersService.updateUser(
      req.params.id,
      req.body,
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    const safeUser = omit(updatedUser, ["password"]);
    return res.status(201).json(safeUser);
  };
}
