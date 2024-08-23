import { type AppInterview } from "@/global"

// constants
export const DEFAULT_DATA: AddInterviewFormData = {
  company: "",
  description: "",
  contacts: "",
  telegram: "",
  whatsapp: "",
  tel: "",
}

export const CREATE_SUCCESS_MESSAGE = "Собеседование успешно создано"
export const CREATE_ERROR_MESSAGE = "Упс, что-то пошло не так"

// functions


// types
export interface AddInterviewFormInput {
  type: "email" | "text" | "password" | "tel"
  name: AddInterviewFormDataFields
  title: string
  placeholder?: string
  required: boolean
}

export interface AddInterviewFormData extends Omit<AppInterview, "result"> {}

export type AddInterviewFormDataFields = keyof AddInterviewFormData
