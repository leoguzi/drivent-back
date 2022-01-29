
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
} from "typeorm";
import IEnrollment from "../domain/Enrollment";
import Address from "./Address";
import Reservation from "./Reservation";
import Ticket from "./Ticket";
import Activity from "./Activity";
import EnrollmentData from "@/interfaces/enrollment";
import CpfNotAvailableError from "@/errors/CpfNotAvailable";

@Entity("enrollments")
export default class Enrollment extends BaseEntity implements IEnrollment {
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
    cascade: ["insert", "update"],
  })
  address: Address;

  @OneToOne(() => Reservation, (reservation) => reservation.enrollment)
  reservation: Reservation;
  
  @OneToOne(() => Ticket, (ticket: Ticket) => ticket.enrollment)
  ticket: Ticket;

  @ManyToMany(() => Activity, (activity: Activity) => activity.enrollment)
  activities: Activity[];

  async populateFromData(data: EnrollmentData) {
    this.name = data.name;
    this.cpf = data.cpf;
    this.birthday = data.birthday;
    this.phone = data.phone;
    this.userId = data.userId;

    if(data.address) {
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

    if(data.newActivity) {
      const activity = await Activity.findOne(data.newActivity.id);
      this.activities.push(activity);
    }
  }

  static async createOrUpdate(data: EnrollmentData) {
    let enrollment = await this.findOne({ where: { cpf: data.cpf }, relations: ["address", "activities"] });

    if (enrollment && enrollment.userId !== data.userId) {
      throw new CpfNotAvailableError(data.cpf);
    }

    enrollment ||= Enrollment.create();
    await enrollment.populateFromData(data);

    return enrollment.save();
  }

  static async getOneByParameter(parameter: {[index: string]: unknown}, relations: string[] = null) {
    return Enrollment.findOne({ where: parameter, relations });
  }

  static async getOneByParameterWithAddress(parameter: {[index: string]: unknown}) {
    return Enrollment.getOneByParameter(parameter, ["address"]);
  }

  static async getOneByParameterWithTicket(parameter: {[index: string]: unknown}) {
    return Enrollment.getOneByParameter(parameter, ["ticket"]);
  }
}
