export function durationToMs(duration: string): number {
  const regex = /(\d+)\s*(d|h|m|s)/g;

  let total = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(duration)) !== null) {
    const value = Number(match[1]);
    const unit = match[2];

    switch (unit) {
      case "d":
        total += value * 24 * 60 * 60 * 1000;
        break;
      case "h":
        total += value * 60 * 60 * 1000;
        break;
      case "m":
        total += value * 60 * 1000;
        break;
      case "s":
        total += value * 1000;
        break;
    }
  }

  return total;
}
