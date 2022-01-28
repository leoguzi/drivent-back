import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";

import TicketData from "@/interfaces/ticket";
import Enrollment from "./Enrollment";
import ConflictError from "@/errors/ConflictError";
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
        throw new ConflictError("Você já possuí um ingresso");
      }
      ticket = Ticket.create();
      ticket.populateFromData(data);
      
      return ticket.save();
    }

    static async updatePaymentDate(ticket: Ticket) {
      await this.update(ticket, { paymentDate: new Date() });
    }

    static async getOneByParameter(parameter: {[index: string]: any}, relations: string[] = null) {
      const ticket = await this.findOne({ where: parameter, relations });

      if (!ticket) {
        throw new NotFoundTicketError;
      }
      
      return ticket;
    }

    static async getTicketByEnroll(enrollment: Enrollment) {
      return Ticket.getOneByParameter({ enrollment });
    }
    
    static async getTicketWithValueByEnroll(enrollment: Enrollment) {
      const ticket = await Ticket.getOneByParameter({ enrollment });
      
      return {
        ...ticket,
        value: ticket.getValue()
      };
    }
}
