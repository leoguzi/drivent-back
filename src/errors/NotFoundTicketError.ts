export default class NotFoundTicketError extends Error {
  constructor() {
    super("Not Found ticket for user!");

    this.name = "NotFoundTicket";
  }
}
