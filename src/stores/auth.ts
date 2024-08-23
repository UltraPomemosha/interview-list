/* eslint-disable prefer-const */
import { account } from "@/lib/appwrite"
import { Models } from "appwrite"
import { create } from "zustand"

export type UserStore = {
  user: Models.User<Models.Preferences> | null
  updateUser: (nV: UserStore["user"]) => void
}

export const useUserStore = create<UserStore>((set) => {
  const getUser = async () => {
    const hasStorageUser = localStorage.getItem("cookieFallback")
    const user = hasStorageUser ? await account.get(): null
    return user
  }

  let user: UserStore['user'] = null
  const updateUser: UserStore['updateUser'] = (nV) => set({ user: nV })
  const initUser = async () => {updateUser(await getUser())}
  initUser()

  return {
    user,
    updateUser
  }
})
