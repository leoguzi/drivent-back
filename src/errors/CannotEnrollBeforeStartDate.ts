export default class CannotEnrollBeforeStartDateError extends Error {
  constructor() {
    super("Não é possível efetuar a incrição antes da data de início");

    this.name = "CannotEnrollBeforeStartDateError";
  }
}
