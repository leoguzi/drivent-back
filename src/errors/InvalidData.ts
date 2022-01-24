export default class InvalidDataError extends Error {
  details: string[];

  constructor(name: string, details: string[]) {
    super(`Inválido ${name}`);

    this.details = details;
    this.name = "InvalidDataError";
  }
}
