import { createElement } from "react"
import type { TextSize, TextWeight, UTitleProps } from "./types"

function UTitle({ tag, title, size, weight, className, ...props }: UTitleProps) {
  const getClass = (s: TextSize, w: TextWeight) => `text-${s}${w !== 'm' ? '-' + w: ''}`
  return (
    <>
      {createElement(tag, {
        className: `${className} ${getClass(size, weight)}`,
        children: title,
        ...props
      })}
    </>
  )
}

export default UTitle
