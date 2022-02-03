import Enrollment from "@/domain/Enrollment";
import Ticket from "@/domain/Ticket";
import * as activityService from "@/services/client/activity";
import { createCertificate } from "@/utils/certificateGenerator";

export async function getCertificatePDF(enrollment: Enrollment, ticket: Ticket) {
  const certificateData = await getCertificateData(enrollment, ticket);

  const certificate = await createCertificate(certificateData);
  
  return certificate;
}

export async function getCertificateData(enrollment: Enrollment, ticket: Ticket) {
  return {
    name: enrollment.name,
    ticketType: ticket.type,
    hours: await activityService.getEventTotalHours()
  };
}
