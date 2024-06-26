/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from 'react'
import { Button, Flex, Grid, TextField, useTheme } from '@aws-amplify/ui-react'
import { getOverrideProps } from '@aws-amplify/ui-react/internal'
import { Event } from '../models'
import { fetchByPath, validateField } from './utils'
import { DataStore } from 'aws-amplify'
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
  } = props
  const { tokens } = useTheme()
  const initialValues = {
    name: '',
  }
  const [name, setName] = React.useState(initialValues.name)
  const [errors, setErrors] = React.useState({})
  const resetStateValues = () => {
    setName(initialValues.name)
    setErrors({})
  }
  const validations = {
    name: [{ type: 'Required' }],
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
      rowGap={tokens.space.xs.value}
      columnGap={tokens.space.xxxs.value}
      padding={tokens.space.xl.value}
      onSubmit={async (event) => {
        event.preventDefault()
        let modelFields = {
          name,
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
          await DataStore.save(new Event(modelFields))
          if (onSuccess) {
            onSuccess(modelFields)
          }
          if (clearOnSuccess) {
            resetStateValues()
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message)
          }
        }
      }}
      {...getOverrideProps(overrides, 'EventCreateForm')}
      {...rest}
    >
      <TextField
        label="Nombre del evento"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target
          if (onChange) {
            const modelFields = {
              name: value,
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
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, 'CTAFlex')}
      >
        <Button
          children="Limpiar"
          type="reset"
          onClick={(event) => {
            event.preventDefault()
            resetStateValues()
          }}
          {...getOverrideProps(overrides, 'ClearButton')}
        ></Button>
        <Flex
          gap={tokens.space.xxxs.value}
          {...getOverrideProps(overrides, 'RightAlignCTASubFlex')}
        >
          <Button
            children="Cancelar"
            type="button"
            onClick={() => {
              onCancel && onCancel()
            }}
            {...getOverrideProps(overrides, 'CancelButton')}
          ></Button>
          <Button
            children="Subir Evento"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, 'SubmitButton')}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  )
}
