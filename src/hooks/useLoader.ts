import { useState } from "react"

export const useLoader = () => {
  const [isLoading, setIsLoading] = useState(true)

  return {
    isLoading, setIsLoading
  }
}
