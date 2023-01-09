/*******************************************************************************************************
 * Se cambia el componente de carpeta para que este no sea actualizado por cambios en Amplify Studio.  *
 ******************************************************************************************************/

import * as React from 'react'
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal'
import { GridProps, TextFieldProps } from '@aws-amplify/ui-react'
import { Event } from '../../models'
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
}
export declare type EventCreateFormValidationValues = {
  name?: ValidationFunction<string>
}
export declare type FormProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>
export declare type EventCreateFormOverridesProps = {
  EventCreateFormGrid?: FormProps<GridProps>
  name?: FormProps<TextFieldProps>
} & EscapeHatchProps
export declare type EventCreateFormProps = React.PropsWithChildren<
  {
    overrides?: EventCreateFormOverridesProps | undefined | null
  } & {
    clearOnSuccess?: boolean
    onSubmit?: (
      fields: EventCreateFormInputValues,
    ) => EventCreateFormInputValues
    onSuccess?: (fields: Event) => void
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
