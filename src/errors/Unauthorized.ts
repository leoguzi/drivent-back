export default class UnauthorizedError extends Error {
  constructor() {
    super("Você deve precisa estar logado para acessar");

    this.name = "UnauthorizedError";
  }
}
