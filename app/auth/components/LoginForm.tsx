import { Box, Button, Flex, Heading } from "@chakra-ui/react"
import login from "app/auth/mutations/login"
import EmailAddress from "app/core/components/EmailAddress"
import { FORM_ERROR } from "app/core/components/Form"
import Password from "app/core/components/Password"
import { AuthenticationError, Link, Routes, useMutation, useRouter } from "blitz"
import { useFormik } from "formik"
import * as yup from "yup"

const schema = yup.object({
  email: yup.string().email(),
  password: yup.string(),
})

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const router = useRouter()

  const { values, handleChange, setFieldValue, handleSubmit, errors, setErrors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: false,
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        await loginMutation(values)
        const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
        router.push(next)
      } catch (error) {
        if (error instanceof AuthenticationError) {
          return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
        } else {
          return {
            [FORM_ERROR]:
              "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
          }
        }
      }
    },
  })

  return (
    <Box>
      <Heading mb="2rem">Login</Heading>
      <form onSubmit={handleSubmit}>
        <EmailAddress
          onChange={handleChange}
          isInvalid={!!errors.email}
          helperText={errors.email}
          isRequired
        />
        <Password
          onChange={handleChange}
          isInvalid={!!errors.password}
          isRequired
          helperText={errors.password}
          data-testid="passwordInput"
        />
        <Flex mb="0.5rem">
          <Link href={Routes.ForgotPasswordPage()}>
            <a>Forgot your password?</a>
          </Link>
        </Flex>
        <Button mt="0.5rem" w="100%" colorScheme="purple" type="submit">
          Log in
        </Button>
      </form>

      <div style={{ marginTop: "1rem" }}>
        Or <Link href={Routes.SignupPage()}>Sign Up</Link>
      </div>
    </Box>
  )
}

export default LoginForm
