import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react"
import { Input, Select } from "app/core/components/index"
import createNoteMutation from "app/notes/mutations/createNote"
import { useMutation } from "blitz"
import { useFormik } from "formik"
import { FC } from "react"
import { Edit2 } from "react-feather"
import * as yup from "yup"

const validationSchema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
  tags: yup.array(yup.string()),
})

interface AddNoteFormProps {
  isOpen: boolean
  handleClose: () => void
}

const AddNoteForm: FC<AddNoteFormProps> = ({ isOpen, handleClose }) => {
  const [createNote] = useMutation(createNoteMutation)

  const onSubmit = async (values) => {
    setErrors({})

    await createNote({ ...values })

    if (handleClose) handleClose()
  }

  const { values, handleChange, setFieldValue, handleSubmit, errors, setErrors } = useFormik({
    initialValues: {
      title: "",
      content: "",
      tags: [],
    },
    validateOnChange: false,
    validationSchema,
    onSubmit,
  })

  const tagOptions = ["Idea", "Travel", "Sports", "Tech"]

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />

          <ModalBody>
            <Box data-testid="modal" py="1rem">
              <Flex mb="1rem" alignItems="center">
                <Edit2 />
                <Text ml="0.5rem" fontSize="2xl" fontWeight="700">
                  New note
                </Text>
              </Flex>
              <form onSubmit={handleSubmit}>
                <Flex
                  flexWrap="wrap"
                  justifyContent="space-between"
                  bg="white"
                  p="1rem"
                  borderRadius="10px"
                  boxShadow="wom"
                >
                  <Input
                    name="title"
                    label="Title"
                    value={values.title}
                    onChange={handleChange}
                    isInvalid={!!errors?.title}
                    helperText={errors?.title as string}
                    mb="0.5rem"
                  />
                  <Input
                    name="content"
                    label="Content"
                    value={values.content}
                    onChange={handleChange}
                    isInvalid={!!errors?.content}
                    helperText={errors?.content as string}
                    mb="0.5rem"
                  />
                  <Select
                    name="tags"
                    label="Tags"
                    value={values.tags.map((opt) => ({ label: `${opt}`, value: `${opt}` }))}
                    defaultValue={values.tags.map((val) => ({ label: val, value: val }))}
                    options={tagOptions.map((opt) => ({ label: `${opt}`, value: `${opt}` }))}
                    isCreatable={true}
                    onChange={(newVal) =>
                      setFieldValue(
                        "tags",
                        newVal?.map(({ value }) => value)
                      )
                    }
                    isMulti
                  />
                </Flex>

                <Button colorScheme="purple" variant="solid" w="100%" mt="1rem" type="submit">
                  Create
                </Button>
              </form>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddNoteForm
