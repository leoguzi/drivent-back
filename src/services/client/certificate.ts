import Enrollment from "@/domain/Enrollment";
import Ticket from "@/domain/Ticket";
import * as activityService from "@/services/client/activity";

export async function getCertificatePDF(enrollment: Enrollment, ticket: Ticket) {
  const certificateData = await getCertificateData(enrollment, ticket);

  /* 
  criar o pdf aqui
  */

  return certificateData;
}

export async function getCertificateData(enrollment: Enrollment, ticket: Ticket) {
  return {
    name: enrollment.name,
    ticketType: ticket.type,
    hours: await activityService.getEventTotalHours()
  };
}
