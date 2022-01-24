export default class CannotBuyTicketOnlineWithHotelError extends Error {
  constructor() {
    super("Não é possível comprar a modalidade de ingresso online com hotel");

    this.name = "CannotBuyTicketOnlineWithHotel";
  }
}
