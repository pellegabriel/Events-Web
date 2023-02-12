/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type EventTypesCreateFormInputValues = {
    name?: string;
    enabled?: boolean;
};
export declare type EventTypesCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    enabled?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EventTypesCreateFormOverridesProps = {
    EventTypesCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    enabled?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type EventTypesCreateFormProps = React.PropsWithChildren<{
    overrides?: EventTypesCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EventTypesCreateFormInputValues) => EventTypesCreateFormInputValues;
    onSuccess?: (fields: EventTypesCreateFormInputValues) => void;
    onError?: (fields: EventTypesCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EventTypesCreateFormInputValues) => EventTypesCreateFormInputValues;
    onValidate?: EventTypesCreateFormValidationValues;
} & React.CSSProperties>;
export default function EventTypesCreateForm(props: EventTypesCreateFormProps): React.ReactElement;
