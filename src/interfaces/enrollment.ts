import Enrollment from "@/domain/Enrollment";
import AddressData from "./address";
import ActivityData from "./activity";

interface EnrollmentData extends Enrollment{
  address?: AddressData;
  newActivity?: ActivityData;
}

export default EnrollmentData;
