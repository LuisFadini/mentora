import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import type { IFileStorage } from "../../interfaces/file-storage.interface.ts";

export class LocalFileStorage implements IFileStorage {
  private readonly resolvedPath: string;

  constructor(storagePath: string) {
    this.resolvedPath = path.resolve(process.cwd(), storagePath);
  }

  private resolvePath(key: string): string {
    const resolved = path.resolve(this.resolvedPath, key);

    if (
      resolved !== this.resolvedPath &&
      !resolved.startsWith(`${this.resolvedPath}${path.sep}`)
    ) {
      throw new Error("Invalid storage key.");
    }

    return resolved;
  }

  async put(key: string, data: Buffer, _contentType: string): Promise<void> {
    const filePath = this.resolvePath(key);

    await mkdir(path.dirname(filePath), {
      recursive: true,
    });

    await writeFile(filePath, data);
  }

  async get(key: string): Promise<Buffer | null> {
    try {
      return await readFile(this.resolvePath(key));
    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        return null;
      }

      throw error;
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      await unlink(this.resolvePath(key));
      return true;
    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        return false;
      }

      throw error;
    }
  }
}
