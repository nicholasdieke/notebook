import { Button, Flex, Text } from "@chakra-ui/react"
import logoutMutation from "app/auth/mutations/logout"
import { useMutation, useSession } from "blitz"
import { LogOut } from "react-feather"

const NavBar = () => {
  const [logout] = useMutation(logoutMutation)
  const session = useSession()

  return (
    <Flex w="100%" h="7vh" justifyContent="space-between" px="2rem" py="0.5rem">
      <Text fontWeight="bold" alignItems="center" fontSize="16px" pt="0.5rem">
        {session.name}&#39;s Notebook
      </Text>
      <Button aria-label="logout" leftIcon={<LogOut />} onClick={async () => await logout()}>
        Sign Out
      </Button>
    </Flex>
  )
}

export default NavBar
