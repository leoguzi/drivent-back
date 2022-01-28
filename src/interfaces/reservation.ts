import Reservation from "@/domain/Reservation";
import Enrollment from "@/domain/Enrollment";
import Room from "@/domain/Room";

interface ReservationData extends Reservation{
  enrollment?: Enrollment;
  room?: Room;
}

export default ReservationData;
