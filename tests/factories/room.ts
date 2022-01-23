import faker from "faker";
import Hotel from "../../src/entities/Hotel";
import Room from "../../src/entities/Room";

export default async function createRoom(hotel: Hotel): Promise<Room> {
  const roomName = String(faker.datatype.number(1000));
  const vacancies = faker.datatype.number(3);

  return Room.createNew(roomName, vacancies, hotel);
}
