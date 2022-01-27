
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable
} from "typeorm";

import EventDay from "@/interfaces/eventDay";
import Enrollment from "./Enrollment";
import ActivityData from "@/interfaces/activity";

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
  enrollment: Enrollment[];
  
  static async getAllActivities(): Promise<EventDay[]> {
    const activities = await Activity.find({ relations: ["enrollment"] });

    const activitiesByDay= {} as {
      [key: string]: ActivityData[];
    };

    activities.map((activity: Activity) => {
      const formattedActivity = {
        ...activity,
        subscriptions: activity.enrollment.length,
        availableVacancies: activity.vacancies - activity.enrollment.length
      };
      delete formattedActivity.enrollment;

      const date = activity.startDate.toLocaleDateString("pt-br", {
        day: "numeric",
        month: "numeric",
        weekday: "long"
      });
      if (activitiesByDay[date]) {
        activitiesByDay[date].push(formattedActivity);
      }
      else { activitiesByDay[date] = [formattedActivity]; }
    });

    const eventsDayByLocation: EventDay[] = [];

    for (const eventDay in activitiesByDay) {
      eventsDayByLocation.push({
        date: eventDay,
        mainAuditorium: activitiesByDay[eventDay].filter((event) => event.location === "main_auditorium"),
        sideAuditorium: activitiesByDay[eventDay].filter((event) => event.location === "side_auditorium"),
        workshopRoom: activitiesByDay[eventDay].filter((event) => event.location === "workshop_room")
      });
    }
    
    return eventsDayByLocation;
  }
}

