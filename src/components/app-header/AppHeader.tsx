import { account } from "@/lib/appwrite"
import { useUserStore } from "@/stores/auth"
import { useLoaderStore } from "@/stores/loader"
import { css, initCL } from "@/utils/css"
import AppContainer from "@c/app-container/AppContainer"
import UButton from "@c/ui/u-button/UButton"
import UAddIcon from "@c/ui/u-icons/UAddIcon"
import UListIcon from "@c/ui/u-icons/UListIcon"
import UStatisticIcon from "@c/ui/u-icons/UStatisticIcon"
import UTitle from "@c/ui/u-title/UTitle"
import { useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import styles from "./app-header.module.scss"

interface ILink {
  id: string
  to: string
  title: string
  icon: React.ReactNode
}

const cl = initCL("app-header", styles)

function AppHeader() {
  const navigate = useNavigate()

  const { setIsLoading, setContentIsLoading } = useLoaderStore((state) => ({
    setContentIsLoading: state.setContentIsLoading,
    setIsLoading: state.setIsLoading,
  }))

  const updateUser = useUserStore((state) => state.updateUser)
  async function logout() {
    setIsLoading(true)
    await account.deleteSession("current")
    updateUser(null)
    navigate("/auth")
    setIsLoading(false)
  }

  const links: ILink[] = [
    {
      id: "/add-interview",
      to: "add-interview",
      title: "Добавить",
      icon: <UAddIcon size={30} />,
    },
    {
      id: "/interview-list",
      to: "interview-list",
      title: "Список собеседований",
      icon: <UListIcon size={30} />,
    },
    {
      id: "/statistic",
      to: "statistic",
      title: "Статистика",
      icon: <UStatisticIcon size={30} />,
    },
  ]

  const location = useLocation()
  const linkClass = (id: string) => {
    if (location.pathname === id) return cl("link", "link_active")
    else return cl("link")
  }

  useEffect(() => {
    setContentIsLoading(true)
  }, [location.pathname, setContentIsLoading])

  return (
    <>
      <header className={cl()}>
        <AppContainer>
          <ul className={cl("menu")}>
            {links.map((link) => {
              const icon = () => link.icon
              return (
                <li className={cl("menu-item")} key={link.id}>
                  <Link className={linkClass(link.id)} to={link.to}>
                    <>
                      {icon()} <UTitle className={css(styles, 'link-title')} size={18} tag="span" weight="m" title={link.title} />
                    </>
                  </Link>
                </li>
              )
            })}
            <li className={cl("menu-item")}>
              <UButton title="Выход" handleFunction={logout} />
            </li>
          </ul>
        </AppContainer>
      </header>
    </>
  )
}

export default AppHeader
