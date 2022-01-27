import Activity from "@/entities/Activity";
import EventDay from "@/interfaces/eventDay";

export async function getAllActivities(): Promise<EventDay[]> {
  const activities = await Activity.getAllActivities();
  return activities;
}
