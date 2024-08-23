import { account, ID } from "@/lib/appwrite.ts"
import { useUserStore } from "@/stores/auth.ts"
import { useLoaderStore } from "@/stores/loader.ts"
import { useNotificationsStore } from "@/stores/notifications.ts"
import { initCL } from "@/utils/css.ts"
import UButton from "@c/ui/u-button/UButton.tsx"
import { UTabsProps } from "@c/ui/u-tab/types"
import UTabs from "@c/ui/u-tab/UTabs.tsx"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import styles from "./auth-form.module.scss"
import AuthFormContent from "./AuthFormContent.tsx"
import { Choice, CREATE_ERROR_MESSAGE, getTitle, LOGIN_ERROR_MESSAGE, type FormData } from "./support.ts"

function AuthForm() {
  const [picked, setPicked] = useState(Choice.AUTH)
  const navigate = useNavigate()

  const setIsLoading = useLoaderStore((state) => state.setIsLoading)
  const { user, updateUser } = useUserStore((state) => ({ user: state.user, updateUser: state.updateUser }))
  const updateNotifications = useNotificationsStore((state) => state.updateNotifications)

  const [formData, setFormData] = useState<FormData>({
    password: "",
    email: "",
  })

  async function login({ email, password }: FormData) {
    setIsLoading(true)
    try {
      await account.createEmailPasswordSession(email, password)
      updateUser(await account.get())
    } catch (error) {
      updateNotifications({
        id: Math.random() + Date.now(),
        description: LOGIN_ERROR_MESSAGE,
        global: true,
        type: "error"
      })
    }
    navigate("/add-interview")
    setIsLoading(false)
  }

  async function create({ email, password }: FormData) {
    try {
      await account.create(ID.unique(), email, password)
      login({ email, password })
    } catch (error) {
      updateNotifications({
        id: Math.random() + Date.now(),
        description: CREATE_ERROR_MESSAGE,
        global: true,
        type: "error"
      })
    }
  }

  const nullFormData = () => {
    setFormData({
      password: "",
      email: "",
    })
  }

  useEffect(() => {
    nullFormData()
  }, [picked, user])

  const tabs: UTabsProps["data"] = [
    {
      id: "create-tab",
      value: Choice.CREATE,
      title: "Создать аккаунт",
    },
    {
      id: "enter-tab",
      value: Choice.AUTH,
      title: "Войти",
    },
  ]

  const cl = initCL("auth-form", styles)

  const submit = () => {
    if (formData.email && formData.password) {
      if (picked === Choice.AUTH) login(formData)
      else create(formData)
    }
  }

  return (
    <>
      <form className={cl()}>
        <UTabs className={cl("button")} data={tabs} name="auth-form-tabs" picked={picked} setPicked={setPicked} />
        <AuthFormContent
          title={getTitle(picked, "form")}
          formData={formData}
          setFormData={setFormData}
          picked={picked}
        />
        <UButton
          handleFunction={submit}
          className={cl("send-button")}
          title={getTitle(picked, "button")}
          type="button"
        />
      </form>
    </>
  )
}

export default AuthForm
