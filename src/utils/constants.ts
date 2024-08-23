import { type AddInterviewFormInput } from "@c/add-interview/support"
import { TypeInterview } from "@c/interview-list/support"

export const ADD_INTERVIEW_INPUTS: AddInterviewFormInput[] = [
  {
    title: "Компания",
    name: "company",
    type: "text",
    required: true,
  },
  {
    title: "Описание вакансии",
    name: "description",
    type: "text",
    placeholder: "(ссылка)",
    required: true,
  },
  {
    title: "Контакт",
    name: "contacts",
    type: "text",
    placeholder: "(имя)",
    required: true,
  },
  {
    title: "Telegram",
    name: "telegram",
    type: "text",
    placeholder: "(username)",
    required: false,
  },
  {
    title: "WhatsApp",
    name: "whatsapp",
    type: "text",
    placeholder: "(tel)",
    required: false,
  },
  {
    title: "Телефон",
    name: "tel",
    type: "tel",
    placeholder: "+79781234567",
    required: false,
  },
] as const

export interface InterviewInput extends Omit<AddInterviewFormInput, "name" | "type"> {
  name: keyof Omit<TypeInterview, "id">
  type: AddInterviewFormInput["type"] | "radio"
}

export const INTERVIEW_INPUTS: InterviewInput[] = [
  {
    title: "Зарплата",
    name: "proposedSalary",
    type: "text",
    placeholder: "80 000-120 000",
    required: false,
  },
  {
    title: "Результат",
    name: "result",
    type: "radio",
    required: false,
  },
  ...ADD_INTERVIEW_INPUTS,
]

export const NUMBER_ARRAY = new Array(10).fill("").map((_, i) => `${i}`) // ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
