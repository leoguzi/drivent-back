import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable
} from "typeorm";

import Enrollment from "./Enrollment";

@Entity("activities")
export default class Activity extends BaseEntity {
@PrimaryGeneratedColumn()
id: number;

@Column()
name: string;

@Column({ type: "timestamp with time zone" })
startDate: Date;
    
@Column({ type: "timestamp with time zone" })
endDate: Date;

@Column()
vacancies: number;

@Column()
location: string;

@ManyToMany(() => Enrollment, (enrollment: Enrollment) => enrollment.activities)
@JoinTable()
enrollment: Enrollment[]
}

