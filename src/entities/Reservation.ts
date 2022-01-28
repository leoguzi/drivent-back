import ReservationData from "@/interfaces/reservation";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne,  OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Enrollment from "./Enrollment";
import Room from "./Room";

@Entity("reservations")
export default class Reservation extends BaseEntity {
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
      this.enrollment = data.enrollment;
      this.roomId = data.roomId;
    }

    static async getOneByParameter(parameter: {[index: string]: any}, relations: string[] = null) {
      return this.findOne({ where: parameter, relations });
    }

    static async getOneByEnrollment(enrollment: Enrollment) {
      const ticket = await this.getOneByParameter({ enrollment }, ["room", "room.hotel", "room.reservations"]);
      
      return ticket;
    }

    static async createOrUpdate(data: ReservationData) {
      let reservation = await this.getOneByParameter({ enrollment: data.enrollment }, ["enrollment"]);

      reservation ||= Reservation.create();
      reservation.populateFromData(data);

      return reservation.save();
    }
}
