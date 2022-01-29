import EnrollmentData from "@/interfaces/enrollment";
import Enrollment from "@/entities/Enrollment";

export async function createNewEnrollment(enrollmentData: EnrollmentData) {
  await Enrollment.createOrUpdate(enrollmentData);
}

export async function enrollInAnActivity(enrollmentData: EnrollmentData) {
  return Enrollment.createOrUpdate(enrollmentData);
}

export async function getEnrollment(userId: number) {
  return Enrollment.getOneByParameter({ userId });
}

export async function getEnrollmentWithAddress(userId: number) {
  return Enrollment.getOneByParameterWithAddress({ userId });
}

export async function getEnrollmentWithTicket(userId: number) {
  return Enrollment.getOneByParameterWithTicket({ userId });
}
