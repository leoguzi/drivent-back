import RoomData from "./room";

interface ReservationData {
    id?: number,
    roomId: number;
    enrollment?: any;
    room?: RoomData;
}

export default ReservationData;
