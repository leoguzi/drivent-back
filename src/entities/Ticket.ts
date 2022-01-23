import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";

import ConflictError from "@/errors/ConflictError";
import TicketData from "@/interfaces/ticket";
import Enrollment from "./Enrollment";
import NotFoundTicketError from "@/errors/NotFoundTicketError";

@Entity("tickets")
export default class Ticket extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    type: string;

    @Column({ nullable: true, default: null })
    paymentDate: Date | null;

    @Column()
    withHotel: boolean;

    @OneToOne(() => Enrollment, (enrollment) => enrollment.ticket)
    @JoinColumn()
    enrollment: Enrollment;

    populateFromData(data: TicketData) {
      this.type = data.type;
      this.withHotel = data.withHotel;
      this.enrollment = data.enrollment;
    }

    getValue() {
      const value = this.type === "online" ? 100 : 250;
      return (this.withHotel ? value + 350 : value);
    }

    static async createTicket(data: TicketData) {
      let ticket = await this.findOne({ where: { enrollment: data.enrollment } });
      if (ticket) {
        throw new ConflictError("Esse usuário já possuí um ingresso");
      }
      ticket = Ticket.create();
      ticket.populateFromData(data);
      
      return ticket.save();
    }

    static async getTicketByEnroll(enrollment: Enrollment) {
      const ticket = await this.findOne({ where: { enrollment } });
      if (!ticket) {
        throw new NotFoundTicketError;
      }
      
      return {
        ...ticket,
        value: ticket.getValue(),
      };
    }

    static async updatePaymentDate(enrollment: Enrollment) {
      await this.update({ enrollment }, { paymentDate: new Date() });
    }
}

