/* eslint-disable @typescript-eslint/no-explicit-any */
export type TextWeight = "m" | "sb" | "b"
export type TextSize = 16 | 18 | 20 | 24 | 30 | 36 | 48 | 60 | 72 | 96 | 128

export interface UTitleProps {
  tag: string
  title: string
  size: TextSize
  weight: TextWeight
  className: string
  [key: string]: any
}
