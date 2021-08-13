import {
  Box,
  Divider,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react"
import deleteNoteMutation from "app/notes/mutations/deleteNote"
import { displaySentenceDate } from "app/utils/dates/format"
import { useMutation } from "blitz"
import { Note, User } from "db"
import { FC, useState } from "react"
import { MoreVertical } from "react-feather"
import ConfirmModal from "../ConfirmModal"

interface NoteDetailProps {
  note: Note & { user: User }
  refetch: () => void
}

const NoteDetail: FC<NoteDetailProps> = ({ note, refetch }) => {
  const [deleteNote] = useMutation(deleteNoteMutation)
  const [removeNote, setRemoveNote] = useState(false)

  return (
    <Box p="2rem" w="100%" bg="white" borderRadius="5px" boxShadow="sm" minH="80vh">
      <Flex justifyContent="space-between">
        <Box>
          <Heading mb="0.5rem">{note.title}</Heading>
          <Text mb="0.5rem" fontSize="14px" color="gray.700">
            {displaySentenceDate(note.createdAt)} by {note.user.name}
          </Text>
        </Box>
        <Box>
          <Menu>
            <MenuButton>
              <MoreVertical />
            </MenuButton>
            <MenuList>
              <MenuItem>Edit</MenuItem>
              <MenuItem>Archive</MenuItem>
              <MenuItem onClick={() => setRemoveNote(true)}>Delete</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        {removeNote && (
          <ConfirmModal
            isNegative
            onClose={() => setRemoveNote(false)}
            onCancel={() => setRemoveNote(false)}
            onConfirm={async () => {
              await deleteNote({ noteId: note.id })
              setRemoveNote(false)
              refetch()
            }}
            title="Delete note?"
          >
            Are you sure you want to delete this note?
          </ConfirmModal>
        )}
      </Flex>
      <Divider />

      <Text mt="1rem">{note.content}</Text>
    </Box>
  )
}

export default NoteDetail
