import { AppInterview } from "@/global";
import { StatisticColumn } from "@c/statistic/support";

// constants
export const SAVE_SUCCESS_MESSAGE = "Сохранено"

// types
export interface InterviewData extends AppInterview {
  proposedSalary: `${number}-${number}` | ''
  result: StatisticColumn
}
