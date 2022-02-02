import Activity from "@/entities/Activity";
import EventDay from "@/interfaces/eventDay";
import IEnrollment from "@/domain/Enrollment";
import NotFoundError from "@/errors/NotFoundError";
import ConflictError from "@/errors/ConflictError";
import * as enrollmentService from "@/services/client/enrollment";

export async function getEventSchedule(enrollment: IEnrollment): Promise<EventDay[]> {
  return Activity.getEventSchedule(enrollment);
}

export async function checkIn(activityId: number, enrollment: IEnrollment) {
  const desiredActivity = await Activity.getOneByIdWithEnrollments(activityId);
  
  if(!desiredActivity) {
    throw new NotFoundError(`Não há atividades com id = ${activityId}`);
  }

  if(desiredActivity.isAlreadySubscribed(enrollment)) {
    throw new ConflictError("Você já está registrado nessa atividade");
  }

  if(desiredActivity.getAvailableVacancies() < 1) {
    throw new ConflictError("Não há vagas disponíveis na atividade desejada");
  }

  if (await Activity.hasConflictant(desiredActivity, enrollment)) {
    throw new ConflictError("Você está registrado em uma atividade com horário conflitante");
  }

  const savedEnrollment = await enrollmentService.enrollInAnActivity({ ...enrollment, newActivity: desiredActivity });

  return savedEnrollment;
}

export async function getEventTotalHours(): Promise<number> {
  return Activity.getEventTotalHours();
}
