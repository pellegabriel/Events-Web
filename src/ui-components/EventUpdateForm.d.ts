/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Event } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type EventUpdateFormInputValues = {
    name?: string;
    startDate?: string;
    endDate?: string;
    is_done?: boolean;
    map_point?: string;
    types?: string[];
    user?: string;
};
export declare type EventUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    startDate?: ValidationFunction<string>;
    endDate?: ValidationFunction<string>;
    is_done?: ValidationFunction<boolean>;
    map_point?: ValidationFunction<string>;
    types?: ValidationFunction<string>;
    user?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EventUpdateFormOverridesProps = {
    EventUpdateFormGrid?: FormProps<GridProps>;
    name?: FormProps<TextFieldProps>;
    startDate?: FormProps<TextFieldProps>;
    endDate?: FormProps<TextFieldProps>;
    is_done?: FormProps<SwitchFieldProps>;
    map_point?: FormProps<TextFieldProps>;
    types?: FormProps<TextFieldProps>;
    user?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EventUpdateFormProps = React.PropsWithChildren<{
    overrides?: EventUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    event?: Event;
    onSubmit?: (fields: EventUpdateFormInputValues) => EventUpdateFormInputValues;
    onSuccess?: (fields: EventUpdateFormInputValues) => void;
    onError?: (fields: EventUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: EventUpdateFormInputValues) => EventUpdateFormInputValues;
    onValidate?: EventUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EventUpdateForm(props: EventUpdateFormProps): React.ReactElement;
