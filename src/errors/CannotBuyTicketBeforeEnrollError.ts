export default class CannotBuyTicketBeforeEnrollError extends Error {
  constructor() {
    super("Cannot buy ticket before completting enrollment!");

    this.name = "CannotBuyTicketBeforeEnroll";
  }
}
