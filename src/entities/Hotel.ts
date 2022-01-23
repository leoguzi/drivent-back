import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Room from "./Room";

@Entity("hotels")
export default class Hotel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    image: string;

    @OneToMany(() => Room, (room) => room.hotel, { eager: true })
    rooms: Room[];

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

      const hotels = await Hotel.find();
      
      return hotels.map(hotel => formatHotelInfos(hotel));
    }
  
    getRoomsOrderedByName() {
      return this.rooms.sort((roomA, roomB) => {
        if (roomA.name > roomB.name)
          return 1;
        if (roomA.name < roomB.name)
          return -1;
        return 0;
      });
    }

    private setValues(name: string, image: string) {
      this.name = name;
      this.image = image;
    }

    static async createNew(name: string, image: string) {
      const hotel = new Hotel();

      hotel.setValues(name, image);

      return Hotel.save(hotel);
    }
}
