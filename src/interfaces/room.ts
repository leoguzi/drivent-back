import ReservationData from "@/interfaces/reservation";
import HotelData from "./hotel";

interface RoomData {
    id?: number,
    name: string,
    vacancies: number,
    hotelId: number,
    reservations?: ReservationData[] | number
    hotel?: HotelData
}

export default RoomData;
