import Enrollment from "@/domain/Enrollment";
import { createCertificate } from "../../utils/certificateGenerator";

export async function generateCertificate(enrollment: Enrollment) {
  await createCertificate();
}
