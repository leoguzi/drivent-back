import faker from "faker";
import Activity from "../../src/entities/Activity";
import ActivityData from "../../src/interfaces/activity";

export default async function createActivity(): Promise<Activity> {
  const locations = ["main_auditorium", "side_auditorium", "workshop_room"];

  const activityData: ActivityData = {
    name: faker.name.firstName(),
    startDate: faker.date.recent(),
    endDate: faker.date.recent(),
    vacancies: faker.datatype.number({ min: 0, max: 50 }),
    location: locations[faker.datatype.number({ min: 0, max: 2 })]  
  };
  return Activity.createNew(activityData);
}
