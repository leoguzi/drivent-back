import Activity from "@/domain/Activity";
import Enrollment from "@/domain/Enrollment";

interface ActivityData extends Activity{
  subscriptions?: number,
  availableVacancies?: number,
  enrollment?: Enrollment[]
}

export default ActivityData;
