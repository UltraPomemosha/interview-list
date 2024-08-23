import AuthForm from "@/components/auth-form/AuthForm"
import { ULoader } from "@/components/ui/u-loader/ULoader"
import { useLoader } from "@/hooks/useLoader"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function AuthPage() {
  const navigate = useNavigate()
  const { isLoading, setIsLoading } = useLoader()
  useEffect(() => {
    const hasAuthInStorage = localStorage.getItem("cookieFallback")
    if (hasAuthInStorage !== "[]" && hasAuthInStorage) navigate("/add-interview")
  }, [navigate])

  useEffect(() => {
    setIsLoading(false)
  }, [])
  return isLoading ? <ULoader /> : <AuthForm />
}

export { AuthPage }

