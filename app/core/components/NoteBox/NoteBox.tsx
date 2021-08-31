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
      my="0.5rem"
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
        <Text fontWeight="bold" isTruncated>
          {note.title}
        </Text>
        <Text fontSize="12px" whiteSpace="nowrap">
          {displaySentenceDate(note.createdAt)}
        </Text>
      </Flex>
      <Text color="gray.600" isTruncated>
        {note.content}
      </Text>
      {note.tags.length > 0 && (
        <Flex mt="1rem" alignItems="center">
          {note.tags.slice(0, 2).map((tag) => (
            <Tag key={`tag-${tag}`} colorScheme="purple" mr="0.5rem">
              {tag}
            </Tag>
          ))}
          {note.tags.length > 2 && <Text fontSize="12px">+{note.tags.length - 2} more</Text>}
        </Flex>
      )}
    </Box>
  )
}

export default NoteBox
