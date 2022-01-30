export default class CannotUpdateCpfError extends Error {
  constructor() {
    super("Não é possível atualizar seu CPF");

    this.name = "CannotUpdateCpf";
  }
}
