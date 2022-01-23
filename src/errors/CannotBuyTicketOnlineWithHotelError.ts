export default class CannotBuyTicketOnlineWithHotelError extends Error {
  constructor() {
    super("Cannot buy ticket online with hotel!");

    this.name = "CannotBuyTicketOnlineWithHotel";
  }
}
