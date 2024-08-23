import { type InterviewInput } from "@/utils/constants"
import { initCL } from "@/utils/css"
import { StatisticColumn } from "@c/statistic/support"
import URadio from "@c/ui/u-radio/URadio"
import UTitle from "@c/ui/u-title/UTitle"
import styles from "./edit.module.scss"
import { InterviewData } from "./support"

const ROOT = "result-choice"
const cl = initCL(ROOT, styles)

interface Props {
  result: StatisticColumn
  input: InterviewInput
  setResult: (key: keyof InterviewData, nV: string) => void
}

function ResultChoice({ input, result, setResult }: Props) {
  return (
    <fieldset className={cl()}>
      <UTitle className={cl("title")} size={20} tag="legend" title={input.title} weight="m" />
      <div className={cl('radio-wrapper')}>
        <URadio
          className={cl("radio")}
          id={input.name + StatisticColumn.YES}
          name={input.name as string}
          value={StatisticColumn.YES}
          title="Офер"
          checked={result === StatisticColumn.YES}
          setPicked={(nV) => setResult(input.name, nV)}
        />
        <URadio
          className={cl("radio")}
          id={input.name + StatisticColumn.NO}
          name={input.name as string}
          value={StatisticColumn.NO}
          title="Отказ"
          checked={result === StatisticColumn.NO}
          setPicked={(nV) => setResult(input.name, nV)}
        />
        <URadio
          className={cl("radio")}
          id={input.name + StatisticColumn.PROCESS}
          name={input.name as string}
          value={StatisticColumn.PROCESS}
          title="В процессе"
          checked={result === StatisticColumn.PROCESS}
          setPicked={(nV) => setResult(input.name, nV)}
        />
      </div>
    </fieldset>
  )
}

export default ResultChoice
