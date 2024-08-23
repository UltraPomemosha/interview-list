import { ULoader } from "@/components/ui/u-loader/ULoader"
import { useTimeout } from "@/hooks/useTimer"
import { useLoaderStore } from "@/stores/loader"
import InterviewListEdit from "@c/interview-list/interview-list-edit/InterviewListEdit"

function InterviewListEditPage() {
  const { contentIsLoading, setContentIsLoading } = useLoaderStore()
  useTimeout(() => setContentIsLoading(false), 100)
  return contentIsLoading ? <ULoader /> : <InterviewListEdit />
}

export default InterviewListEditPage
