import { BaseEntity, Column, Entity, JoinColumn, ManyToOne,  OneToOne, PrimaryGeneratedColumn } from "typeorm";
import IReservation from "../domain/Reservation";
import Enrollment from "./Enrollment";
import IEnrollment from "@/domain/Enrollment";
import Room from "./Room";
import ReservationData from "@/interfaces/reservation";
import NotFoundError from "@/errors/NotFoundError";

@Entity("reservations")
export default class Reservation extends BaseEntity implements IReservation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roomId: number;

    @Column()
    enrollmentId: number;

    @ManyToOne(() => Room, (room) =>  room.reservations)
    @JoinColumn({ name: "roomId" })
    room: Room;

    @OneToOne(() => Enrollment, (enrollment) => enrollment.reservation)
    @JoinColumn({ name: "enrollmentId" })
    enrollment: Enrollment;

    populateFromData(data: ReservationData) {
      this.enrollmentId = data.enrollment.id;
      this.roomId = data.roomId;
    }

    static async getOneByParameter(parameter: {[index: string]: unknown}, relations: string[] = null) {
      return this.findOne({ where: parameter, relations });
    }

    static async getOneByEnrollment(enrollment: IEnrollment) {
      const reservation = await this.getOneByParameter({ enrollment }, ["room", "room.hotel", "room.reservations"]);
      
      if (!reservation) {
        throw new NotFoundError("Você não possui reservas");
      }

      return reservation;
    }

    static async createOrUpdate(data: ReservationData) {
      let reservation = await this.getOneByParameter({ enrollment: data.enrollment }, ["enrollment"]);

      reservation ||= Reservation.create();
      reservation.populateFromData(data);

      return reservation.save();
    }
}
