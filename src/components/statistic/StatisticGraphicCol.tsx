import { css } from "@/utils/css"
import styles from './statistic.module.scss'
import { type GraphicColumnProps } from "./support"

function StatisticGraphicCol({ type, title, value, className, gridRow, maxValue }: GraphicColumnProps) {
  const gap = `${22 * (value / maxValue)}px`
  const heightValue = +value / maxValue * 100
  const height = `calc(${!isFinite(heightValue) ? '0': heightValue}% + ${value ? gap: ''})` 

  return (
    <article data-before={`${title}: ${value}`} className={`${className} ${css(styles, '_' + type)}`} style={{
      height, // height + gap
      gridRow
    }} />
  )
}

export default StatisticGraphicCol
