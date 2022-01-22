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
      this.enrollmentId = data.enrollmentId;
      this.roomId = data.roomId;
    }

    static async createOrUpdate(data: ReservationData) {
      let reservation = await this.findOne({ where: { id: data.enrollmentId } });

      reservation ||= Reservation.create();
      reservation.populateFromData(data);

      await reservation.save();
    }
}
