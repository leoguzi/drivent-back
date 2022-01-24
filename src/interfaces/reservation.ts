import RoomData from "./room";

interface ReservationData {
    id?: number,
    roomId: number;
    enrollmentId: number;
    room?: RoomData;
}

export default ReservationData;
