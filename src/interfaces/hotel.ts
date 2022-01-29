import Hotel from "@/domain/Hotel";
import RoomData from "./room";

interface HotelData extends Hotel {
  rooms?: RoomData[],
  roomTypes?: string[],
  availableVacancies?: number
}

export default HotelData;
