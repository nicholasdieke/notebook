import { Box, Flex, Tag, Text } from "@chakra-ui/react"
import { displaySentenceDate } from "app/utils/dates/format"
import { Note, User } from "db"
import { FC } from "react"

interface NoteBoxProps {
  note: Note & { user: User }
  onClick: () => void
  isCurrent: boolean
}

const NoteBox: FC<NoteBoxProps> = ({ note, onClick, isCurrent }) => {
  return (
    <Box
      p="1rem"
      w="300px"
      boxShadow={isCurrent ? "md" : "sm"}
      borderRadius="5px"
      bg="white"
      borderWidth="2px"
      borderColor={isCurrent ? "purple.200" : "white"}
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
        {note.tags.map((tag) => (
          <Tag key={`tag-${tag}`} colorScheme="purple" mr="0.5rem">
            {tag}
          </Tag>
        ))}
      </Flex>
    </Box>
  )
}

export default NoteBox
