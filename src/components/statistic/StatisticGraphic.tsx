import { useInterviewsStore } from "@/stores/interviews"
import { css, initCL } from "@/utils/css"
import UTitle from "@c/ui/u-title/UTitle"
import { useCallback, useMemo } from "react"
import styles from "./statistic.module.scss"
import StatisticGraphicCol from "./StatisticGraphicCol"
import StatisticGrid from "./StatisticGrid"
import { COLUMNS, COLUMNS__TITLES, INTERVIEWS_AMOUNT_LIMIT, StatisticColumn, type Values } from "./support"

const ROOT = "statistic-graphic"
const cl = initCL(ROOT, styles)

const getPointValue = (length: number): number => {
  const DIVISORS = [2, 3, 4, 5].reverse()
  for (const n of DIVISORS) {
    if (length % n === 0) return n
  }
  for (const n of DIVISORS) {
    if (length % n === 1) return n
  }
  return 0
}

function StatisticGraphic() {
  const { interviews } = useInterviewsStore((state) => ({
    interviews: state.interviews,
  }))

  const values = useMemo(() => {
    const result: Values = {
      offer: 0,
      fail: 0,
      process: 0,
    }
    for (const interview of interviews) result[interview.result as StatisticColumn]++
    return result
  }, [interviews])

  const minAndMax = useMemo(() => {
    const SORTED = Object.values(values).sort((a, b) => a - b)
    return { min: SORTED[0], max: SORTED[2] }
  }, [values])

  const getAmountBreakpoints = useCallback((min: number, max: number): number[] => {
    let length = max
    const result: number[] = []
    const MIN = min
    if (!length) return result
    if (length >= INTERVIEWS_AMOUNT_LIMIT) {
      const POINT_VALUE = getPointValue(length)
      if (length % POINT_VALUE !== 0) {
        result.push(length)
        length -= (length % POINT_VALUE) + POINT_VALUE
      }
      while (length > 0) {
        result.push(length)
        length -= POINT_VALUE
      }
      result.push(MIN)
    } else {
      while (length > 0) {
        result.push(length)
        length--
      }
    }
    return result
  }, [])

  const breakpoints = useMemo(
    () => getAmountBreakpoints(minAndMax.min, minAndMax.max),
    [minAndMax, getAmountBreakpoints],
  )

  return interviews.length ? (
    <section
      className={cl()}
      style={{
        gridTemplateRows: `1fr repeat(${breakpoints.length}, 1fr) 1fr`,
      }}
    >
      <StatisticGrid amount={breakpoints.length} />
      <UTitle tag="h1" className={cl("title")} size={30} title="Статистика" weight="b" />

      {breakpoints.map((point, index) => (
        <UTitle tag="p" size={24} title={`${point}`} weight="sb" className={cl("point")} key={`${point}-${index}`} />
      ))}

      {COLUMNS.map((col) => (
        <StatisticGraphicCol
          {...col}
          gridRow={`3/${breakpoints.length + 2}`}
          maxValue={minAndMax.max}
          className={cl("column")}
          value={values[col.type]}
          key={col.title + "column"}
        />
      ))}

      {COLUMNS__TITLES.map(({ title, classModifier }) => (
        <UTitle
          style={{ gridRow: `${breakpoints.length + 2}/${breakpoints.length + 2}` }}
          tag="h3"
          className={`${cl("column-title")} ${css(styles, classModifier)}`}
          size={20}
          title={title}
          weight="sb"
          key={title}
        />
      ))}
    </section>
  ) : (
    <UTitle
      tag="h1"
      className={cl("never-title")}
      title="Пока не добавлено ни одного собеседования"
      size={48}
      weight="b"
    />
  )
}

export default StatisticGraphic
