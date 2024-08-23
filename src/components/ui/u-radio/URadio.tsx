import { initCL } from "@/utils/css"
import UTitle from "@c/ui/u-title/UTitle"
import styles from "./u-radio.module.scss"

const ROOT = "u-radio"
const cl = initCL(ROOT, styles)

interface Props {
  id: string
  name: string
  value: string
  title: string
  checked?: boolean
  className?: string
  setPicked: (nV: Props["value"]) => void
}

function URadio({ id, name, title, className, setPicked, ...props }: Props) {
  return (
    <>
      <input
        onChange={(e) => setPicked(e.target.value)}
        id={id}
        className={cl("input")}
        {...props}
        name={name}
        type="radio"
      />
      <label htmlFor={id} className={`${cl()} ${className}`}>
        <div className={cl("circle")} />
        <UTitle title={title} size={20} tag="span" weight="m" className={cl("title")} />
      </label>
    </>
  )
}

export default URadio
