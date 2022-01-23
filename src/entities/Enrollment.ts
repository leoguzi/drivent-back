import CpfNotAvailableError from "@/errors/CpfNotAvailable";
import EnrollmentData from "@/interfaces/enrollment";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
} from "typeorm";
import Address from "@/entities/Address";
import Reservation from "./Reservation";
import Ticket from "./Ticket";

@Entity("enrollments")
export default class Enrollment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  birthday: string;

  @Column()
  phone: string;

  @Column()
  userId: number;

  @OneToOne(() => Address, (address: Address) => address.enrollment, {
    eager: true,
    cascade: ["insert", "update"],
  })
  address: Address;

  @OneToOne(() => Reservation, (reservation) => reservation.enrollment)
  reservation: Reservation;
  
  @OneToOne(() => Ticket, (ticket: Ticket) => ticket.enrollment, { eager: true })
  ticket: Ticket;

  populateFromData(data: EnrollmentData) {
    this.name = data.name;
    this.cpf = data.cpf;
    this.birthday = data.birthday;
    this.phone = data.phone;
    this.userId = data.userId;

    this.address ||= Address.create();
    const { address } = this;

    address.cep = data.address.cep;
    address.street = data.address.street;
    address.city = data.address.city;
    address.number = data.address.number;
    address.state = data.address.state;
    address.neighborhood = data.address.neighborhood;
    address.addressDetail = data.address.addressDetail;
  }

  static async createOrUpdate(data: EnrollmentData) {
    let enrollment = await this.findOne({ where: { cpf: data.cpf } });

    if (enrollment && enrollment.userId !== data.userId) {
      throw new CpfNotAvailableError(data.cpf);
    }

    enrollment ||= Enrollment.create();
    enrollment.populateFromData(data);

    return enrollment.save();
  }

  static async getByUserIdWithAddress(userId: number) {
    return await this.findOne({ where: { userId } });
  }
}
