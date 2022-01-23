import faker from "faker";
import Hotel from "../../src/entities/Hotel";
import Room from "../../src/entities/Room";

function getRandomInteger(min: number, max: number) {
  return Math.ceil(Math.random() * (max - min) + min);
}

export default async function createRoom(hotel: Hotel): Promise<Room> {
  const roomName = String(faker.datatype.number(1000));
  const vacancies = getRandomInteger(1, 3);

  return Room.createNew(roomName, vacancies, hotel);
}
