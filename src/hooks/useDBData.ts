import { databases } from "@/lib/appwrite"
import { Models, Query } from "appwrite"

export const useDBData = <T = unknown>(dbID: string, clID: string): ReturnValue<T> => {
  const getDataFromDB: ReturnValue<T>["getDataFromDB"] = async (index) => {
    if (index) {
      const value = await databases.listDocuments(dbID, clID, [Query.equal("email", index)])
      return value.documents as (Models.Document & T)[]
    } else return []
  }

  const deleteDataFromDB: ReturnValue<T>["deleteDataFromDB"] = async (id) => {
    await databases.deleteDocument(dbID, clID, id) 
  }

  const createDBData: ReturnValue<T>["createDBData"] = async (id, data) => {
    await databases.createDocument(dbID, clID, id, data)
  }

  const editDataFromDB: ReturnValue<T>["editDataFromDB"] = async (id, newData) => {
    await databases.updateDocument(dbID, clID, id, { ...newData })
  }

  return {
    getDataFromDB,
    createDBData,
    deleteDataFromDB,
    editDataFromDB,
  }
}

export type Data<T> = (Models.Document & T)[]
type ReturnValue<T> = {
  getDataFromDB: (index: string) => Promise<Data<T> | never[]>
  deleteDataFromDB: (id: string) => Promise<void>
  createDBData: (id: string, data: Omit<Models.Document, keyof Models.Document>) => Promise<void>
  editDataFromDB: (id: string, newData: Partial<T>) => Promise<void>
}
