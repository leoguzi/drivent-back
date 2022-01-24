export default class CannotBuyTicketBeforeEnrollError extends Error {
  constructor() {
    super("Não é possível comprar um ingresso sem estar inscrito");

    this.name = "CannotBuyTicketBeforeEnroll";
  }
}
