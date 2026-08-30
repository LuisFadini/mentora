import type { Request, Response } from "express";

import { ConflictError } from "../../shared/errors/conflict.error.ts";
import type { CreateUserDTO } from "./dto/create-user.dto.ts";
import type { UpdateUserDTO } from "./dto/update-user.dto.ts";
import type { GetUserParams } from "./params/get-user.params.ts";
import type { UsersService } from "./users.service.ts";

export class UserController {
  constructor(private readonly usersService: UsersService) {}

  getUsers = async (_req: Request, res: Response) => {
    const users = await this.usersService.getUsers();
    return res.json(users);
  };

  getUser = async (req: Request<GetUserParams>, res: Response) => {
    const user = await this.usersService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  };

  createUser = async (
    req: Request<unknown, unknown, CreateUserDTO>,
    res: Response,
  ) => {
    try {
      const user = await this.usersService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof ConflictError) {
        return res.status(409).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };

  updateUser = async (
    req: Request<GetUserParams, unknown, UpdateUserDTO>,
    res: Response,
  ) => {
    try {
      const updatedUser = await this.usersService.updateUser(
        req.params.id,
        req.body,
        req.session!.id,
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      if (error instanceof ConflictError) {
        return res.status(409).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };

  deleteUser = async (req: Request<GetUserParams>, res: Response) => {
    try {
      const deletedUser = await this.usersService.deleteUser(req.params.id);

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ message: "User deleted" });
    } catch (_) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };
}
