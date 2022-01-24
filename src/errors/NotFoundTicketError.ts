export default class NotFoundTicketError extends Error {
  constructor() {
    super("Não foi encontrado ticket para o usuário");

    this.name = "NotFoundTicket";
  }
}
