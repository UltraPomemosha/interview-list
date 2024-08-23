import AppHeader from "@/components/app-header/AppHeader"
import AppNotifications from "@/components/app-notifications/AppNotifications"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"

function RootPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const hasAuthInStorage = localStorage.getItem("cookieFallback")
    if (hasAuthInStorage === "[]" || !hasAuthInStorage) navigate("/auth")
  }, [navigate])

  return (
    <>
      <AppHeader />
      <Outlet />
      <AppNotifications />
    </>
  )
}

export { RootPage }

