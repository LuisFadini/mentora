import type { IAttemptRepository } from "../../shared/interfaces/repository.interface.ts";
import type { CreateAttemptDTO } from "./dto/create-attempt.dto.ts";

export class AttemptService {
  constructor(private readonly attemptRepository: IAttemptRepository) {}

  async getAttempts() {
    return await this.attemptRepository.findAll();
  }

  async getAttemptById(id: string) {
    return await this.attemptRepository.findById(id);
  }

  async getAttemptsByUser(userId: string) {
    return await this.attemptRepository.findByUserId(userId);
  }

  async createAttempt(userId: string, attempt: CreateAttemptDTO) {
    return this.attemptRepository.create({
      ...attempt,
      tipsUsed: attempt.tipsUsed ?? 0,
      userId,
      createdAt: new Date(),
    });
  }

  async deleteAttempt(id: string) {
    return await this.attemptRepository.delete(id);
  }
}
