import ReservationData from "@/interfaces/reservation";

interface RoomData {
    id?: number,
    name: string,
    vacancies: number,
    hotelId: number,
    reservations?: ReservationData[]
}

export default RoomData;
