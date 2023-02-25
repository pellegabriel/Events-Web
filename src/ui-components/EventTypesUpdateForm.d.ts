/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { EventTypes } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type EventTypesUpdateFormInputValues = {
    name?: string;
    enabled?: boolean;
};
export declare type EventTypesUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    enabled?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EventTypesUpdateFormOverridesProps = {
    EventTypesUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    enabled?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type EventTypesUpdateFormProps = React.PropsWithChildren<{
    overrides?: EventTypesUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    eventTypes?: EventTypes;
    onSubmit?: (fields: EventTypesUpdateFormInputValues) => EventTypesUpdateFormInputValues;
    onSuccess?: (fields: EventTypesUpdateFormInputValues) => void;
    onError?: (fields: EventTypesUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EventTypesUpdateFormInputValues) => EventTypesUpdateFormInputValues;
    onValidate?: EventTypesUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EventTypesUpdateForm(props: EventTypesUpdateFormProps): React.ReactElement;
