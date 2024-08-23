import { css } from "@/utils/css"
import { Children, PropsWithChildren } from "react"
import styles from "./app-container.module.scss"

type Props = PropsWithChildren<{
  className?: string
}>

function AppContainer({ children, className }: Props) {
  return <div className={`${css(styles, "app-container")} ${className || ""}`}>{
    Children.map(children, (el) => <>{el}</>)
  }</div>
}

export default AppContainer
