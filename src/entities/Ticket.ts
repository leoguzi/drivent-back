import ConflictError from "@/errors/ConflictError";
import TicketData from "@/interfaces/ticket";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import Enrollment from "./Enrollment";
@Entity("tickets")
export default class Ticket extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    type: string;

    @Column({ type: String, nullable: true })
    paymentDate: string | null;

    @Column()
    withHotel: boolean;

    @OneToOne(() => Enrollment, (enrollment) => enrollment.ticket)
    @JoinColumn()
    enrollment: Enrollment;

    populateFromData(data: TicketData) {
      this.type = data.type;
      this.paymentDate = null;
      this.withHotel = data.withHotel;
      this.enrollment = data.enrollment;
    }

    static async createTicket(data: TicketData) {
      let ticket = await this.findOne({ where: { enrollment: data.enrollment } });
      if (ticket) {
        throw new ConflictError("This user already has a ticket");
      }
      ticket = Ticket.create();
      ticket.populateFromData(data);
      await ticket.save();
    }
}
