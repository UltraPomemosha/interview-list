import { css, initCL } from "@/utils/css"
import { createPortal } from "react-dom"
import styles from "./u-loader.module.scss"

const ROOT = "u-loader"
const cl = initCL(ROOT, styles)
interface Props {
  className?: string
}

export function ULoader({ className }: Props) {
  return (
    <div className={`${css(styles, `${ROOT}-wrapper`)} ${className}`}>
      <div className={cl()}>
        <div className={`${cl("circle", "circle_first")}`} />
        <div className={`${cl("circle", "circle_second")}`} />
      </div>
    </div>
  )
}

export const UPortalLoader = ({ className }: Props) =>
  createPortal(<ULoader className={className} />, document.getElementById("root")!)
