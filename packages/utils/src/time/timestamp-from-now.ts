import { durationToMs } from "./duration-from-ms.ts";

export function timestampFromNow(duration: string): Date {
  return new Date(Date.now() + durationToMs(duration));
}
