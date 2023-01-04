/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react'
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal'
import {
  GridProps,
  SwitchFieldProps,
  TextFieldProps,
} from '@aws-amplify/ui-react'
export declare type ValidationResponse = {
  hasError: boolean
  errorMessage?: string
}
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse,
) => ValidationResponse | Promise<ValidationResponse>
export declare type EventCreateFormInputValues = {
  name?: string
  subTitulo?: string
  startDate?: string
  endDate?: string
  is_done?: boolean
  descripcion?: string
  map_point?: string
  types?: string[]
}
export declare type EventCreateFormValidationValues = {
  name?: ValidationFunction<string>
  subTitulo?: ValidationFunction<string>
  startDate?: ValidationFunction<string>
  endDate?: ValidationFunction<string>
  is_done?: ValidationFunction<boolean>
  descripcion?: ValidationFunction<string>
  map_point?: ValidationFunction<string>
  types?: ValidationFunction<string>
}
export declare type FormProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>
export declare type EventCreateFormOverridesProps = {
  EventCreateFormGrid?: FormProps<GridProps>
  name?: FormProps<TextFieldProps>
  subTitulo?: FormProps<TextFieldProps>
  startDate?: FormProps<TextFieldProps>
  endDate?: FormProps<TextFieldProps>
  is_done?: FormProps<SwitchFieldProps>
  descripcion?: FormProps<TextFieldProps>
  map_point?: FormProps<TextFieldProps>
  types?: FormProps<TextFieldProps>
} & EscapeHatchProps
export declare type EventCreateFormProps = React.PropsWithChildren<
  {
    overrides?: EventCreateFormOverridesProps | undefined | null
  } & {
    clearOnSuccess?: boolean
    onSubmit?: (
      fields: EventCreateFormInputValues,
    ) => EventCreateFormInputValues
    onSuccess?: (fields: EventCreateFormInputValues) => void
    onError?: (fields: EventCreateFormInputValues, errorMessage: string) => void
    onCancel?: () => void
    onChange?: (
      fields: EventCreateFormInputValues,
    ) => EventCreateFormInputValues
    onValidate?: EventCreateFormValidationValues
  } & React.CSSProperties
>
export default function EventCreateForm(
  props: EventCreateFormProps,
): React.ReactElement
