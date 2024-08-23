import { StatisticColumn } from "@c/statistic/support"
import { Models } from "appwrite"

export type TypeScssColor =
  | "$color-50"
  | "$color-100"
  | "$color-200"
  | "$color-300"
  | "$color-400"
  | "$color-500"
  | "$color-600"
  | "$color-700"
  | "$color-800"
  | "$color-900"
  | "$color-950"
  | "$color-1000"
  | "$error-color"
  | "$success-color"
  | "$transparent"
  | "$telegram-color"
  | "$whatsapp-color"

export type TypeCssColor =
  | "var(--color-50)"
  | "var(--color-100)"
  | "var(--color-200)"
  | "var(--color-300)"
  | "var(--color-400)"
  | "var(--color-500)"
  | "var(--color-600)"
  | "var(--color-700)"
  | "var(--color-800)"
  | "var(--color-900)"
  | "var(--color-950)"
  | "var(--color-1000)"

export const APP_COLORS: AppColors = {
  "$color-50": "#fffaec",
  "$color-100": "#fff4d3",
  "$color-200": "#ffe5a5",
  "$color-300": "#ffd16d",
  "$color-400": "#ffb132",
  "$color-500": "#ff980a",
  "$color-600": "#f07800",
  "$color-700": "#cc5d02",
  "$color-800": "#a1480b",
  "$color-900": "#823d0c",
  "$color-950": "#461c04",
  "$color-1000": "#181818",
  "$error-color": "#d32f2f",
  "$success-color": "#5cb85c",
  "$transparent": "rgba(255, 250, 236, 0.03)", //color-50
  "$telegram-color": "#24a1de",
  "$whatsapp-color": "#25d366",
}

export type AppColors = Record<TypeScssColor, string>


export interface AppInterview extends Models.Document {
  company: string
  description: string
  contacts: string
  telegram: string
  whatsapp: string
  tel: string
  result: StatisticColumn
}
