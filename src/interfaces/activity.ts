import Enrollment from "@/entities/Enrollment";

interface ActivityData {
  id?: number,
  name: string,
  startDate: Date, 
  endDate: Date,
  vacancies: number,    
  subscriptions?: number,
  availableVacancies?: number,
  location: string,  
  enrollment?: Enrollment[]
}

export default ActivityData;
