import { css } from "@/utils/css"
import { UInputProps } from "./types"
import styles from "./u-input.module.scss"

function UInput({ type, name, value, handleFunction, className, title, ...props }: UInputProps) {
  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFunction(e.currentTarget.value as string)
  }

  return (
    <label className={`${css(styles, 'label')} ${className}`}>
      <span className={css(styles, 'title')}>{title}</span>
      <input
        className={css(styles, "u-input")}
        onInput={onInput}
        type={type}
        name={name}
        value={value}
        {...props}
      />
    </label>
  )
}

export default UInput
