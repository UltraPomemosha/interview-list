import { css, initCL } from "@/utils/css"
import UTitle from "@c/ui/u-title/UTitle"
import { Children, PropsWithChildren, type ReactPortal } from "react"
import { createPortal } from "react-dom"
import styles from "./u-modal.module.scss"

const ROOT = "u-modal"
const cl = initCL(ROOT, styles)

interface Props extends PropsWithChildren {
  title: string
  isShow: boolean
  className?: string
}

export function UModal({ title, children, isShow, className }: Props) {
  return (
    isShow && <div className={`${css(styles, ROOT + 'wrapper')} ${className}`}>
      <article className={cl()}>
        <UTitle tag="h4" size={20} title={title} weight="sb" className={cl("title")} />
        {Children.map(children, (el) => el)}
      </article>
    </div>
  )
}

export const UPortalModal: TypeUPortalModal = (props, element, key?) =>
  createPortal(<UModal {...props}></UModal>, element, key)


type TypeUPortalModal = (
  props: Props,
  element: Element | DocumentFragment,
  key?: null | string,
) => ReactPortal
