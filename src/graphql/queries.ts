/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEventTypes = /* GraphQL */ `
  query GetEventTypes($id: ID!) {
    getEventTypes(id: $id) {
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
export const listEventTypes = /* GraphQL */ `
  query ListEventTypes(
    $filter: ModelEventTypesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEventTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        enabled
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncEventTypes = /* GraphQL */ `
  query SyncEventTypes(
    $filter: ModelEventTypesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEventTypes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        enabled
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
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
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncEvents = /* GraphQL */ `
  query SyncEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEvents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
