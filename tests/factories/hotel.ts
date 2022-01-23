import faker from "faker";
import Hotel from "../../src/entities/Hotel";

export default async function createHotel(): Promise<Hotel> {
  const hotelName = faker.name.firstName();
  const hotelImage = faker.image.imageUrl();
  return Hotel.createNew(hotelName, hotelImage);
}
