import type { Request, Response } from "express";

import type { AttemptService } from "./attempts.service.ts";
import type { CreateAttemptDTO } from "./dto/create-attempt.dto.ts";
import type { GetAttemptParams } from "./params/get-attempt.params.ts";
import type { GetAttemptsByUserParams } from "./params/get-attempts-by-user.params.ts";

export class AttemptController {
  constructor(private readonly attemptService: AttemptService) {}

  getAttempts = async (_req: Request, res: Response) => {
    const attempts = await this.attemptService.getAttempts();
    return res.json(attempts);
  };

  getAttemptById = async (req: Request<GetAttemptParams>, res: Response) => {
    const attempt = await this.attemptService.getAttemptById(req.params.id);
    if (!attempt) return res.status(404).json({ message: "Attempt not found" });
    return res.json(attempt);
  };

  getAttemptsByUser = async (
    req: Request<GetAttemptsByUserParams>,
    res: Response,
  ) => {
    const attempts = await this.attemptService.getAttemptsByUser(req.user!.id!);
    return res.json(attempts);
  };

  createAttempt = async (
    req: Request<unknown, unknown, CreateAttemptDTO>,
    res: Response,
  ) => {
    const body = await this.attemptService.createAttempt(
      req.user!.id!,
      req.body,
    );
    return res.status(201).json(body);
  };

  deleteAttempt = async (req: Request<GetAttemptParams>, res: Response) => {
    const deletedAttempt = await this.attemptService.deleteAttempt(
      req.params.id,
    );

    if (!deletedAttempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    return res.status(200).json({ message: "Attempt deleted" });
  };
}
