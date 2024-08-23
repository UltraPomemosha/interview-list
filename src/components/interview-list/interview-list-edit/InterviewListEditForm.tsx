import { ULoader } from "@/components/ui/u-loader/ULoader"
import { useSalaryCheck } from "@/hooks/useSalaryCheck"
import { useTelCheck } from "@/hooks/useTelCheck"
import ErrorPage from "@/routes/error"
import { useUserStore } from "@/stores/auth"
import { useInterviewsStore } from "@/stores/interviews"
import { useLoaderStore } from "@/stores/loader"
import { useNotificationsStore } from "@/stores/notifications"
import { INTERVIEW_INPUTS } from "@/utils/constants"
import { initCL } from "@/utils/css"
import UButton from "@c/ui/u-button/UButton"
import UInput from "@c/ui/u-input/UInput"
import UTitle from "@c/ui/u-title/UTitle"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router"
import { TypeInterview } from "../support"
import styles from "./edit.module.scss"
import ResultChoice from "./ResultChoice"
import { InterviewData, SAVE_SUCCESS_MESSAGE } from "./support"

const ROOT = "edit-form"
const cl = initCL(ROOT, styles)

function InterviewListEditForm() {
  const user = useUserStore((state) => state.user)
  const updateGlobalNotifications = useNotificationsStore((state) => state.updateGlobalNotifications)
  const { contentIsLoading, setContentIsLoading } = useLoaderStore((state) => ({
    contentIsLoading: state.contentIsLoading,
    setContentIsLoading: state.setContentIsLoading,
  }))

  const { interviewId } = useParams()
  const { interviews, editInterview } = useInterviewsStore((state) => ({
    interviews: state.interviews,
    editInterview: state.editInterview,
  }))
  const currentInterview = useMemo(() => interviews?.find((el) => el.$id === interviewId), [interviews, interviewId])

  const [interview, setInterview] = useState<Omit<TypeInterview, "id">>({
    company: currentInterview?.company || "",
    description: currentInterview?.description || "",
    contacts: currentInterview?.contacts || "",
    telegram: currentInterview?.telegram || "",
    whatsapp: currentInterview?.whatsapp || "",
    tel: currentInterview?.tel || "",
    proposedSalary: currentInterview?.proposedSalary || "",
    result: currentInterview?.result,
  })

  useEffect(() => {
    setInterview({
      company: currentInterview?.company || "",
      description: currentInterview?.description || "",
      contacts: currentInterview?.contacts || "",
      telegram: currentInterview?.telegram || "",
      whatsapp: currentInterview?.whatsapp || "",
      tel: currentInterview?.tel || "",
      proposedSalary: currentInterview?.proposedSalary || "",
      result: currentInterview?.result,
    })
  }, [currentInterview])

  useSalaryCheck({salary: interview.proposedSalary})
  useTelCheck({ tel: interview.whatsapp }, "Whatsapp")
  useTelCheck({ tel: interview.tel }, "Tel")

  const editInterviewOnClient = (key: keyof InterviewData, nV: string) => {
    setInterview({
      ...interview,
      [key]: nV,
    })
  }

  const editInterviewInDB = useCallback(() => {
    let newData: Partial<InterviewData> = {}
    for (const field in interview) {
      const value = interview[field as keyof InterviewData]
      if (!currentInterview) return
      else if (!(field in currentInterview) && value) newData = { ...newData, [field]: value }
      else if (value !== currentInterview[field]) newData = { ...newData, [field]: value }
    }
    if (Object.entries(newData).length) {
      setContentIsLoading(true)
      editInterview(interviewId!, newData, user)
      setContentIsLoading(false)
      updateGlobalNotifications("success", SAVE_SUCCESS_MESSAGE)
    }
  }, [currentInterview, editInterview, setContentIsLoading, interview, interviewId, user, updateGlobalNotifications])

  return currentInterview ? (
    contentIsLoading ? (
      <ULoader className="app-content-loader" />
    ) : (
      <form className={cl()}>
        <fieldset className={cl("inputs")}>
          <UTitle
            tag="legend"
            className=""
            size={30}
            title={`Собеседование в компанию ${currentInterview?.company}`}
            weight="b"
          />
          {INTERVIEW_INPUTS.map((input) =>
            input.type === "radio" ? (
              <ResultChoice
                input={input}
                result={interview[input.name]}
                setResult={editInterviewOnClient}
                key={input.name}
              />
            ) : (
              <UInput
                handleFunction={(nV) => editInterviewOnClient(input.name, nV)}
                name={input.name as string}
                title={input.title}
                type={input.type}
                placeholder={input["placeholder"]}
                value={interview[input.name]}
                key={input.name}
              />
            ),
          )}
        </fieldset>
        <UButton className={cl("submit")} handleFunction={editInterviewInDB} title="Сохранить" type="button" />
      </form>
    )
  ) : (
    <ErrorPage />
  )
}

export default InterviewListEditForm
