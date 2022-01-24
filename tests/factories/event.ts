import faker from "faker";
import Setting from "../../src/entities/Setting";

export default async function createEvent() {
  const startDate = faker.date.past(1);
  const endDate = faker.date.between(startDate, new Date());
  const eventTitle = faker.datatype.string(30);
  const backgroundImage = faker.image.imageUrl();
  const logoImage = faker.image.imageUrl();

  return Setting.createNew(startDate, endDate, eventTitle, backgroundImage, logoImage);
}
