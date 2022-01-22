import Enrollment from "@/entities/Enrollment";
import Hotel from "@/entities/Hotel";
import Room from "@/entities/Room";
import ForbiddenError from "@/errors/Forbidden";

export async function getHotelsInfos(userId: number) {
  const enrollment =  await Enrollment.getByUserIdWithAddress(userId);

  if (!enrollment) {
    throw new ForbiddenError("User must enroll an event to see the list of hotels");
  }

  /* 
  
  Funcao incompleta. Falta:
    procurar o ticket
        se !withHotel || !paymentDate => lancar erro forbidden

  */

  const hotels = await Hotel.getHotelTypesOfRoomsAndAvailableVacancies();
  return hotels;
}

export async function getHotelRooms(hotelId: number, userId: number) {
  const enrollment =  await Enrollment.getByUserIdWithAddress(userId);

  if (!enrollment) {
    throw new ForbiddenError("User must enroll an event to see the list of hotels");
  }

  const hotel: Hotel = await Hotel.findOne({ id: hotelId });
  const hotelRooms = hideRoomsReservationsInfos(hotel.getRoomsOrderedByName());
  return hotelRooms; 
}

function hideRoomsReservationsInfos(rooms: Room[]) {
  return rooms.map(room => ({ ...room, reservations: room.reservations.length }));
}
