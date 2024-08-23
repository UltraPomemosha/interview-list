import { APP_COLORS } from "@/global"
import { UIconProps } from "./types"

function USuccessIcon({ color = "$success-color", size = 24, className }: UIconProps) {
  return (
    <svg
      className={className}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width={size}
      height={size}
      fill="#000000"
    >
      <circle fill={APP_COLORS[color]} cx="25" cy="25" r="25"></circle>
      <polyline
        fill="none"
        stroke={APP_COLORS["$color-1000"]}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        points=" 38,15 22,33 12,25 "
      ></polyline>
    </svg>
  )
}

export default USuccessIcon
