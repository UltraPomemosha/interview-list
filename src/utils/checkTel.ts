import { NUMBER_ARRAY } from "./constants"

export const enum TEl_ERRORS {
  INCORRECT_LENGTH = "Длина номера меньше 3-х символов",
  PLUS_ABSENT = "Номер должен начинаться с +",
  NOT_NUMBER = "Номер должен состоять только из + в самом начале и цифр. Без лишних символов",
  OK = 'Номер введён правильно'
}

export const successTelMessageDescription = (type: SuccessType) => `${type} ${TEl_ERRORS.OK.toLowerCase()}`

export const checkTel = (tel: string): TEl_ERRORS => {
  if (tel[0] !== "+") return TEl_ERRORS.PLUS_ABSENT
  else if (tel.length < 3) return TEl_ERRORS.INCORRECT_LENGTH
  else
    return [...tel.substring(1)].every((el) => {
      return el in NUMBER_ARRAY // ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    })
      ? TEl_ERRORS.OK
      : TEl_ERRORS.NOT_NUMBER
}

export type SuccessType = "Tel" | "Whatsapp"
