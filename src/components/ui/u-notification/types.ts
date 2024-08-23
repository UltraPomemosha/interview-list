
export type UNotificationProps = {
  type: UNotificationType
  description: string
  className?: string
}

export type UNotificationType = 'error' | 'message' | 'success'
