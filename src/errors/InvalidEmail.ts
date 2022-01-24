export default class InvalidEmailError extends Error {
  constructor(email: string) {
    super(`"${email}" não é um email válido!`);

    this.name = "InvalidEmailError";
  }
}
