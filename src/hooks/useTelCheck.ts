import { useNotificationsStore } from "@/stores/notifications"
import { checkTel, successTelMessageDescription, type SuccessType, TEl_ERRORS } from "@/utils/checkTel"
import { useEffect } from "react"

export const useTelCheck: UseTelCheck = ({ tel }, successType) => {
  const updateGlobalNotifications = useNotificationsStore((state) => state.updateGlobalNotifications)
  useEffect(() => {
    if (tel) {
      const TEL_STATE = checkTel(tel)
      if (TEL_STATE === TEl_ERRORS.OK) {
        updateGlobalNotifications("success", successTelMessageDescription(successType))
      } else {
        updateGlobalNotifications("error", TEL_STATE)
      }
    }
  }, [tel, updateGlobalNotifications, successType])
}

type UseTelCheck = (dep: Dep, successType: SuccessType) => void

type Dep = { tel: string }
