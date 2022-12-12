/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type EventCreateFormInputValues = {
    name?: string;
    id?: string;
    startDate?: string;
    endDate?: string;
    Field0?: string;
    is_done?: boolean;
    map_point?: string;
    types?: string[];
    user?: string;
    description?: string;
};
export declare type EventCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    id?: ValidationFunction<string>;
    startDate?: ValidationFunction<string>;
    endDate?: ValidationFunction<string>;
    Field0?: ValidationFunction<string>;
    is_done?: ValidationFunction<boolean>;
    map_point?: ValidationFunction<string>;
    types?: ValidationFunction<string>;
    user?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EventCreateFormOverridesProps = {
    EventCreateFormGrid?: FormProps<GridProps>;
    name?: FormProps<TextFieldProps>;
    id?: FormProps<TextFieldProps>;
    startDate?: FormProps<TextFieldProps>;
    endDate?: FormProps<TextFieldProps>;
    Field0?: FormProps<TextFieldProps>;
    is_done?: FormProps<SwitchFieldProps>;
    map_point?: FormProps<TextFieldProps>;
    types?: FormProps<TextFieldProps>;
    user?: FormProps<TextFieldProps>;
    description?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EventCreateFormProps = React.PropsWithChildren<{
    overrides?: EventCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EventCreateFormInputValues) => EventCreateFormInputValues;
    onSuccess?: (fields: EventCreateFormInputValues) => void;
    onError?: (fields: EventCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: EventCreateFormInputValues) => EventCreateFormInputValues;
    onValidate?: EventCreateFormValidationValues;
} & React.CSSProperties>;
export default function EventCreateForm(props: EventCreateFormProps): React.ReactElement;
