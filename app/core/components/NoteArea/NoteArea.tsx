import { Button, Flex, Stack } from "@chakra-ui/react"
import NoteBox from "app/core/components/NoteBox"
import NoteDetail from "app/core/components/NoteDetail"
import AddNoteForm from "app/notes/forms/AddNoteForm"
import getNotes from "app/notes/queries/getNotes"
import { useQuery } from "blitz"
import { Note, User } from "db"
import { FC, useState } from "react"
import { Edit } from "react-feather"

interface NoteAreaProps {}

const NoteArea: FC<NoteAreaProps> = ({}) => {
  const [notes, { refetch }] = useQuery(getNotes, {})

  const [addNote, setAddNote] = useState(false)

  const [currentNote, setCurrentNote] = useState<(Note & { user: User }) | undefined>(notes[0])
  return (
    <Flex bg="gray.100" p="1rem">
      <Stack spacing="0.5rem" mr="1rem">
        <Button
          mb="0.5rem"
          leftIcon={<Edit />}
          colorScheme="purple"
          onClick={() => setAddNote(true)}
        >
          Add a new note
        </Button>
        {notes &&
          notes.map((note) => (
            <NoteBox
              isCurrent={currentNote?.id === note.id}
              key={`note-${note.id}`}
              note={note}
              onClick={() => setCurrentNote(note)}
            />
          ))}
      </Stack>
      {addNote && (
        <AddNoteForm
          isOpen={true}
          handleClose={() => {
            setAddNote(false)
            refetch()
          }}
        />
      )}
      <NoteDetail refetch={refetch} note={currentNote!} />
    </Flex>
  )
}

export default NoteArea
