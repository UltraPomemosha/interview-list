import { useNotificationsStore } from "@/stores/notifications"
import { initCL } from "@/utils/css"

import UNotification from "@c/ui/u-notification/UNotification"
import styles from "./app-notifications.module.scss"

const cl = initCL("app-notifications", styles)

function AppNotifications() {
  const notifications = useNotificationsStore((state) => state.notifications)
  return (
    <div className={cl()} style={{display: notifications.length ? 'flex': 'none'}}>
      {notifications.map(({ id, type, global, description }) => {
        if (global) {
          return (
            <UNotification className={cl('notification')} description={description} type={type} key={id} />
          )
        }
      })}
    </div>
  )
}

export default AppNotifications
