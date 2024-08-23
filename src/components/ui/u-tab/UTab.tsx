import UTitle from "../u-title/UTitle"
import { UTabProps } from "./types"
import styles from "./u-tab.module.scss"

function UTab({ id, name, value, title, checked = false, setPicked, className }: UTabProps) {
  const setNewPicked = () => {
    setPicked(value)
  }

  return (
    <>
      <input
        onChange={setNewPicked}
        className={styles["u-tab-input"]}
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
      />
      <UTitle
        className={`${styles["u-tab-label"]} ${className}`}
        htmlFor={id}
        tag="label"
        size={18}
        title={title}
        weight="m"
      />
    </>
  )
}

export default UTab
