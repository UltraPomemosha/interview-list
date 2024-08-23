import { AppInterview } from "@/global"

export interface InterviewProps extends TypeInterview {
  onDeleteCLick: (id: string, company: string) => void
}

export interface TypeInterview
  extends Omit<AppInterview, "$id" | "$collectionId" | "$databaseId" | "$createdAt" | "$updatedAt" | "$permissions"> {
  id: string
}

export const enum ModalChoice {
  DELETE = "delete",
  CANCEL = "cancel",
}

export const INTERVIEWS_HEADER_COLUMNS: string[] = ["Компания", "О вакансии", "Имя HR", "Контакты", "Результат"]

export const COPY_MESSAGE = "Номер телефона скопирован в буфер обмена"

export type OnModalChoice = (choice: ModalChoice, id: string) => Promise<void>
