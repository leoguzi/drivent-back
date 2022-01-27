import Activity from "@/entities/Activity";

interface EventDay {
    date: string
    mainAuditorium: Activity[],
    sideAuditorium: Activity[],
    workshopRoom: Activity[]
}

export default EventDay;
