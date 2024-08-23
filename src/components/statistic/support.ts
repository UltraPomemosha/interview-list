// enums
export const enum StatisticColumn {
  YES = "offer",
  NO = "fail",
  PROCESS = "process",
}

// constants
export const INTERVIEWS_AMOUNT_LIMIT = 5
export const COLUMNS: Omit<GraphicColumnProps, "className" | "value" | "gridRow" | 'maxValue'>[] = [
  { title: "Офер", type: StatisticColumn.YES },
  { title: "Отказ", type: StatisticColumn.NO },
  { title: "В процессе", type: StatisticColumn.PROCESS },
]
export const COLUMNS__TITLES: { title: string; classModifier: `_${StatisticColumn}` }[] = [
  {
    title: "Офер",
    classModifier: "_offer",
  },
  {
    title: "Отказ",
    classModifier: "_fail",
  },
  {
    title: "В Процессе",
    classModifier: "_process",
  },
]

// types
export type Values = {
  [StatisticColumn.YES]: number
  [StatisticColumn.NO]: number
  [StatisticColumn.PROCESS]: number
}

export interface GraphicColumnProps {
  title: string
  type: StatisticColumn
  value: number
  className?: string
  gridRow: `${number}/${number}`
  maxValue: number
}
