import Reservation from "@/domain/Reservation";
import Enrollment from "@/domain/Enrollment";
import RoomData from "@/interfaces/room";

interface ReservationData extends Reservation{
  enrollment?: Enrollment;
  room?: RoomData;
}

export default ReservationData;
