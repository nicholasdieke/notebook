import { Flex, Spinner } from "@chakra-ui/react"
import NavBar from "app/core/components/NavBar"
import NoteArea from "app/core/components/NoteArea"
import Layout from "app/core/layouts/Layout"
import { BlitzPage } from "blitz"
import { Suspense } from "react"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Home: BlitzPage = () => {
  return (
    <>
      <NavBar />
      <Suspense
        fallback={
          <Flex alignItems="center" h="800vh" justifyContent="center" w="100%">
            <Spinner />
          </Flex>
        }
      >
        <NoteArea />
      </Suspense>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
