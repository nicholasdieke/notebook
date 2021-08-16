import {
  Box,
  Divider,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  Text,
} from "@chakra-ui/react"
import deleteNoteMutation from "app/notes/mutations/deleteNote"
import { displayDateAndTime } from "app/utils/dates/format"
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
      {!!note && (
        <>
          <Flex justifyContent="space-between">
            <Box>
              <Heading mb="1rem">{note.title}</Heading>
              <Flex fontSize="14px" color="gray.600" mb="0.5rem">
                <Flex direction="column" justifyContent="space-between">
                  <Text mb="1rem">Created by</Text>
                  <Text mb="1rem">Last Modified</Text>
                  <Text mb="1rem">Tags</Text>
                </Flex>
                <Flex color="black" direction="column" ml="2rem" justifyContent="space-between">
                  <Text mb="1rem">{note.user.name}</Text>
                  <Text mb="1rem">{displayDateAndTime(note.updatedAt)}</Text>
                  <Flex mb="1rem">
                    {note.tags.map((tag) => (
                      <Tag key={`tag-${tag}`} colorScheme="purple" mr="0.5rem">
                        {tag}
                      </Tag>
                    ))}
                  </Flex>
                </Flex>
              </Flex>
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
        </>
      )}
    </Box>
  )
}

export default NoteDetail
