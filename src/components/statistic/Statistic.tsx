import { css } from "@/utils/css"
import AppContainer from "@c/app-container/AppContainer"
import styles from "./statistic.module.scss"
import StatisticGraphic from "./StatisticGraphic"

function Statistic() {
  return (
    <AppContainer className={css(styles, "statistic-container")}>
      <StatisticGraphic />
    </AppContainer>
  )
}

export default Statistic
