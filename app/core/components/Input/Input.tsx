import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react"
import { FC } from "react"

export interface InputProps {
  id?: string
  label?: string
  helperText?: string
  half?: boolean
  third?: boolean
  flexBasis?: string
  mb?: string
  isRequired?: boolean
  isInvalid?: boolean
  error?: string
}

const InputWrapper: FC<InputProps> = ({
  id,
  label,
  helperText,
  children,
  half,
  third,
  flexBasis,
  mb = "0.75rem",
  isRequired,
  isInvalid,
  ...props
}) => {
  const basis = half ? "49%" : third ? "32.5%" : "initial"
  return (
    <FormControl id={id} flexBasis={flexBasis || basis} isRequired={isRequired} mb={mb} {...props}>
      <FormLabel fontSize="14px" margin="0">
        {label}
      </FormLabel>
      {children}
      {helperText && (
        <FormHelperText
          fontSize="12px"
          fontWeight="600"
          margin="0"
          color={isInvalid ? "red" : "initial"}
        >
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export const InputWithWrapper: FC<InputProps & ChakraInputProps> = ({
  id,
  label,
  helperText,
  half,
  third,
  flexBasis,
  error,
  ...props
}) => (
  <InputWrapper
    id={id}
    label={label}
    half={half}
    third={third}
    flexBasis={flexBasis}
    helperText={helperText || error}
    isRequired={props?.isRequired}
    isInvalid={props?.isInvalid || !!error}
    mb={props.mb ? props.mb : "0px"}
  >
    <Input errorBorderColor="error" {...props} data-hj-allow />
  </InputWrapper>
)

export default InputWrapper
