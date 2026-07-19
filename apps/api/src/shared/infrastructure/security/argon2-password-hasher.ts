import * as argon2 from "argon2";

import type { IPasswordHasher } from "../../interfaces/password-hasher.interface.ts";

export class Argon2idPasswordHasher implements IPasswordHasher {
  hash(password: string): Promise<string> {
    return argon2.hash(password);
  }

  compare(password: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}
