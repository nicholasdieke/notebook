import { Flex } from "@chakra-ui/react"
import { BookOpen, LogOut } from "react-feather"
const NavBar = () => {
  return (
    <Flex w="100%" justifyContent="space-between" p="2rem" pt="1rem">
      <BookOpen />
      <LogOut />
    </Flex>
  )
}

export default NavBar
