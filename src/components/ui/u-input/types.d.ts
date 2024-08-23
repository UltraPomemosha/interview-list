import { InputHTMLAttributes } from "react"

export interface UInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: "email" | "text" | "password" | "tel"
  name: string
  value: string
  title: string
  handleFunction: (nV: string) => void
}
