import AppContainer from "@c/app-container/AppContainer"
import { useNavigate, useParams } from "react-router"
import InterviewListEditForm from "./InterviewListEditForm"

function InterviewListEdit() {
  const { interviewId } = useParams()
  const navigate = useNavigate()
  if (!interviewId) {
    navigate("/interview-list")
    return
  }

  return (
    <AppContainer>
      <InterviewListEditForm />
    </AppContainer>
  )
}

export default InterviewListEdit
