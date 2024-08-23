export const enum Choice {
  CREATE = "create",
  AUTH = "auth",
}

export const enum FormTitle {
  CREATE = "Регистрация",
  AUTH = "Авторизация",
}

export const enum SendButtonTitle {
  CREATE = "Зарегистрироваться",
  AUTH = "Войти",
}

// constants
export const LOGIN_ERROR_MESSAGE =
  "Упс, либо база данных слетела, либо аккаунта не существует, либо некорректный логин или пароль."
export const CREATE_ERROR_MESSAGE = "Упс, либо база данны слетела, либо у Вас отсутствует подключение к Интернету."

// functions
export const getTitle = (picked: Choice, obj: ObjTitleName): FormTitle | SendButtonTitle => {
  if (obj === "button") return picked === Choice.AUTH ? SendButtonTitle.AUTH : SendButtonTitle.CREATE
  else return picked === Choice.AUTH ? FormTitle.AUTH : FormTitle.CREATE
}



// types
export interface AuthFormContentProps {
  picked: Choice
  title: string
  formData: FormData
  setFormData: (nV: FormData) => void
}

export interface FormData {
  password: string
  email: string
}

export type ObjTitleName = "button" | "form"
