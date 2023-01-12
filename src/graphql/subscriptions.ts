/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEventTypes = /* GraphQL */ `
  subscription OnCreateEventTypes(
    $filter: ModelSubscriptionEventTypesFilterInput
  ) {
    onCreateEventTypes(filter: $filter) {
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
`
export const onUpdateEventTypes = /* GraphQL */ `
  subscription OnUpdateEventTypes(
    $filter: ModelSubscriptionEventTypesFilterInput
  ) {
    onUpdateEventTypes(filter: $filter) {
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
`
export const onDeleteEventTypes = /* GraphQL */ `
  subscription OnDeleteEventTypes(
    $filter: ModelSubscriptionEventTypesFilterInput
  ) {
    onDeleteEventTypes(filter: $filter) {
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
`
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent($filter: ModelSubscriptionEventFilterInput) {
    onCreateEvent(filter: $filter) {
      id
      name
      startDate
      endDate
      is_done
      map_point
      types
      user
      descripcion
      subTitulo
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent($filter: ModelSubscriptionEventFilterInput) {
    onUpdateEvent(filter: $filter) {
      id
      name
      startDate
      endDate
      is_done
      map_point
      types
      user
      descripcion
      subTitulo
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent($filter: ModelSubscriptionEventFilterInput) {
    onDeleteEvent(filter: $filter) {
      id
      name
      startDate
      endDate
      is_done
      map_point
      types
      user
      descripcion
      subTitulo
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`
