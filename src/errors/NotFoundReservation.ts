export default class NotFoundReservationError extends Error {
  constructor() {
    super("Not Found reservation for user!");

    this.name = "NotFoundReservation";
  }
}
