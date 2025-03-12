import { ReactNode } from "react"

import { Control, FieldPath, FieldValues } from "react-hook-form";

export type ChildrenType = Readonly<{ children: ReactNode }>

export type UploadFileType = File & {
  path?: string
  preview?: string
  formattedSize?: string
}

export type DropzoneFormInputProps = {
  label?: string
  className?: string
  labelClassName?: string
  helpText?: ReactNode | string
  showPreview?: boolean
  text?: string
  textClassName?: string
  onFileUpload?: (files: UploadFileType[]) => void
}


export type FormInputProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
  control: Control<TFieldValues>
  name: TName
  id?: string
  containerClassName?: string
  label?: string | ReactNode
  placeholder?: string
  noValidate?: boolean
  labelClassName?: string
}