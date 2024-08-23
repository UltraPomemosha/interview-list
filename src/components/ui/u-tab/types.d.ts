export interface UTabProps {
  id: string
  name: string
  value: string | number
  title: string
  checked?: boolean
  className: string
  setPicked: (nV: UTabProps.value) => void
}

export interface UTabsProps {
  data: Omit<UTabProps, "name" | "checked" | "setPicked" | "className">[]
  name: string
  picked: UTabProps.value
  className: string
  setPicked: (nV: UTabProps.value) => void
}
