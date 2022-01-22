export default class NotFoundError extends Error {
  constructor() {
    super("Nenhum resultado para pesquisa");

    this.name = "NotFoundError";
  }
}
