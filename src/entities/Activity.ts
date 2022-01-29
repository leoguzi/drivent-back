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

  static getAvailableVacancies(activity: ActivityData) {
    const activityCopy = { ...activity };
    activityCopy.availableVacancies = activity.vacancies - activity.enrollment.length;
    return activityCopy;
  }

  static getSubscriptions(activity: ActivityData) {
    const activityCopy = { ...activity };
    activityCopy.subscriptions = activity.enrollment.length;
    return activityCopy;
  }

  static hideEnrollments(activity: ActivityData) {
    const activityCopy = { ...activity };
    delete activityCopy.enrollment;
    return activityCopy;
  }

  static isAlreadySubscribed(activity: ActivityData, enrollment: IEnrollment) {
    return activity.enrollment.find(alreadySubscribed => alreadySubscribed.id === enrollment.id);
  } 
  
  static async getOneByParameter(parameter: {[index: string]: unknown}, relations: string[] = null) {
    return Activity.findOne({ where: parameter, relations });
  }

  static async getByParameter(parameter: {[index: string]: unknown}, relations: string[] = null) {
    return Activity.find({ where: parameter, relations });
  }

  static async getOneByIdWithAvailableVacancies(activityId: number) {
    const activity = await Activity.getOneByParameter({ id: activityId }, ["enrollment"]);

    const formattedActivity = this.getAvailableVacancies(activity);
    return formattedActivity;
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
      activity => Activity.isAlreadySubscribed(activity, enrollment)
    ).length > 0;
  }

  static async getAllActivitiesByDay() {
    const activities = await Activity.find({ relations: ["enrollment"] });

    const activitiesByDay= {} as {
      [key: string]: ActivityData[];
    };

    activities.forEach((activity: Activity) => {
      const date = activity.getFomattedInitialDate();
      
      let formattedActivity = this.getAvailableVacancies(activity);
      formattedActivity = this.getSubscriptions(formattedActivity);
      formattedActivity = this.hideEnrollments(formattedActivity);

      if (activitiesByDay[date]) {
        return activitiesByDay[date].push(formattedActivity);
      }
      return activitiesByDay[date] = [formattedActivity];
    });

    return activitiesByDay;
  }

  static async getEventSchedule(): Promise<EventDay[]> {
    const activitiesByDay = await this.getAllActivitiesByDay();
    
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

