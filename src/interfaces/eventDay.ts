import ActivityData from "./activity";

interface EventDay {
    date: string
    mainAuditorium: ActivityData[],
    sideAuditorium: ActivityData[],
    workshopRoom: ActivityData[]
}

export default EventDay;
