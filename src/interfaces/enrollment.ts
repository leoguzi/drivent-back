import Enrollment from "@/domain/Enrollment";
import AddressData from "./address";

interface EnrollmentData extends Enrollment{
  address: AddressData,
}

export default EnrollmentData;
