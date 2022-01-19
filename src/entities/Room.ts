import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Hotel from "./Hotel";

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
    hotel: Hotel
}
