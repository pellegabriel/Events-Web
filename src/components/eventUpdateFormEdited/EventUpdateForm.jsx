/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import { useRouter } from 'next/router'
import Map from '../../../pages/map/userMarker'
import Select from 'react-select'
import * as React from 'react'
import { fetchByPath, validateField } from '../../ui-components/utils'
import { Event } from '../../models'
import { getOverrideProps } from '@aws-amplify/ui-react/internal'
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
} from '@aws-amplify/ui-react'
import { DataStore } from 'aws-amplify'
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
  const { tokens } = useTheme()
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState()
  const [isEditing, setIsEditing] = React.useState()
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus()
    }
  }, [isEditing])
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex)
    await onChange(newItems)
    setSelectedBadgeIndex(undefined)
  }
  const addItem = async () => {
    if (
      (currentFieldValue !== undefined ||
        currentFieldValue !== null ||
        currentFieldValue !== '') &&
      !hasError
    ) {
      const newItems = [...items]
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue
        setSelectedBadgeIndex(undefined)
      } else {
        newItems.push(currentFieldValue)
      }
      await onChange(newItems)
      setIsEditing(false)
    }
  }
  return (
    <React.Fragment>
      {isEditing && children}
      {!isEditing ? (
        <>
          <Text>{label}</Text>
          <Button
            onClick={() => {
              setIsEditing(true)
            }}
          >
            Agrega otra categoria a tu evento
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
                setFieldValue(defaultFieldValue)
                setIsEditing(false)
                setSelectedBadgeIndex(undefined)
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
            {selectedBadgeIndex !== undefined ? 'Save' : 'Add'}
          </Button>
        </Flex>
      )}
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={'7rem'}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: 'pointer',
                  alignItems: 'center',
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? '#B8CEF9' : '',
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index)
                  setFieldValue(items[index])
                  setIsEditing(true)
                }}
              >
                {value.toString()}
                <Icon
                  style={{
                    cursor: 'pointer',
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: 'M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z',
                      stroke: 'black',
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    removeItem(index)
                  }}
                />
              </Badge>
            )
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  )
}
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
  } = props
  const router = useRouter()
  const eventTitle = router.query.eventTitle
  const { tokens } = useTheme()
  const { eventTypesOptions = [] } = rest
  const initialValues = {
    name: undefined,
    subTitulo: undefined,
    startDate: undefined,
    endDate: undefined,
    is_done: false,
    map_point: undefined,
    types: [],
    descripcion: undefined,
  }
  const [name, setName] = React.useState(initialValues.name)
  const [subTitulo, setSubTitulo] = React.useState(initialValues.subTitulo)
  const [startDate, setStartDate] = React.useState(initialValues.startDate)
  const [endDate, setEndDate] = React.useState(initialValues.endDate)
  const [is_done, setIs_done] = React.useState(initialValues.is_done)
  const [map_point, setMap_point] = React.useState(initialValues.map_point)
  const [types, setTypes] = React.useState(initialValues.types)
  const [descripcion, setDescripcion] = React.useState(
    initialValues.descripcion,
  )

  const [errors, setErrors] = React.useState({})
  const resetStateValues = () => {
    const cleanValues = { ...initialValues, ...eventRecord }
    setName(cleanValues.name)
    setSubTitulo(cleanValues.subTitulo)
    setStartDate(cleanValues.startDate)
    setEndDate(cleanValues.endDate)
    setIs_done(cleanValues.is_done)
    setMap_point(cleanValues.map_point)
    setTypes(cleanValues.types ?? [])
    setCurrentTypesValue(undefined)
    setDescripcion(cleanValues.descripcion)
    setErrors({})
  }
  const [eventRecord, setEventRecord] = React.useState(event)
  React.useEffect(() => {
    const queryData = async () => {
      const record = id ? await DataStore.query(Event, id) : event
      setEventRecord(record)
    }
    queryData()
  }, [id, event])
  React.useEffect(resetStateValues, [eventRecord])
  const [currentTypesValue, setCurrentTypesValue] = React.useState(undefined)
  const typesRef = React.createRef()
  const validations = {
    name: [{ type: 'Required' }],
    subTitulo: [],
    startDate: [],
    endDate: [{ type: 'Required' }],
    is_done: [],
    map_point: [],
    types: [],
    descripcion: [],
  }
  console.log('typesRendercentralll', { types, currentTypesValue })
  const typesOptions = eventTypesOptions.map((options) => ({
    value: options.id,
    label: options.name,
  }))
  const typesDictionary = Object.assign(
    {},
    ...(typesOptions &&
      typesOptions.map((item) => ({ [item.id]: item.label }))),
  )
  const convertedTypes = types.map((item) => {
    if (typesDictionary.hasOwnProperty(item)) {
      return typesDictionary[item]
    } else {
      if (item.hasOwnProperty('label')) {
        return item.label
      }
    }
    return item
  })

  const runValidationTasks = async (fieldName, value) => {
    let validationResponse = validateField(value, validations[fieldName])
    const customValidator = fetchByPath(onValidate, fieldName)
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse)
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }))
    return validationResponse
  }
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat('default', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      calendar: 'iso8601',
      numberingSystem: 'latn',
      hour12: false,
    })
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value
      return acc
    }, {})
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`
  }

  const handleDragEnd = (value) => {
    if (onChange) {
      const modelFields = {
        name,
        subTitulo,
        startDate,
        endDate,
        is_done,
        map_point: value,
        types,
        descripcion,
      }
      const result = onChange(modelFields)
      value = result?.map_point ?? value
    }
    if (errors.map_point?.hasError) {
      runValidationTasks('map_point', value)
    }
    setMap_point(value)
  }
  //cambios :
  // const onChange = (selectedOptions:
  //   OnChangeValue<ColourOption, true>) =>
  //   setSelected(selectedOptions);

  console.log('asdasd', { currentTypesValue })
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
          subTitulo,
          startDate,
          endDate,
          is_done,
          map_point,
          types,
          descripcion,
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
          console.log('estodeAca23123333', { eventRecord, modelFields })

          await DataStore.save(
            Event.copyOf(eventRecord, (updated) => {
              Object.assign(updated, modelFields)
            }),
          )
          if (onSuccess) {
            console.log('estodeAca', { modelFields })
            onSuccess(modelFields)
          }
        } catch (err) {
          console.error('pumba', err)
          if (onError) {
            onError(modelFields, err.message)
          }
        }
      }}
      {...rest}
      {...getOverrideProps(overrides, 'EventUpdateForm')}
    >
      <TextField
        label="Titulo"
        isRequired={true}
        isReadOnly={false}
        defaultValue={name}
        onChange={(e) => {
          let { value } = e.target
          if (onChange) {
            const modelFields = {
              name: value,
              subTitulo,
              startDate,
              endDate,
              is_done,
              map_point,
              types,
              descripcion,
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
      <TextField 
        label="Sub titulo"
        isRequired={false}
        isReadOnly={false}
        defaultValue={subTitulo}
        onChange={(e) => {
          let { value } = e.target
          if (onChange) {
            const modelFields = {
              name,
              subTitulo: value,
              startDate,
              endDate,
              is_done,
              map_point,
              types,
              descripcion,
            }
            const result = onChange(modelFields)
            value = result?.subTitulo ?? value
          }
          if (errors.subTitulo?.hasError) {
            runValidationTasks('subTitulo', value)
          }
          setSubTitulo(value)
        }}
        onBlur={() => runValidationTasks('subTitulo', subTitulo)}
        errorMessage={errors.subTitulo?.errorMessage}
        hasError={errors.subTitulo?.hasError}
        {...getOverrideProps(overrides, 'subTitulo')}
      ></TextField>
      <TextField
        label="Comienzo"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        defaultValue={startDate && convertToLocal(new Date(startDate))}
        onChange={(e) => {
          let { value } = e.target
          if (onChange) {
            const modelFields = {
              name,
              subTitulo,
              startDate: value,
              endDate,
              is_done,
              map_point,
              types,
              descripcion,
            }
            const result = onChange(modelFields)
            value = result?.startDate ?? value
          }
          if (errors.startDate?.hasError) {
            runValidationTasks('startDate', value)
          }
          setStartDate(new Date(value).toISOString())
        }}
        onBlur={() => runValidationTasks('startDate', startDate)}
        errorMessage={errors.startDate?.errorMessage}
        hasError={errors.startDate?.hasError}
        {...getOverrideProps(overrides, 'startDate')}
      ></TextField>
      <TextField
        label="Final"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        defaultValue={endDate && convertToLocal(new Date(endDate))}
        onChange={(e) => {
          let { value } = e.target
          if (onChange) {
            const modelFields = {
              name,
              subTitulo,
              startDate,
              endDate: value,
              is_done,
              map_point,
              types,
              descripcion,
            }
            const result = onChange(modelFields)
            value = result?.endDate ?? value
          }
          if (errors.endDate?.hasError) {
            runValidationTasks('endDate', value)
          }
          setEndDate(new Date(value).toISOString())
        }}
        onBlur={() => runValidationTasks('endDate', endDate)}
        errorMessage={errors.endDate?.errorMessage}
        hasError={errors.endDate?.hasError}
        {...getOverrideProps(overrides, 'endDate')}
      ></TextField>
      <SwitchField
        label="Ya se realizo"
        defaultChecked={false}
        isDisabled={false}
        isChecked={is_done}
        onChange={(e) => {
          let value = e.target.checked
          if (onChange) {
            const modelFields = {
              name,
              subTitulo,
              startDate,
              endDate,
              is_done: value,
              map_point,
              types,
              descripcion,
            }
            const result = onChange(modelFields)
            value = result?.is_done ?? value
          }
          if (errors.is_done?.hasError) {
            runValidationTasks('is_done', value)
          }
          setIs_done(value)
        }}
        onBlur={() => runValidationTasks('is_done', is_done)}
        errorMessage={errors.is_done?.errorMessage}
        hasError={errors.is_done?.hasError}
        {...getOverrideProps(overrides, 'is_done')}
      ></SwitchField>
      {/* <TextField
        label="Localizacion"
        isRequired={false}
        isReadOnly={false}
        defaultValue={map_point}
        onChange={(e) => {
          let { value } = e.target
          if (onChange) {
            const modelFields = {
              name,
              subTitulo,
              startDate,
              endDate,
              is_done,
              map_point: value,
              types,
              descripcion,
            }
            const result = onChange(modelFields)
            value = result?.map_point ?? value
          }
          if (errors.map_point?.hasError) {
            runValidationTasks('map_point', value)
          }
          setMap_point(value)
        }}
        onBlur={() => runValidationTasks('map_point', map_point)}
        errorMessage={errors.map_point?.errorMessage}
        hasError={errors.map_point?.hasError}
        {...getOverrideProps(overrides, 'map_point')}
      ></TextField> */}
      <ArrayField
        onChange={async (items) => {
          let values = items
          if (onChange) {
            const modelFields = {
              name,
              subTitulo,
              startDate,
              endDate,
              is_done,
              map_point,
              types: values,
              descripcion,
            }
            const result = onChange(modelFields)
            values = result?.types ?? values
          }
          setTypes(values)
          setCurrentTypesValue(undefined)
        }}
        currentFieldValue={currentTypesValue}
        items={convertedTypes}
        hasError={errors.types?.hasError}
        setFieldValue={setCurrentTypesValue}
        inputFieldRef={typesRef}
        defaultFieldValue={undefined}
      >
        <Select
          label="Tipo de evento"
          isRequired={false}
          isReadOnly={false}
          value={currentTypesValue}
          options={typesOptions}
          onChange={(value) => {
            console.log('onChange', { value })
            if (errors.types?.hasError) {
              runValidationTasks('types', value.value)
            }
            setCurrentTypesValue(value)
          }}
          onBlur={() => runValidationTasks('types', currentTypesValue)}
          errorMessage={errors.types?.errorMessage}
          hasError={errors.types?.hasError}
          ref={typesRef}
          {...getOverrideProps(overrides, 'types')}
        />
      </ArrayField>
      <Map map_point={map_point} onDragEnd={handleDragEnd} />

      <TextField
        style={{
          height: '200px',
        }}
        label="Descripcion"
        isRequired={false}
        isReadOnly={false}
        defaultValue={descripcion}
        onChange={(e) => {
          let { value } = e.target
          if (onChange) {
            const modelFields = {
              name,
              subTitulo,
              startDate,
              endDate,
              is_done,
              map_point,
              types,
              descripcion: value,
            }
            const result = onChange(modelFields)
            value = result?.descripcion ?? value
          }
          if (errors.descripcion?.hasError) {
            runValidationTasks('descripcion', value)
          }
          setDescripcion(value)
        }}
        onBlur={() => runValidationTasks('descripcion', descripcion)}
        errorMessage={errors.descripcion?.errorMessage}
        hasError={errors.descripcion?.hasError}
        {...getOverrideProps(overrides, 'descripcion')}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, 'CTAFlex')}
      >
        <Button
          children="Limpiar formulario"
          type="reset"
          onClick={resetStateValues}
          {...getOverrideProps(overrides, 'ResetButton')}
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
          <Button style={{backgroundColor:'#f43f5e'}}
            children="Subir evento"
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
