import { AppInterview } from "@/global"
import { useUserStore } from "@/stores/auth"
import { useInterviewsStore } from "@/stores/interviews"
import { useLoaderStore } from "@/stores/loader"
import { css, initCL } from "@/utils/css"
import AppContainer from "@c/app-container/AppContainer"
import UButton from "@c/ui/u-button/UButton"
import { ULoader } from "@c/ui/u-loader/ULoader.tsx"
import { UModal } from "@c/ui/u-modal/UModal.tsx"
import { useCallback, useEffect, useState } from "react"
import { replace } from "react-router"
import styles from "./interview-list.module.scss"
import Interview from "./Interview.tsx"
import InterviewListHeader from "./InterviewListHeader.tsx"
import { ModalChoice, type OnModalChoice, type TypeInterview } from "./support"

const cl = initCL("interview-list", styles)

const getInterviewData = (el: AppInterview): TypeInterview => ({
  id: el.$id,
  company: el.company,
  contacts: el.contacts,
  description: el.description,
  tel: el.tel,
  telegram: el.telegram,
  whatsapp: el.whatsapp,
  result: el.result,
})

function InterviewList() {
  const user = useUserStore((state) => state.user)
  const { contentIsLoading, setContentIsLoading } = useLoaderStore((state) => ({
    contentIsLoading: state.contentIsLoading,
    setContentIsLoading: state.setContentIsLoading,
  }))
  const { interviews, getInterviews, setInterviews, deleteInterview } = useInterviewsStore((state) => ({
    interviews: state.interviews,
    getInterviews: state.getInterviews,
    setInterviews: state.setInterviews,
    deleteInterview: state.deleteInterview,
  }))

  const set = useCallback(async () => {
    setInterviews(await getInterviews(user))
  }, [setInterviews, getInterviews, user])

  useEffect(() => {
    if (user) set()
  }, [user, set])

  useEffect(() => {
    replace("/interview-list")
  }, [interviews])

  useEffect(() => {
    setContentIsLoading(false)
  }, [])

  const [currentModalInfo, setCurrentModalInfo] = useState({
    id: "",
    company: "",
    isShow: false,
  })

  const onDeleteCLick = (id: string, company: string) => {
    setCurrentModalInfo(() => ({ id, company, isShow: true }))
  }

  const onModalChoice: OnModalChoice = async (choice, id) => {
    if (choice === ModalChoice.DELETE) {
      setContentIsLoading(true)
      await deleteInterview(id, user)
      setContentIsLoading(false)
    }
    setCurrentModalInfo((prev) => ({ ...prev, isShow: false }))
  }

  return (
    <AppContainer className={cl()}>
      {contentIsLoading ? (
        <ULoader className="app-content-loader" />
      ) : (
        <>
          <InterviewListHeader />
          {interviews.map((el) => (
            <Interview {...getInterviewData(el)} onDeleteCLick={onDeleteCLick} key={el.$id} />
          ))}
          <UModal
            className={css(styles, "modal")}
            isShow={currentModalInfo.isShow}
            title={`Удалить собеседование в компанию ${currentModalInfo.company}?`}
          >
            <UButton handleFunction={() => onModalChoice(ModalChoice.CANCEL, currentModalInfo.id)} title="Отмена" />
            <UButton
              className={css(styles, "modal-delete")}
              handleFunction={() => onModalChoice(ModalChoice.DELETE, currentModalInfo.id)}
              title="Удалить"
            />
          </UModal>
        </>
      )}
    </AppContainer>
  )
}

export default InterviewList
