import { css, initCL } from "@/utils/css"
import UTitle from "@c/ui/u-title/UTitle"
import styles from "./interview-list.module.scss"
import { INTERVIEWS_HEADER_COLUMNS } from "./support"

const cl = initCL("interview", styles)
function InterviewListHeader() {
  return (
    <header className={`${cl()} ${css(styles, "interview-list__header")}`}>
      {INTERVIEWS_HEADER_COLUMNS.map((title) => (
        <UTitle tag="h3" size={20} title={title} weight="sb" className={cl("item")} key={title} />
      ))}
      <div className={cl("item")}></div>
    </header>
  )
}

export default InterviewListHeader
