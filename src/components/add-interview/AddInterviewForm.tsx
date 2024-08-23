import { useTelCheck } from "@/hooks/useTelCheck"
import { ID } from "@/lib/appwrite"
import { useUserStore } from "@/stores/auth"
import { useInterviewsStore } from "@/stores/interviews"
import { useNotificationsStore } from "@/stores/notifications"
import { ADD_INTERVIEW_INPUTS } from "@/utils/constants"
import { initCL } from "@/utils/css"
import UButton from "@c/ui/u-button/UButton"
import UInput from "@c/ui/u-input/UInput"
import UTitle from "@c/ui/u-title/UTitle"
import { useState } from "react"
import styles from "./add-interview-form.module.scss"
import {
  CREATE_ERROR_MESSAGE,
  CREATE_SUCCESS_MESSAGE,
  DEFAULT_DATA,
  type AddInterviewFormData,
  type AddInterviewFormDataFields,
} from "./support"

const cl = initCL("add-interview-form", styles)

function AddInterviewForm() {
  const updateGlobalNotifications = useNotificationsStore((state) => state.updateGlobalNotifications)
  const user = useUserStore((state) => state.user)
  const createInterview = useInterviewsStore((state) => state.createInterview)

  const [formData, setFormData] = useState<AddInterviewFormData>({
    company: "",
    description: "",
    contacts: "",
    telegram: "",
    whatsapp: "",
    tel: "",
  })

  useTelCheck({tel: formData.whatsapp}, "Whatsapp")
  useTelCheck({tel: formData.tel}, "Tel")

  const submit = () => {
    try {
      createInterview(
        ID.unique(),
        {
          ...formData,
          email: user?.email,
        },
        user,
      )
      updateGlobalNotifications("success", CREATE_SUCCESS_MESSAGE)
    } catch (error) {
      updateGlobalNotifications("error", CREATE_ERROR_MESSAGE)
    } finally {
      setFormData(DEFAULT_DATA)
    }
  }

  return (
    <>
      <form className={cl()}>
        <fieldset className={cl("content")}>
          <UTitle tag="legend" className={cl("title")} size={30} title="Новое собеседование" weight="m" />
          {ADD_INTERVIEW_INPUTS.map((input) => (
            <UInput
              className={cl("input")}
              handleFunction={(nV) => setFormData((prev) => ({ ...prev, [input.name]: nV }))}
              value={formData[input.name as AddInterviewFormDataFields]}
              placeholder={input["placeholder"]}
              name={input.name as string}
              title={input.title}
              type={input.type}
              key={input.name}
            />
          ))}
        </fieldset>
        <UButton handleFunction={submit} className={cl("button")} title="Создать собеседование" type="button" />
      </form>
    </>
  )
}

export default AddInterviewForm
