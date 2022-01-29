import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import IAddress from "../domain/Address";
import Enrollment from "./Enrollment";

@Entity("addresses")
export default class Address extends BaseEntity implements IAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cep: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  number: string;

  @Column()
  state: string;

  @Column()
  neighborhood: string;

  @Column({ nullable: true })
  addressDetail: string;

  @Column()
  enrollmentId: number;

  @OneToOne(() => Enrollment, (enrollment: Enrollment) => enrollment.address)
  @JoinColumn()
  enrollment: Enrollment;
}
