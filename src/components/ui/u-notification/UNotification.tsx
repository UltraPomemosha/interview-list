import { useTimeout } from "@/hooks/useTimer"
import { useNotificationsStore } from "@/stores/notifications"
import { css, initCL } from "@/utils/css"
import UErrorIcon from "@c/ui/u-icons/UErrorIcon"
import UMessageIcon from "@c/ui/u-icons/UMessageIcon"
import USuccessIcon from "@c/ui/u-icons/USuccessIcon"
import UTitle from "@c/ui/u-title/UTitle"
import { ReactNode } from "react"
import { type UNotificationProps, type UNotificationType } from "./types"
import styles from "./u-notification.module.scss"

const cl = initCL("u-notification", styles)

const getMessageIcon = (type: UNotificationType): ReactNode => {
  let node: ReactNode
  switch (type) {
    case "message":
      node = <UMessageIcon />
      break
    case "error":
      node = <UErrorIcon />
      break
    case "success":
      node = <USuccessIcon />
      break
  }
  return node
}

function UNotification({ type, description, className }: UNotificationProps) {
  const nullNotifications = useNotificationsStore((state) => state.nullNotifications)
  const currentClass = `${cl()} ${className || ""} ${type === "message" ? "" : css(styles, "_" + type)}`

  useTimeout(nullNotifications, 4900)

  return (
    <div className={currentClass}>
      <div className={cl('title-wrapper')}>
        {getMessageIcon(type)}
        <UTitle className={cl("title")} size={18} tag="h4" title={type} weight="sb" />
      </div>
      <p className={cl("description")}>{description}</p>
    </div>
  )
}

export default UNotification
