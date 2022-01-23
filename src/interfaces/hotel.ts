import RoomData from "@/interfaces/room";

interface HotelData {
    id?: number,
    name: string,
    image: string,
    rooms: RoomData[],
    roomTypes?: string[],
    availableVacancies?: number
}

export default HotelData;
