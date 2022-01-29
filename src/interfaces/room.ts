import Room from "@/domain/Room";
import ReservationData from "./reservation";
import HotelData from "./hotel";

interface RoomData extends Room{
  reservations?: ReservationData[] | number
  hotel?: HotelData
}

export default RoomData;
