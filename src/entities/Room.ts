import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Hotel from "./Hotel";
import Reservation from "./Reservation";

@Entity("rooms")
export default class Room extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    vacancies: number;

    @Column()
    hotelId: number;

    @ManyToOne(() => Hotel, (hotel) =>  hotel.rooms)
    @JoinColumn({ name: "hotelId" })
    hotel: Hotel;

    @OneToMany(() => Reservation, (reservation) =>  reservation.room, { eager: true })
    reservations: Reservation[];

    getRoomType() {
      // rooms can have 1, 2 or 3 vacancies
      const types: {[index: number]: string} = {
        1: "Single",
        2: "Double",
        3: "Triple",
      };

      return types[this.vacancies];
    }

    getAvailableVacancies() {
      return this.vacancies - this.reservations.length;
    }
}
