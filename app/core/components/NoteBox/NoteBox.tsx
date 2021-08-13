import { Box, Flex, Tag, Text } from "@chakra-ui/react"
import { displaySentenceDate } from "app/utils/dates/format"
import { Note, User } from "db"
import { FC } from "react"

interface NoteBoxProps {
  note: Note & { user: User }
  onClick: () => void
}

const NoteBox: FC<NoteBoxProps> = ({ note, onClick }) => {
  return (
    <Box
      p="1rem"
      w="300px"
      boxShadow="sm"
      borderRadius="5px"
      bg="white"
      cursor="pointer"
      _hover={{ bg: "gray.50" }}
      onClick={onClick}
    >
      <Flex justifyContent="space-between" mb="0.5rem">
        <Text fontWeight="bold">{note.title}</Text>
        <Text fontSize="12px" whiteSpace="nowrap">
          {displaySentenceDate(note.createdAt)}
        </Text>
      </Flex>
      <Text mb="1rem" color="gray.600">
        {note.content}
      </Text>
      <Flex>
        <Tag colorScheme="red" mr="0.5rem">
          Idea
        </Tag>
        <Tag colorScheme="green" mr="0.5rem">
          News
        </Tag>
      </Flex>
    </Box>
  )
}

export default NoteBox
