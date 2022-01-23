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

    setValues(name: string, vacancies: number, hotel: Hotel) {
      this.name = name;
      this.vacancies = vacancies;
      this.hotel = hotel;
    }

    static async createNew(name: string, vacancies: number, hotel: Hotel) {
      const room = new Room();

      room.setValues(name, vacancies, hotel);
      
      return Room.save(room);
    }
}
