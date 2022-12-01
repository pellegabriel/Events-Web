/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
export default function EventUpdateForm(props) {
  const {
    id,
    event,
    onSuccess,
    onError,
    onSubmit,
    onCancel,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Event: undefined,
    date: undefined,
    user: undefined,
    is_done: false,
    map_point: undefined,
  };
  const [Event, setEvent] = React.useState(initialValues.Event);
  const [date, setDate] = React.useState(initialValues.date);
  const [user, setUser] = React.useState(initialValues.user);
  const [is_done, setIs_done] = React.useState(initialValues.is_done);
  const [map_point, setMap_point] = React.useState(initialValues.map_point);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = { ...initialValues, ...eventRecord };
    setEvent(cleanValues.Event);
    setDate(cleanValues.date);
    setUser(cleanValues.user);
    setIs_done(cleanValues.is_done);
    setMap_point(cleanValues.map_point);
    setErrors({});
  };
  const [eventRecord, setEventRecord] = React.useState(event);
  React.useEffect(() => {
    const queryData = async () => {
      const record = id ? await DataStore.query(Event, id) : event;
      setEventRecord(record);
    };
    queryData();
  }, [id, event]);
  React.useEffect(resetStateValues, [eventRecord]);
  const validations = {
    Event: [],
    date: [],
    user: [{ type: "URL" }],
    is_done: [],
    map_point: [],
  };
  const runValidationTasks = async (fieldName, value) => {
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hour12: false,
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          Event,
          date,
          user: user || undefined,
          is_done,
          map_point,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          await DataStore.save(
            Event.copyOf(eventRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...rest}
      {...getOverrideProps(overrides, "EventUpdateForm")}
    >
      <TextField
        label="Event"
        isRequired={false}
        isReadOnly={false}
        defaultValue={Event}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Event: value,
              date,
              user,
              is_done,
              map_point,
            };
            const result = onChange(modelFields);
            value = result?.Event ?? value;
          }
          if (errors.Event?.hasError) {
            runValidationTasks("Event", value);
          }
          setEvent(value);
        }}
        onBlur={() => runValidationTasks("Event", Event)}
        errorMessage={errors.Event?.errorMessage}
        hasError={errors.Event?.hasError}
        {...getOverrideProps(overrides, "Event")}
      ></TextField>
      <TextField
        label="Date"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        defaultValue={date && convertToLocal(new Date(date))}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Event,
              date: value,
              user,
              is_done,
              map_point,
            };
            const result = onChange(modelFields);
            value = result?.date ?? value;
          }
          if (errors.date?.hasError) {
            runValidationTasks("date", value);
          }
          setDate(new Date(value).toISOString());
        }}
        onBlur={() => runValidationTasks("date", date)}
        errorMessage={errors.date?.errorMessage}
        hasError={errors.date?.hasError}
        {...getOverrideProps(overrides, "date")}
      ></TextField>
      <TextField
        label="User"
        isRequired={false}
        isReadOnly={false}
        defaultValue={user}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Event,
              date,
              user: value,
              is_done,
              map_point,
            };
            const result = onChange(modelFields);
            value = result?.user ?? value;
          }
          if (errors.user?.hasError) {
            runValidationTasks("user", value);
          }
          setUser(value);
        }}
        onBlur={() => runValidationTasks("user", user)}
        errorMessage={errors.user?.errorMessage}
        hasError={errors.user?.hasError}
        {...getOverrideProps(overrides, "user")}
      ></TextField>
      <SwitchField
        label="Is done"
        defaultChecked={false}
        isDisabled={false}
        isChecked={is_done}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              Event,
              date,
              user,
              is_done: value,
              map_point,
            };
            const result = onChange(modelFields);
            value = result?.is_done ?? value;
          }
          if (errors.is_done?.hasError) {
            runValidationTasks("is_done", value);
          }
          setIs_done(value);
        }}
        onBlur={() => runValidationTasks("is_done", is_done)}
        errorMessage={errors.is_done?.errorMessage}
        hasError={errors.is_done?.hasError}
        {...getOverrideProps(overrides, "is_done")}
      ></SwitchField>
      <TextField
        label="Map point"
        isRequired={false}
        isReadOnly={false}
        type="date"
        defaultValue={map_point}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Event,
              date,
              user,
              is_done,
              map_point: value,
            };
            const result = onChange(modelFields);
            value = result?.map_point ?? value;
          }
          if (errors.map_point?.hasError) {
            runValidationTasks("map_point", value);
          }
          setMap_point(value);
        }}
        onBlur={() => runValidationTasks("map_point", map_point)}
        errorMessage={errors.map_point?.errorMessage}
        hasError={errors.map_point?.hasError}
        {...getOverrideProps(overrides, "map_point")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={resetStateValues}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Cancel"
            type="button"
            onClick={() => {
              onCancel && onCancel();
            }}
            {...getOverrideProps(overrides, "CancelButton")}
          ></Button>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
