import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  Between,
  Not
} from "typeorm";

import IActivity from "../domain/Activity";
import Enrollment from "./Enrollment";
import EventDay from "@/interfaces/eventDay";
import ActivityData from "@/interfaces/activity";
import IEnrollment from "@/domain/Enrollment";

@Entity("activities")
export default class Activity extends BaseEntity implements IActivity {
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

  getFomattedInitialDate() {
    return this.startDate.toLocaleDateString("pt-br", {
      day: "numeric",
      month: "numeric",
      weekday: "long"
    });
  }

  getAvailableVacancies() {
    return this.vacancies - this.enrollment.length;
  }

  isAlreadySubscribed(enrollment: IEnrollment) {
    return !!this.enrollment.find(alreadySubscribed => alreadySubscribed.id === enrollment.id);
  } 

  static hideEnrollments(activity: ActivityData) {
    const activityCopy = { ...activity };
    delete activityCopy.enrollment;
    return activityCopy;
  }

  static formatActivityData(activity: Activity, enrollment: IEnrollment) {
    const formattedData = {
      ...activity,
      availableVacancies: activity.getAvailableVacancies(),
      isSubscribed: activity.isAlreadySubscribed(enrollment)
    };
    return this.hideEnrollments(formattedData);
  }

  static async getOneByIdWithEnrollments(activityId: number) {
    return Activity.findOne({ where: { id: activityId }, relations: ["enrollment"] });
  }

  static async hasConflictant(desiredActivity: IActivity, enrollment: IEnrollment) {
    const conflictantsActivities = await this.find(
      {
        where: [
          { 
            id: Not(desiredActivity.id),
            startDate: Between(desiredActivity.startDate, desiredActivity.endDate)
          },
          { 
            id: Not(desiredActivity.id),
            endDate: Between(desiredActivity.startDate, desiredActivity.endDate)
          }
        ],
        relations: [
          "enrollment"
        ]
      }
    );

    return conflictantsActivities.filter(
      activity => activity.isAlreadySubscribed(enrollment)
    ).length > 0;
  }

  static async getAllActivitiesByDay(enrollment: IEnrollment) {
    const activities = await Activity.find({ relations: ["enrollment"] });

    const activitiesByDay= {} as {
      [key: string]: ActivityData[];
    };

    activities.forEach((activity: Activity) => {
      const date = activity.getFomattedInitialDate();
      
      const formattedActivity = this.formatActivityData(activity, enrollment);

      if (activitiesByDay[date]) {
        return activitiesByDay[date].push(formattedActivity);
      }
      return activitiesByDay[date] = [formattedActivity];
    });

    return activitiesByDay;
  }

  static async getEventSchedule(enrollment: IEnrollment): Promise<EventDay[]> {
    const activitiesByDay = await this.getAllActivitiesByDay(enrollment);
    
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

