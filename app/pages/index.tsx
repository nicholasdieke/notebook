import { Flex, Spinner } from "@chakra-ui/react"
import { LoginForm } from "app/auth/components/LoginForm"
import NavBar from "app/core/components/NavBar"
import NoteArea from "app/core/components/NoteArea"
import Layout from "app/core/layouts/Layout"
import getCurrentUser from "app/users/queries/getCurrentUser"
import { BlitzPage, useQuery, useRouter, useRouterQuery, useSession } from "blitz"
import { Suspense } from "react"

const CurrentUserInfo = () => {
  const session = useSession()
  const [currentUser] = useQuery(getCurrentUser, null)
  const router = useRouter()

  return <pre>{JSON.stringify(currentUser, null, 2)}</pre>
}

const UserStuff = () => {
  const session = useSession()
  const query = useRouterQuery()
  const router = useRouter()

  return (
    <div>
      {!session.userId ? (
        <Flex
          w="100vw"
          h="95vh"
          overflow="hidden"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          position="relative"
          bg="white"
        >
          <LoginForm />
          {/* <a href="/api/auth/twitter" style={{ display: "block" }}>
            Login with Twitter
          </a>
          <a href="/api/auth/github" style={{ display: "block" }}>
            Login with Github
          </a> 
          {query.authError && <div style={{ color: "red" }}>{query.authError}</div>} */}
        </Flex>
      ) : (
        <>
          <NavBar />
          <Suspense
            fallback={
              <Flex alignItems="center" minH="93vh" justifyContent="center" w="100%">
                <Spinner />
              </Flex>
            }
          >
            <NoteArea />
          </Suspense>
        </>
      )}
    </div>
  )
}

const Home: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={"Loading..."}>
        <UserStuff />
      </Suspense>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Notebook">{page}</Layout>

export default Home
