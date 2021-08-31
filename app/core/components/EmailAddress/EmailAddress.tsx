import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { InputWrapper } from "app/core/components"
import { InputProps } from "app/core/components/Input"
import { ChangeEvent } from "react"
import { Mail } from "react-feather"

interface EmailAddressProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  helperText?: string
  isInvalid?: boolean
  isRequired?: boolean
}

const EmailAddress = ({
  onChange,
  helperText,
  isRequired,
  isInvalid,
  ...props
}: EmailAddressProps & InputProps) => (
  <InputWrapper
    label="Email address"
    helperText={helperText}
    isRequired={isRequired}
    isInvalid={isInvalid}
  >
    <InputGroup alignItems="center">
      <InputLeftElement pointerEvents="none" top="initial" ml="0.5rem">
        <Mail color="grey" />
      </InputLeftElement>
      <Input
        pl="3rem"
        name="email"
        type="email"
        size="lg"
        borderColor="grey"
        data-testid="emailInput"
        onChange={onChange}
        _focus={{
          boxShadow: "none",
          borderColor: "initial",
        }}
        {...props}
      />
    </InputGroup>
  </InputWrapper>
)

export default EmailAddress
