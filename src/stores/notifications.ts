import { UNotificationType } from "@c/ui/u-notification/types"
import { create } from "zustand"

export type Notification = {
  id: number
  global: boolean
  description: string
  type: UNotificationType
}

export interface NotificationsStore {
  notifications: Notification[]
  updateNotifications: (nV: Notification) => void
  updateGlobalNotifications: (type: UNotificationType, description: string) => void
  nullNotifications: () => void
}

const notificationState: Pick<NotificationsStore, 'notifications'> = {
  notifications: []
}

export const useNotificationsStore = create<NotificationsStore>((set, get) => ({
  ...notificationState,
  updateNotifications: (nV) => set({notifications: [nV]}),
  updateGlobalNotifications: (type, description) => get().updateNotifications({
    id: Math.random() + Date.now(),
    global: true,
    description,
    type,
  }),
  nullNotifications: () => set(notificationState),
}))
