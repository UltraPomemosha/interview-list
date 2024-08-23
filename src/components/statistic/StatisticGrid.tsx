import { initCL } from "@/utils/css"
import { memo } from "react"
import styles from "./statistic.module.scss"

const ROOT = "grid"
const cl = initCL(ROOT, styles)

interface Props {
  amount: number
}

const initLines = (amount: number) => {
  const res = []
  for (let i = 0; i < amount; i++)
    res.push(<div className={cl("line")} style={{ gridRow: `${i + 2}/${i + 2}` }} key={`line-${i}`}></div>)
  return res
}

const StatisticGrid = memo(({ amount }: Props) => {
  const lines = initLines(amount)
  return <div className={cl()} style={{gridTemplateRows: `1fr repeat(${amount}, 1fr) 1fr`}}>{lines}</div>
})

export default StatisticGrid
