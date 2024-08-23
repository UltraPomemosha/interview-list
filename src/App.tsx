import { ULoader } from "@c/ui/u-loader/ULoader"
import { useEffect } from "react"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import "./assets/scss/index.scss"
import { AuthPage } from "./routes/auth"
import ErrorPage from "./routes/error"
import InterviewListEditPage from "./routes/interview-list/interview-list-edit"
import { RootPage } from "./routes/root"
import { useUserStore } from "./stores/auth"
import { useInterviewsStore } from "./stores/interviews"
import { useLoaderStore } from "./stores/loader"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootPage />}>
        <Route
          path="add-interview"
          lazy={async () => {
            const { AddInterviewPage } = await import("./routes/add-interview")
            return { Component: AddInterviewPage }
          }}
        />
        <Route
          path="interview-list"
          lazy={async () => {
            const { InterviewListPage } = await import("./routes/interview-list/interview-list")
            return { Component: InterviewListPage }
          }}
        />
        <Route path="interview-list/:interviewId" element={<InterviewListEditPage />} />
        <Route
          path="statistic"
          lazy={async () => {
            const { StatisticPage } = await import("./routes/statistic")
            return { Component: StatisticPage }
          }}
          errorElement={<ErrorPage />}
        />
      </Route>
      <Route path="/auth" element={<AuthPage />} />
    </>,
  ),
)

function App() {
  const user = useUserStore((state) => state.user)
  const isLoading = useLoaderStore((state) => state.isLoading)
  const { setInterviews, getInterviews } = useInterviewsStore((state) => ({
    setInterviews: state.setInterviews,
    getInterviews: state.getInterviews,
  }))
  useEffect(() => {
    (async () => {
      if (user) setInterviews(await getInterviews(user))
    })()
  }, [getInterviews, setInterviews, user])
  return (
    <>
      {isLoading && <ULoader />}
      <RouterProvider router={router} />
    </>
  )
}

export default App
