import { initCL } from "@/utils/css"
import UInput from "@c/ui/u-input/UInput"
import UTitle from "@c/ui/u-title/UTitle"
import styles from "./auth-form.module.scss"
import { Choice, type AuthFormContentProps } from "./support"

function AuthFormContent({ formData, setFormData, title, picked }: AuthFormContentProps) {
  const cl = initCL("auth-form", styles)

  const getPasswordAutocomplete = (choice: Choice) => (choice === Choice.CREATE ? "new-password" : "current-password")

  const setPassword = (nV: string) => {
    setFormData({
      ...formData,
      password: nV,
    })
  }

  const setEmail = (nV: string) => {
    setFormData({
      ...formData,
      email: nV,
    })
  }

  return (
    <>
      <fieldset className={cl("content")}>
        <UTitle tag="legend" title={title} weight="m" size={30} className={cl("title")} />
        <UInput
          className={cl("input")}
          handleFunction={setEmail}
          name="email"
          type="email"
          value={formData.email}
          title="email"
          required
          autoComplete="email"
        />
        <UInput
          className={cl("input")}
          handleFunction={setPassword}
          name="password"
          type="password"
          value={formData.password}
          title="password"
          required
          autoComplete={getPasswordAutocomplete(picked)}
        />
      </fieldset>
    </>
  )
}

export default AuthFormContent
