/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from 'react'
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from '@aws-amplify/ui-react'
import { getOverrideProps } from '@aws-amplify/ui-react/internal'
import { EventTypes } from '../models'
import { fetchByPath, validateField } from './utils'
import { DataStore } from 'aws-amplify'
export default function EventTypesUpdateForm(props) {
  const {
    id: idProp,
    eventTypes,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props
  const initialValues = {
    name: '',
    enabled: false,
  }
  const [name, setName] = React.useState(initialValues.name)
  const [enabled, setEnabled] = React.useState(initialValues.enabled)
  const [errors, setErrors] = React.useState({})
  const resetStateValues = () => {
    const cleanValues = eventTypesRecord
      ? { ...initialValues, ...eventTypesRecord }
      : initialValues
    setName(cleanValues.name)
    setEnabled(cleanValues.enabled)
    setErrors({})
  }
  const [eventTypesRecord, setEventTypesRecord] = React.useState(eventTypes)
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(EventTypes, idProp)
        : eventTypes
      setEventTypesRecord(record)
    }
    queryData()
  }, [idProp, eventTypes])
  React.useEffect(resetStateValues, [eventTypesRecord])
  const validations = {
    name: [],
    enabled: [],
  }
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue,
  ) => {
    const value = getDisplayValue ? getDisplayValue(currentValue) : currentValue
    let validationResponse = validateField(value, validations[fieldName])
    const customValidator = fetchByPath(onValidate, fieldName)
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse)
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }))
    return validationResponse
  }
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault()
        let modelFields = {
          name,
          enabled,
        }
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item),
                ),
              )
              return promises
            }
            promises.push(runValidationTasks(fieldName, modelFields[fieldName]))
            return promises
          }, []),
        )
        if (validationResponses.some((r) => r.hasError)) {
          return
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields)
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === 'string' && value.trim() === '') {
              modelFields[key] = undefined
            }
          })
          await DataStore.save(
            EventTypes.copyOf(eventTypesRecord, (updated) => {
              Object.assign(updated, modelFields)
            }),
          )
          if (onSuccess) {
            onSuccess(modelFields)
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message)
          }
        }
      }}
      {...getOverrideProps(overrides, 'EventTypesUpdateForm')}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target
          if (onChange) {
            const modelFields = {
              name: value,
              enabled,
            }
            const result = onChange(modelFields)
            value = result?.name ?? value
          }
          if (errors.name?.hasError) {
            runValidationTasks('name', value)
          }
          setName(value)
        }}
        onBlur={() => runValidationTasks('name', name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, 'name')}
      ></TextField>
      <SwitchField
        label="Enabled"
        defaultChecked={false}
        isDisabled={false}
        isChecked={enabled}
        onChange={(e) => {
          let value = e.target.checked
          if (onChange) {
            const modelFields = {
              name,
              enabled: value,
            }
            const result = onChange(modelFields)
            value = result?.enabled ?? value
          }
          if (errors.enabled?.hasError) {
            runValidationTasks('enabled', value)
          }
          setEnabled(value)
        }}
        onBlur={() => runValidationTasks('enabled', enabled)}
        errorMessage={errors.enabled?.errorMessage}
        hasError={errors.enabled?.hasError}
        {...getOverrideProps(overrides, 'enabled')}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, 'CTAFlex')}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault()
            resetStateValues()
          }}
          isDisabled={!(idProp || eventTypes)}
          {...getOverrideProps(overrides, 'ResetButton')}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, 'RightAlignCTASubFlex')}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || eventTypes) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, 'SubmitButton')}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  )
}
