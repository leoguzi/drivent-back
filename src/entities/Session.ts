import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import ISession from "../domain/Session";

@Entity("sessions")
export default class Session extends BaseEntity implements ISession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  token: string;

  static async createNew(userId: number, token: string) {
    const session = this.create({ userId, token });
    await session.save();
    return session;
  }
}
