import { Button, Flex, Heading } from "@chakra-ui/react"
import signup from "app/auth/mutations/signup"
import { Input } from "app/core/components"
import EmailAddress from "app/core/components/EmailAddress"
import { FORM_ERROR } from "app/core/components/Form"
import Password from "app/core/components/Password"
import { useMutation } from "blitz"
import { useFormik } from "formik"
import * as yup from "yup"

type SignupFormProps = {
  onSuccess?: () => void
}

const validationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(100).required(),
})

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const { values, handleChange, setFieldValue, handleSubmit, errors, setErrors, setFieldError } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validateOnChange: false,
      validationSchema,
      onSubmit: async (values) => {
        try {
          console.log(values)
          await signupMutation(values)
          props.onSuccess?.()
        } catch (error) {
          if (error.code === "P2002" && error.meta?.target?.includes("email")) {
            // This error comes from Prisma
            return { email: "This email is already being used" }
          } else if (error.name === "AuthorizationError") {
            setFieldError("email", error.message.toString())
          } else {
            return { [FORM_ERROR]: error.toString() }
          }
        }
      },
    })

  // return (
  //   <div>
  //     <h1>Create an Account</h1>

  //     <Form
  //       submitText="Create Account"
  //       schema={Signup}
  //       initialValues={{name: "", email: "", password: "" }}
  //       onSubmit={async (values) => {
  //         try {
  //           await signupMutation(values)
  //           props.onSuccess?.()
  //         } catch (error) {
  //           if (error.code === "P2002" && error.meta?.target?.includes("email")) {
  //             // This error comes from Prisma
  //             return { email: "This email is already being used" }
  //           } else {
  //             return { [FORM_ERROR]: error.toString() }
  //           }
  //         }
  //       }}
  //     >
  //               <LabeledTextField name="name" label="Name" placeholder="Name" />
  //       <LabeledTextField name="email" label="Email" placeholder="Email" />
  //       <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
  //     </Form>
  //   </div>
  // )
  return (
    <Flex
      w="100vw"
      h="95vh"
      overflow="hidden"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      position="relative"
      bg="white"
    >
      <Heading mb="2rem">Sign up</Heading>
      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          label="Name"
          onChange={handleChange}
          isInvalid={!!errors.name}
          helperText={errors.name}
          isRequired
          error={errors.name}
        />
        <EmailAddress
          onChange={handleChange}
          isInvalid={!!errors.email}
          isRequired
          helperText={errors.email}
          error={errors.email}
        />
        <Password
          onChange={handleChange}
          isInvalid={!!errors.password}
          isRequired
          helperText={errors.password}
        />
        <Button mt="0.5rem" w="100%" colorScheme="purple" type="submit">
          Create account
        </Button>
      </form>
    </Flex>
  )
}

export default SignupForm
