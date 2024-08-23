import { create } from "zustand"

interface Store {
  contentIsLoading: boolean
  isLoading: boolean
  setIsLoading: (nV: boolean) => void
  setContentIsLoading: (nV: boolean) => void
}

export const useLoaderStore = create<Store>((set) => ({
  contentIsLoading: false,
  isLoading: false,
  setIsLoading: (nV) => set({ isLoading: nV }),
  setContentIsLoading: (nV) => set({contentIsLoading: nV})
}))
