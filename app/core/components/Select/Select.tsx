import { InputProps, InputWrapper } from "app/core/components/index"
import { FC } from "react"
import ReactSelect, { Props } from "react-select"
import ReactAsyncSelect, { Props as AsyncProps } from "react-select/async"
import CreatableSelect from "react-select/creatable"

const customStyles = ({ colors }) => ({
  multiValue: (styles, { data }) =>
    data.isFixed
      ? { ...styles, backgroundColor: colors.primary, borderColor: "blue" }
      : { ...styles, backgroundColor: colors.primary },
  multiValueLabel: (styles, { data }) =>
    data.isFixed ? { ...styles, paddingRight: 6 } : { ...styles, color: colors.black },
  multiValueRemove: (styles, { data }) =>
    data.isFixed
      ? { ...styles, display: "none" }
      : {
          ...styles,
          color: colors.black,
          ":hover": { color: colors.white },
        },
  control: (styles) => ({
    ...styles,
    borderColor: "inherit",
    boxShadow: "none",
    minHeight: "2.5rem",
    borderRadius: "0.375rem",
    ":hover": {
      borderColor: "inherit",
    },
  }),
  input: (styles) => ({
    ...styles,
    paddingLeft: "0.45rem",
  }),
  valueContainer: (styles) => ({
    ...styles,
    paddingLeft: "0.45rem",
  }),
  singleValue: (styles) => ({
    ...styles,
    paddingLeft: "0.45rem",
    fontSize: "1rem",
  }),
  placeholder: (styles) => ({
    ...styles,
    paddingLeft: "0.45rem",
    fontSize: "1rem",
    color: "#cdd4de",
  }),

  indicatorSeparator: (styles) => ({
    ...styles,
    display: "none",
  }),
})

export type SelectProps = InputProps & Props<any, boolean> & { error?: string }
export type AsyncSelectProps = InputProps & AsyncProps<any, any> & { error?: string }

export const Select = ({
  label,
  helperText,
  half,
  third,
  mb,
  testId,
  error,
  isCreatable,
  ...props
}: SelectProps) => {
  const SelectComponent = isCreatable ? (
    <CreatableSelect
      isClearable
      noOptionsMessage={() => "Start typing to see results"}
      classNamePrefix="react-select"
      placeholder=" "
      {...props}
      // styles={merge(styles, props.styles || {})}
    />
  ) : (
    <ReactSelect
      noOptionsMessage={() => "Start typing to see results"}
      classNamePrefix="react-select"
      placeholder=" "
      {...props}
      // styles={merge(styles, props.styles || {})}
    />
  )

  return (
    <InputWrapper
      label={label}
      helperText={helperText || error}
      half={half}
      third={third}
      mb={mb}
      isInvalid={props.isInvalid || !!error}
      isRequired={props.isRequired}
      data-testid={testId}
    >
      {SelectComponent}
    </InputWrapper>
  )
}

export const AsyncSelect: FC<AsyncSelectProps> = ({
  label,
  helperText,
  half,
  third,
  error,
  ...props
}) => {
  return (
    <InputWrapper
      label={label}
      helperText={helperText || error}
      half={half}
      third={third}
      isRequired={props.isRequired}
      isInvalid={props.isInvalid || !!error}
    >
      <ReactAsyncSelect
        noOptionsMessage={() => "Start typing to see results"}
        classNamePrefix="react-select"
        placeholder=" "
        {...props}
        // styles={merge(styles, props.styles || {})}
      />
    </InputWrapper>
  )
}
