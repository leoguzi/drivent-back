import faker from "faker";
import Activity from "../../src/entities/Activity";
import ActivityData from "../../src/interfaces/activity";

export default async function createActivity(): Promise<Activity> {
  const activityData: ActivityData = {
    name: faker.name.firstName(),
    startDate: faker.date.recent(),
    endDate: faker.date.recent(),
    vacancies: faker.datatype.number({ min: 0, max: 50 }),
    location: faker.name.firstName()  
  };
  return Activity.createNew(activityData);
}
