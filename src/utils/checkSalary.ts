import { NUMBER_ARRAY } from "@/utils/constants"

export const enum SALARY_ERRORS {
  HYPHEN_LIMIT_ERROR = 'Возможен только один дефис',
  NOT_A_NUMBER_ERROR = 'Зарплата может содержать только \'-\', пробел и цифры',
  ENDS_ON_HYPHEN = 'Зарплата не должна заканчиваться на дефис',
  STARTS_ON_HYPHEN = 'Зарплата не должна начинаться на дефис',
  STARTS_ON_ZERO = 'Число не может начинаться с 0',
  OK = 'Зарплата успешно заполнена'
}

export const checkSalary = (salary: string): SALARY_ERRORS => {
  salary = salary.trim()
  if (salary[salary.length - 1] === '-') return SALARY_ERRORS.ENDS_ON_HYPHEN
  if (salary[0] === '-') return SALARY_ERRORS.STARTS_ON_HYPHEN
  if (salary[0] === '0') return SALARY_ERRORS.STARTS_ON_ZERO
  let countOfHyphenLimit = 1;
  for (let i = 0; i < salary.length; i++) {
    const l = salary[i]
    if (l === '-') {
      countOfHyphenLimit--;
      if (countOfHyphenLimit < 0) return SALARY_ERRORS.HYPHEN_LIMIT_ERROR
      if (salary[i + 1] === '0') return SALARY_ERRORS.STARTS_ON_ZERO
    }
    else if (!(l in NUMBER_ARRAY) && l !== ' ') return SALARY_ERRORS.NOT_A_NUMBER_ERROR
  }
  return SALARY_ERRORS.OK
}
