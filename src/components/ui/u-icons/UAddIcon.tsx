import { APP_COLORS } from '@/global.ts'
import { UIconProps } from './types'

function UAddIcon({ size = 24, color = '$color-50' }: UIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill={color}>
      <line
        fill="none"
        stroke={APP_COLORS[color]}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="12"
        x2="12"
        y1="19"
        y2="5"
      ></line>{" "}
      <line
        fill="none"
        stroke={APP_COLORS[color]}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="5"
        x2="19"
        y1="12"
        y2="12"
      ></line>{" "}
    </svg>
  )
}

export default UAddIcon
