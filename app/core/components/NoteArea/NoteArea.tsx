import { Box, Button, Flex, Text } from "@chakra-ui/react"
import NoteBox from "app/core/components/NoteBox"
import NoteDetail from "app/core/components/NoteDetail"
import createNoteMutation from "app/notes/mutations/createNote"
import getLastNote from "app/notes/queries/getLastNote"
import getNotes from "app/notes/queries/getNotes"
import getCurrentUser from "app/users/queries/getCurrentUser"
import { invoke, useMutation, useQuery, useSession } from "blitz"
import { Note, User } from "db"
import { FC, useState } from "react"
import { Inbox, Plus } from "react-feather"
import ConfirmModal from "../ConfirmModal"

interface NoteAreaProps {}

const NoteArea: FC<NoteAreaProps> = ({}) => {
  const [notes, { refetch, isLoading }] = useQuery(getNotes, {})
  const session = useSession()

  const [addNote, setAddNote] = useState(false)
  const [confirmExit, setConfirmExit] = useState(false)
  const [createNote] = useMutation(createNoteMutation)
  const [currentUser] = useQuery(getCurrentUser, null)

  const [currentNote, setCurrentNote] = useState<((Note & { user: User }) | null) | undefined>(
    notes[0]
  )
  return (
    <Flex bg="gray.100" p="1rem" h="93vh">
      <Box pr="1rem" mb="2.5rem" position="relative" w="350px">
        <Button
          w="100%"
          mb="0.25rem"
          leftIcon={<Plus />}
          colorScheme="purple"
          onClick={async () => {
            const newNote = await createNote({
              title: "",
              content: "",
              tags: [],
            })
            setCurrentNote(newNote)
            setAddNote(true)
          }}
        >
          New note
        </Button>
        <Box
          h="100%"
          overflowY="scroll"
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
              color: "black",
            },
          }}
        >
          {notes?.length > 0 ? (
            notes.map((note) => (
              <>
                <NoteBox
                  isCurrent={currentNote?.id === note.id}
                  key={`note-${note.id}`}
                  note={note}
                  onClick={() => {
                    if (addNote) setConfirmExit(true)
                    else setCurrentNote(note)
                  }}
                />
                {confirmExit && (
                  <ConfirmModal
                    isNegative
                    onClose={() => setConfirmExit(false)}
                    onCancel={() => setConfirmExit(false)}
                    onConfirm={async () => {
                      setAddNote(false)
                      setCurrentNote(note)
                      setConfirmExit(false)
                    }}
                    title="Abandon note?"
                  >
                    You have started writing or editing a note. Are you sure you want to leave this
                    page?
                  </ConfirmModal>
                )}
              </>
            ))
          ) : (
            <Flex w="100%" h="100%" flexDir="column" alignItems="center" justifyContent="center">
              <Inbox size="50px" />
              <Text fontWeight="500" fontSize="22px">
                No notes
              </Text>
            </Flex>
          )}
        </Box>
      </Box>

      <NoteDetail
        key={`noteDetail-${addNote}-${currentNote?.id}`}
        handleClose={async () => {
          setAddNote(false)
          setConfirmExit(false)
          refetch()
          const note = await invoke(getLastNote, {})
          setCurrentNote(note)
        }}
        editing={addNote}
        refetch={refetch}
        note={currentNote!}
      />
    </Flex>
  )
}

export default NoteArea
