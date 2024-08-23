import { useLoaderStore } from "@/stores/loader"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

function ErrorPage() {
  const setContentIsLoading = useLoaderStore((state) => state.setContentIsLoading)
  const location = useLocation()
  useEffect(() => {
    setContentIsLoading(false)
  }, [location.pathname, setContentIsLoading])
  return (
    <>
      <div>Error 404</div>
    </>
   )
}

export default ErrorPage
