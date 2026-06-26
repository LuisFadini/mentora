export const messages = {
  nameMin: "O nome deve ter pelo menos 4 caracteres.",
  passwordMin: "A senha deve ter pelo menos 8 caracteres.",
  emailInvalid: "Digite um e-mail válido.",
  passwordMismatch: "As senhas não coincidem.",
};

export function minLength(
  value: string,
  minLength: number,
  message: string,
): string {
  const trimmed = value.trim();

  if (!trimmed) return "";

  return trimmed.length >= minLength ? "" : message;
}

export function email(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) return "";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(trimmed) ? "" : messages.emailInvalid;
}

export function matches(
  value: string,
  expected: string,
  message: string,
): string {
  const trimmed = value.trim();

  if (!trimmed) return "";

  return trimmed === expected ? "" : message;
}
