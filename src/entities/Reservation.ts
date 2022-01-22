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

    setValues(room: Room, enrollment: Enrollment) {
      this.room = room;
      this.enrollment = enrollment;
    }
  
    static async createNew(room: Room, enrollment: Enrollment) {
      const reservation = new Reservation();
  
      reservation.setValues(room, enrollment);
        
      return Reservation.save(reservation);
    }
}
