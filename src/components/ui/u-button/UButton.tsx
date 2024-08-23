import { css } from "@/utils/css"
import { ButtonHTMLAttributes } from "react"
import styles from "./u-button.module.scss"

interface Props {
  title: string
  className?: string
  handleFunction?: () => void
}

function UButton({ title, className, handleFunction, ...props }: Props & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <>
      <button onClick={handleFunction} className={`${css(styles, "u-button")} ${className}`} {...props}>
        {title}
      </button>
    </>
  )
}

export default UButton
