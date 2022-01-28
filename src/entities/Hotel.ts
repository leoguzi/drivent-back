import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Room from "./Room";
import NoContentError from "@/errors/NoContentError";
import NotFoundError from "@/errors/NotFoundError";

@Entity("hotels")
export default class Hotel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    image: string;

    @OneToMany(() => Room, (room) => room.hotel)
    rooms: Room[];

    private setValues(name: string, image: string) {
      this.name = name;
      this.image = image;
    }

    static async createNew(name: string, image: string) {
      const hotel = new Hotel();

      hotel.setValues(name, image);

      return Hotel.save(hotel);
    }

    static async getOneByParameter(parameter: {[index: string]: any}, relations: string[] = null) {
      return Hotel.findOne({ where: parameter, relations });
    }

    static async getByParameter(parameter: {[index: string]: any}, relations: string[] = null) {
      return Hotel.find({ where: parameter, relations });
    }

    static async getAllWithRoomsAndReservations() {
      const hotels = await Hotel.find({ relations: ["rooms", "rooms.reservations"] });

      if(hotels.length < 1) {
        throw new NoContentError("Não há hotéis cadastrados");
      }

      return hotels;
    }

    static async getOneByIdWithRoomsAndReservations(hotelId: number) {
      const hotel = await Hotel.findOne({ where: { id: hotelId }, relations: ["rooms", "rooms.reservations"] });

      if(!hotel) {
        throw new NotFoundError("Não há hotel cadastrado com este id");
      }

      if(hotel.rooms.length < 1) {
        throw new NoContentError("Não há quarto cadastrados para este hotel");
      }

      return hotel;
    }

    private orderRoomsByName() {
      return this.rooms.sort((roomA, roomB) => {
        if (roomA.name > roomB.name)
          return 1;
        if (roomA.name < roomB.name)
          return -1;
        return 0;
      });
    }

    private hideRoomsReservationsInfos() {
      return this.rooms.map(room => ({ ...room, reservations: room.reservations.length }));
    }

    static async getRooms(hotelId: number) {
      const hotel = await Hotel.getOneByIdWithRoomsAndReservations(hotelId);
      hotel.orderRoomsByName();    
      return hotel.hideRoomsReservationsInfos();
    }

    static async getHotelTypesOfRoomsAndAvailableVacancies() {
      function formatHotelInfos(hotel: Hotel) {
        const roomTypes: {[index: string]: number} = {};
        let availableVacancies = 0;
            
        hotel.rooms.forEach((room: Room) => {
          const roomType = room.getRoomType();
          roomTypes[roomType] = room.vacancies;
          availableVacancies += room.getAvailableVacancies();
        });
    
        return {
          id: hotel.id,
          name: hotel.name,
          image: hotel.image,
          roomTypes: Object.keys(roomTypes).sort((typeA, typeB) => roomTypes[typeA]-roomTypes[typeB]),
          availableVacancies
        };
      }

      const hotels = await Hotel.getAllWithRoomsAndReservations();
      
      return hotels.map(hotel => formatHotelInfos(hotel));
    }
}
