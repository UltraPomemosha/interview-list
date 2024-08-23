import { InterviewData } from "@/components/interview-list/interview-list-edit/support"
import { useDBData, type Data } from "@/hooks/useDBData"
import { Models } from "appwrite"
import { create } from "zustand"
import { UserStore } from "./auth"

type InterviewsStore = {
  interviews: Data<InterviewData>
  setInterviews: (nV: InterviewsStore["interviews"]) => void
  deleteInterview: (id: string, user: UserStore["user"]) => Promise<void>
  editInterview: (id: string, newData: Partial<InterviewData>, user: UserStore["user"]) => Promise<void>
  getInterviews: (user: UserStore["user"]) => Promise<Data<InterviewData> | never[]>
  createInterview: (
    id: string,
    data: Omit<Models.Document, keyof Models.Document>,
    user: UserStore["user"],
  ) => Promise<void>
}

export const useInterviewsStore = create<InterviewsStore>((set, get) => {
  const { deleteDataFromDB, editDataFromDB, createDBData, getDataFromDB } = useDBData<InterviewData>(
    import.meta.env.VITE_DB_ID,
    import.meta.env.VITE_COLLECTION_ID,
  )

  return {
    interviews: [],
    setInterviews: (nV) => set({ interviews: [...nV] }),
    getInterviews: async (user) => {
      const data = await getDataFromDB(user?.email || "")
      return data
    },
    deleteInterview: async (id, user) => {
      await deleteDataFromDB(id)
      get().setInterviews(await get().getInterviews(user))
    },
    editInterview: async (id, newData, user) => {
      await editDataFromDB(id, newData)
      get().setInterviews(await get().getInterviews(user))
    },
    createInterview: async (id, data, user) => {
      await createDBData(id, data)
      get().setInterviews(await get().getInterviews(user))
    },
  }
})
