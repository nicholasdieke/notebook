import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  Text,
  Textarea,
} from "@chakra-ui/react"
import { Input, Select } from "app/core/components"
import { NoNotesIcon } from "app/core/components/Icons/NoNotesIcon"
import createNoteMutation from "app/notes/mutations/createNote"
import deleteNoteMutation from "app/notes/mutations/deleteNote"
import updateNoteMutation from "app/notes/mutations/updateNote"
import getTags from "app/notes/queries/getTags"
import { displayDateAndTime } from "app/utils/dates/format"
import { useMutation, useQuery } from "blitz"
import { Note, User } from "db"
import { useFormik } from "formik"
import { FC, useMemo, useState } from "react"
import { MoreVertical } from "react-feather"
// Import the Slate editor factory.
import { BaseEditor, createEditor, Descendant } from "slate"
import { HistoryEditor } from "slate-history"
// Import the Slate components and React plugin.
import { Editable, ReactEditor, Slate, withReact } from "slate-react"
import * as yup from "yup"
import ConfirmModal from "../ConfirmModal"

type CustomElement = { type: "paragraph"; children: CustomText[] }
type CustomText = { text: string; bold?: true }

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}

const validationSchema = yup.object({
  title: yup.string().required("Enter a title"),
  content: yup.string().required("Enter a note"),
  tags: yup.array(yup.string()),
})

interface AddNoteSubmitProps {
  title: string
  tags: string[]
  content: string
}

interface NoteDetailProps {
  note: (Note & { user: User }) | null
  refetch: () => void
  editing: boolean
  handleClose: () => void
}

const NoteDetail: FC<NoteDetailProps> = ({ note, refetch, editing = false, handleClose }) => {
  const [createNote] = useMutation(createNoteMutation)
  const [updateNote] = useMutation(updateNoteMutation)

  const [isEditing, setIsEditing] = useState(editing)
  const [deleteNote] = useMutation(deleteNoteMutation)
  const [removeNote, setRemoveNote] = useState(false)

  const [tagOptions] = useQuery(getTags, {})

  const initialValue: Descendant[] = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState<Descendant[]>(initialValue)

  const onSubmit = async (values: AddNoteSubmitProps) => {
    setErrors({})

    await updateNote({ ...values, id: note?.id || "" })

    if (handleClose) handleClose()
  }

  const { values, handleChange, setFieldValue, handleSubmit, errors, setErrors } = useFormik({
    initialValues: {
      title: note?.title || "",
      content: note?.content || "",
      tags: note?.tags || [],
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema,
    onSubmit,
  })

  console.log(errors)

  return (
    <Box
      p="2rem"
      w="100%"
      h="100%"
      bg="white"
      borderRadius="5px"
      boxShadow="sm"
      borderWidth="2px"
      borderColor={isEditing ? "purple.200" : "white"}
    >
      {!!note ? (
        <Box h="100%">
          <form onSubmit={handleSubmit}>
            <Flex h="100%" w="100%" justifyContent="space-between" direction="column">
              <Box>
                <Flex justifyContent="space-between" w="100%">
                  <Slate editor={editor} value={value} onChange={setValue}>
                    <Editable />
                  </Slate>
                  <Box w="100%">
                    {isEditing ? (
                      <Input
                        fontSize="3xl"
                        name="title"
                        label="Title"
                        value={values.title}
                        isRequired
                        onChange={handleChange}
                        mb="0.5rem"
                        placeholder="Enter title"
                        error={errors.title}
                        variant="unstyled"
                        data-testid="addNoteTitle"
                      />
                    ) : (
                      <Heading mb="1rem">{note?.title}</Heading>
                    )}
                    {!isEditing ? (
                      <>
                        <Flex fontSize="14px" color="gray.600" mb="0.5rem">
                          <Flex direction="column" justifyContent="space-between">
                            <Text mb="1rem">Created by</Text>
                            <Text mb="1rem">Last Modified</Text>
                            <Text mb="1rem">Tags</Text>
                          </Flex>
                          <Flex
                            color="black"
                            direction="column"
                            ml="2rem"
                            justifyContent="space-between"
                          >
                            <Text mb="1rem">{note?.user.name}</Text>
                            <Text mb="1rem">{!!note && displayDateAndTime(note.updatedAt)}</Text>
                            <Flex mb="1rem">
                              {note?.tags.map((tag) => (
                                <Tag key={`tag-${tag}`} colorScheme="purple" mr="0.5rem">
                                  {tag}
                                </Tag>
                              ))}
                            </Flex>
                          </Flex>
                        </Flex>
                      </>
                    ) : (
                      <Select
                        label="Tags"
                        name="tags"
                        defaultValue={values.tags.map((val) => ({ label: val, value: val }))}
                        options={tagOptions.map((opt) => ({ label: `${opt}`, value: `${opt}` }))}
                        isMulti
                        onChange={(tags) =>
                          setFieldValue(
                            "tags",
                            tags?.map(({ value }) => value)
                          )
                        }
                        isCreatable
                      />
                    )}
                  </Box>
                  {!isEditing && (
                    <Box>
                      <Menu>
                        <MenuButton as={IconButton}>
                          <IconButton aria-label="options" icon={<MoreVertical />} />
                        </MenuButton>
                        <MenuList>
                          <MenuItem onClick={() => setIsEditing(true)}>Edit</MenuItem>
                          <MenuItem onClick={() => setRemoveNote(true)}>Delete</MenuItem>
                        </MenuList>
                      </Menu>
                    </Box>
                  )}
                  {!!note && removeNote && (
                    <ConfirmModal
                      key={`Delete-modal-${note.id}`}
                      isNegative
                      onClose={() => setRemoveNote(false)}
                      onCancel={() => setRemoveNote(false)}
                      onConfirm={async () => {
                        await deleteNote({ noteId: note.id })
                        handleClose()
                      }}
                      title="Delete note?"
                    >
                      Are you sure you want to delete this note?
                    </ConfirmModal>
                  )}
                </Flex>

                <Divider />
                {isEditing ? (
                  <Flex flexDir="column" justifyContent="space-between">
                    <Textarea
                      mt="1rem"
                      isRequired
                      name="content"
                      value={values.content}
                      placeholder="Start writing here..."
                      onChange={handleChange}
                      h="450px"
                      variant="outline"
                      maxH="450px"
                      error={errors.content}
                    />
                    <Flex justifyContent="flex-end" mt="1rem">
                      <Button
                        variant="outline"
                        colorScheme="purple"
                        mr="1rem"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button colorScheme="purple" type="submit">
                        Save
                      </Button>
                    </Flex>
                  </Flex>
                ) : (
                  <Text mt="1rem">{note?.content}</Text>
                )}
              </Box>
            </Flex>
          </form>
        </Box>
      ) : (
        <Flex
          w="100%"
          position="relative"
          h="100%"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            alt="arrow"
            src="/arrow3.png"
            layout="fill"
            height="90px"
            top="0px"
            left="0px"
            m="-1rem"
            position="absolute"
            objectFit="cover"
            quality="100"
            opacity="0.6"
          />

          <NoNotesIcon size="100px" />
          <Text mt="1rem" fontWeight="500" fontSize="22px">
            Add a note to view it here
          </Text>
        </Flex>
      )}
    </Box>
  )
}

export default NoteDetail
