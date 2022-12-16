/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { Event } from "../models";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
}) {
  const { tokens } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      (currentFieldValue !== undefined ||
        currentFieldValue !== null ||
        currentFieldValue !== "") &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  return (
    <React.Fragment>
      {isEditing && children}
      {!isEditing ? (
        <>
          <Text>{label}</Text>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            color={tokens.colors.brand.primary[80]}
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
}
export default function EventCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onCancel,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const { tokens } = useTheme();
  const initialValues = {
    name: undefined,
    id: undefined,
    startDate: undefined,
    endDate: undefined,
    Field0: undefined,
    is_done: false,
    map_point: undefined,
    types: [],
    user: undefined,
    descripcion: undefined,
  };
  const [name, setName] = React.useState(initialValues.name);
  const [id, setId] = React.useState(initialValues.id);
  const [startDate, setStartDate] = React.useState(initialValues.startDate);
  const [endDate, setEndDate] = React.useState(initialValues.endDate);
  const [Field0, setField0] = React.useState(initialValues.Field0);
  const [is_done, setIs_done] = React.useState(initialValues.is_done);
  const [map_point, setMap_point] = React.useState(initialValues.map_point);
  const [types, setTypes] = React.useState(initialValues.types);
  const [user, setUser] = React.useState(initialValues.user);
  const [descripcion, setDescripcion] = React.useState(
    initialValues.descripcion
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setId(initialValues.id);
    setStartDate(initialValues.startDate);
    setEndDate(initialValues.endDate);
    setField0(initialValues.Field0);
    setIs_done(initialValues.is_done);
    setMap_point(initialValues.map_point);
    setTypes(initialValues.types);
    setCurrentTypesValue(undefined);
    setUser(initialValues.user);
    setDescripcion(initialValues.descripcion);
    setErrors({});
  };
  const [currentTypesValue, setCurrentTypesValue] = React.useState(undefined);
  const typesRef = React.createRef();
  const validations = {
    name: [{ type: "Required" }],
    id: [{ type: "Required" }],
    startDate: [],
    endDate: [{ type: "Required" }],
    Field0: [],
    is_done: [],
    map_point: [],
    types: [],
    user: [{ type: "Required" }],
    descripcion: [],
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
  return (
    <Grid
      as="form"
      rowGap={tokens.space.xs.value}
      columnGap={tokens.space.xxxs.value}
      padding={tokens.space.xl.value}
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          id,
          startDate,
          endDate,
          Field0,
          is_done,
          map_point,
          types,
          user,
          descripcion,
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
          await DataStore.save(new Event(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...rest}
      {...getOverrideProps(overrides, "EventCreateForm")}
    >
      <TextField
        label="Titulo"
        isRequired={true}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              id,
              startDate,
              endDate,
              Field0,
              is_done,
              map_point,
              types,
              user,
              descripcion,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Sub Titulo"
        isRequired={true}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              id: value,
              startDate,
              endDate,
              Field0,
              is_done,
              map_point,
              types,
              user,
              descripcion,
            };
            const result = onChange(modelFields);
            value = result?.id ?? value;
          }
          if (errors.id?.hasError) {
            runValidationTasks("id", value);
          }
          setId(value);
        }}
        onBlur={() => runValidationTasks("id", id)}
        errorMessage={errors.id?.errorMessage}
        hasError={errors.id?.hasError}
        {...getOverrideProps(overrides, "id")}
      ></TextField>
      <TextField
        label="Comienzo"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              id,
              startDate: value,
              endDate,
              Field0,
              is_done,
              map_point,
              types,
              user,
              descripcion,
            };
            const result = onChange(modelFields);
            value = result?.startDate ?? value;
          }
          if (errors.startDate?.hasError) {
            runValidationTasks("startDate", value);
          }
          setStartDate(new Date(value).toISOString());
        }}
        onBlur={() => runValidationTasks("startDate", startDate)}
        errorMessage={errors.startDate?.errorMessage}
        hasError={errors.startDate?.hasError}
        {...getOverrideProps(overrides, "startDate")}
      ></TextField>
      <TextField
        label="Final"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              id,
              startDate,
              endDate: value,
              Field0,
              is_done,
              map_point,
              types,
              user,
              descripcion,
            };
            const result = onChange(modelFields);
            value = result?.endDate ?? value;
          }
          if (errors.endDate?.hasError) {
            runValidationTasks("endDate", value);
          }
          setEndDate(new Date(value).toISOString());
        }}
        onBlur={() => runValidationTasks("endDate", endDate)}
        errorMessage={errors.endDate?.errorMessage}
        hasError={errors.endDate?.hasError}
        {...getOverrideProps(overrides, "endDate")}
      ></TextField>
      <TextField
        label="Descripcion"
        isRequired={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              id,
              startDate,
              endDate,
              Field0: value,
              is_done,
              map_point,
              types,
              user,
              descripcion,
            };
            const result = onChange(modelFields);
            value = result?.Field0 ?? value;
          }
          if (errors.Field0?.hasError) {
            runValidationTasks("Field0", value);
          }
          setField0(value);
        }}
        onBlur={() => runValidationTasks("Field0", Field0)}
        errorMessage={errors.Field0?.errorMessage}
        hasError={errors.Field0?.hasError}
        {...getOverrideProps(overrides, "Field0")}
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
              name,
              id,
              startDate,
              endDate,
              Field0,
              is_done: value,
              map_point,
              types,
              user,
              descripcion,
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
        label="Localizacion"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              id,
              startDate,
              endDate,
              Field0,
              is_done,
              map_point: value,
              types,
              user,
              descripcion,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              id,
              startDate,
              endDate,
              Field0,
              is_done,
              map_point,
              types: values,
              user,
              descripcion,
            };
            const result = onChange(modelFields);
            values = result?.types ?? values;
          }
          setTypes(values);
          setCurrentTypesValue(undefined);
        }}
        currentFieldValue={currentTypesValue}
        label={"Tipo de Evento"}
        items={types}
        hasError={errors.types?.hasError}
        setFieldValue={setCurrentTypesValue}
        inputFieldRef={typesRef}
        defaultFieldValue={undefined}
      >
        <TextField
          label="Tipo de Evento"
          isRequired={false}
          isReadOnly={false}
          value={currentTypesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.types?.hasError) {
              runValidationTasks("types", value);
            }
            setCurrentTypesValue(value);
          }}
          onBlur={() => runValidationTasks("types", currentTypesValue)}
          errorMessage={errors.types?.errorMessage}
          hasError={errors.types?.hasError}
          ref={typesRef}
          {...getOverrideProps(overrides, "types")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Usuario"
        isRequired={true}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              id,
              startDate,
              endDate,
              Field0,
              is_done,
              map_point,
              types,
              user: value,
              descripcion,
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
      <TextField
        label="Descripcion"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              id,
              startDate,
              endDate,
              Field0,
              is_done,
              map_point,
              types,
              user,
              descripcion: value,
            };
            const result = onChange(modelFields);
            value = result?.descripcion ?? value;
          }
          if (errors.descripcion?.hasError) {
            runValidationTasks("descripcion", value);
          }
          setDescripcion(value);
        }}
        onBlur={() => runValidationTasks("descripcion", descripcion)}
        errorMessage={errors.descripcion?.errorMessage}
        hasError={errors.descripcion?.hasError}
        {...getOverrideProps(overrides, "descripcion")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Limpiar Formulario"
          type="reset"
          onClick={resetStateValues}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap={tokens.space.xxxs.value}
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Cancelar"
            type="button"
            onClick={() => {
              onCancel && onCancel();
            }}
            {...getOverrideProps(overrides, "CancelButton")}
          ></Button>
          <Button
            children="Subir Evento"
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
