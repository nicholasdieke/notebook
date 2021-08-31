import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react"
import { InputWrapper } from "app/core/components"
import { ChangeEvent, useState } from "react"
import { Eye, EyeOff, Lock } from "react-feather"

interface PasswordProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  helperText?: string
  isInvalid?: boolean
  isRequired?: boolean
}

const Password = ({
  onChange = () => null,
  helperText,
  isRequired,
  isInvalid,
  ...props
}: PasswordProps & InputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <InputWrapper
      key="passwordInputWrapper"
      label="Password"
      helperText={helperText}
      isInvalid={isInvalid}
      isRequired={isRequired}
    >
      <InputGroup alignItems="center" key="passwordInputGroup">
        <InputLeftElement pointerEvents="none" top="initial" ml="0.5rem">
          <Lock color="grey" />
        </InputLeftElement>
        <Input
          key="passwordInput"
          pl="3rem"
          pr="5.5rem"
          name="password"
          type={showPassword ? "text" : "password"}
          borderColor="grey"
          size="lg"
          onChange={onChange}
          errorBorderColor="error"
          {...props}
        />
        <InputRightElement width="4.5rem" mr="0.5rem" top="initial">
          <Button
            h="1.75rem"
            size="sm"
            onClick={() => setShowPassword(!showPassword)}
            leftIcon={showPassword ? <EyeOff size="14" /> : <Eye size="14" />}
            _focus={{
              boxShadow: "none",
            }}
          >
            {showPassword ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </InputWrapper>
  )
}

export default Password
