import { useNotificationsStore } from "@/stores/notifications"
import { checkSalary, SALARY_ERRORS } from "@/utils/checkSalary"
import { useEffect } from "react"

export const useSalaryCheck: UseSalaryCheck = ({ salary }) => {
  const updateGlobalNotifications = useNotificationsStore((state) => state.updateGlobalNotifications)
  useEffect(() => {
    if (salary) {
      const TEL_STATE = checkSalary(salary)
      updateGlobalNotifications(TEL_STATE === SALARY_ERRORS.OK ? "success" : "error", TEL_STATE as string)
    }
  }, [salary, updateGlobalNotifications])
}

type UseSalaryCheck = (dep: Dep) => void

type Dep = { salary: string }
