import faker from "faker";
import Enrollment from "../../src/entities/Enrollment";
import EnrollmentData from "../../src/interfaces/enrollment";
import AddressData from "../../src/interfaces/address";
import User from "../../src/entities/User";

faker.locale = "pt_BR";

export default function createEnrollment(user: User): Promise<Enrollment> {
  const address: AddressData = {
    cep: faker.address.zipCode(),
    street: faker.address.streetName(),
    city: faker.address.cityName(),
    number: String(faker.datatype.number()),
    state: faker.address.stateAbbr(),
    neighborhood: faker.address.cityName(),
    addressDetail: faker.datatype.string(),
  };

  const enrollment: EnrollmentData = {
    name: `${faker.name.firstName} ${faker.name.lastName}`,
    cpf: "000.000.000-00",
    birthday: "01-01-1970",
    phone: "(00) 99999-9999", 
    userId: user.id,
    address,
  };

  return Enrollment.createOrUpdate(enrollment);
}
