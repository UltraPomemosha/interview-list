import { Account, Client, Databases } from "appwrite"

export const client = new Client()

client.setEndpoint(import.meta.env.VITE_API_URL).setProject(import.meta.env.VITE_PROJECT_ID)

export const account = new Account(client)
export const databases = new Databases(client)
export { ID } from "appwrite"

