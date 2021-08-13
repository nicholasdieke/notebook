import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
} from "@chakra-ui/react"
import { FC, useRef } from "react"

interface ConfirmModalProps {
  title: string
  confirmText?: string
  cancelText?: string
  isNegative?: boolean
  onConfirm?: () => void
  onCancel?: () => void
  onClose?: () => void
  hideConfirm?: boolean
  hideCancel?: boolean
  size?: string
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  title,
  confirmText = "Confirm",
  cancelText = "Cancel",
  children,
  isNegative,
  onConfirm = () => null,
  onCancel = () => null,
  onClose = () => null,
  hideConfirm = false,
  hideCancel = false,
  size,
}) => {
  const cancelRef = useRef(null)

  return (
    <AlertDialog isOpen={true} leastDestructiveRef={cancelRef} onClose={onClose} size={size}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogBody>{children}</AlertDialogBody>
          <AlertDialogFooter>
            <Flex w="100%" justifyContent="space-between">
              {!hideCancel && (
                <Button
                  ref={cancelRef}
                  onClick={onCancel}
                  variant="outline"
                  colorScheme={isNegative ? "red" : "purple"}
                  _hover={{
                    opacity: isNegative ? "1" : "0.6",
                  }}
                  w="45%"
                >
                  {cancelText}
                </Button>
              )}
              {!hideConfirm && (
                <Button
                  onClick={onConfirm}
                  colorScheme={isNegative ? "red" : "purple"}
                  color="white"
                  _hover={{
                    opacity: 0.6,
                  }}
                  w="45%"
                >
                  {confirmText}
                </Button>
              )}
            </Flex>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default ConfirmModal
