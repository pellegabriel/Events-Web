/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEventTypes = /* GraphQL */ `
  mutation CreateEventTypes(
    $input: CreateEventTypesInput!
    $condition: ModelEventTypesConditionInput
  ) {
    createEventTypes(input: $input, condition: $condition) {
      id
      name
      enabled
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateEventTypes = /* GraphQL */ `
  mutation UpdateEventTypes(
    $input: UpdateEventTypesInput!
    $condition: ModelEventTypesConditionInput
  ) {
    updateEventTypes(input: $input, condition: $condition) {
      id
      name
      enabled
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteEventTypes = /* GraphQL */ `
  mutation DeleteEventTypes(
    $input: DeleteEventTypesInput!
    $condition: ModelEventTypesConditionInput
  ) {
    deleteEventTypes(input: $input, condition: $condition) {
      id
      name
      enabled
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
      id
      name
      startDate
      endDate
      is_done
      map_point
      types
      user
      descripcion
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
      id
      name
      startDate
      endDate
      is_done
      map_point
      types
      user
      descripcion
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
      id
      name
      startDate
      endDate
      is_done
      map_point
      types
      user
      descripcion
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
