import Activity from "@/domain/Activity";
import Enrollment from "@/domain/Enrollment";

interface ActivityData extends Activity{
  isSubscribed?: boolean,
  availableVacancies?: number,
  enrollment?: Enrollment[]
}

export default ActivityData;
