import { useTimeout } from "@/hooks/useTimer"
import { useLoaderStore } from "@/stores/loader"
import InterviewList from "@c/interview-list/InterviewList"
import { ULoader } from "@c/ui/u-loader/ULoader"

function InterviewListPage() {
  const { contentIsLoading, setContentIsLoading } = useLoaderStore()

  useTimeout(() => setContentIsLoading(false), 100)
  return (
    <>
      <main style={{ display: "flex", alignItems: "center", flexWrap: "nowrap", overflowX: "auto" }}>
        {contentIsLoading ? <ULoader className="app-content-loader" /> : <InterviewList />}
      </main>
    </>
  )
}

export { InterviewListPage }

