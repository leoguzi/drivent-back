import ConflictError from "@/errors/ConflictError";

export default class EmailNotAvailableError extends ConflictError {
  constructor(email: string) {
    super(`O email "${email}" está sendo usado por outro usuário`);

    this.name = "EmailNotAvailableError";
  }
}
