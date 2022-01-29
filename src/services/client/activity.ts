import Activity from "@/entities/Activity";
import EventDay from "@/interfaces/eventDay";
import IEnrollment from "@/domain/Enrollment";
import NotFoundError from "@/errors/NotFoundError";
import ConflictError from "@/errors/ConflictError";
import * as enrollmentService from "@/services/client/enrollment";

export async function getEventSchedule(): Promise<EventDay[]> {
  return Activity.getEventSchedule();
}

export async function checkIn(activityId: number, enrollment: IEnrollment) {
  const desiredActivity = await Activity.getOneByIdWithAvailableVacancies(activityId);
  
  if(!desiredActivity) {
    throw new NotFoundError(`Não há atividades com id = ${activityId}`);
  }

  if(Activity.isAlreadySubscribed(desiredActivity, enrollment)) {
    throw new ConflictError("Você já está registrado nessa atividade");
  }

  if(desiredActivity.availableVacancies < 1) {
    throw new ConflictError("Não há vagas disponíveis na atividade desejada");
  }

  if (await Activity.hasConflictant(desiredActivity, enrollment)) {
    throw new ConflictError("Você está registrado em uma atividade com horário conflitante");
  }

  const savedEnrollment = await enrollmentService.enrollInAnActivity({ ...enrollment, newActivity: desiredActivity });

  return savedEnrollment;
}
