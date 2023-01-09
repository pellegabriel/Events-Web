/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateEventTypesInput = {
  id?: string | null
  name?: string | null
  enabled?: boolean | null
  _version?: number | null
}

export type ModelEventTypesConditionInput = {
  name?: ModelStringInput | null
  enabled?: ModelBooleanInput | null
  and?: Array<ModelEventTypesConditionInput | null> | null
  or?: Array<ModelEventTypesConditionInput | null> | null
  not?: ModelEventTypesConditionInput | null
}

export type ModelStringInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
  size?: ModelSizeInput | null
}

export enum ModelAttributeTypes {
  binary = 'binary',
  binarySet = 'binarySet',
  bool = 'bool',
  list = 'list',
  map = 'map',
  number = 'number',
  numberSet = 'numberSet',
  string = 'string',
  stringSet = 'stringSet',
  _null = '_null',
}

export type ModelSizeInput = {
  ne?: number | null
  eq?: number | null
  le?: number | null
  lt?: number | null
  ge?: number | null
  gt?: number | null
  between?: Array<number | null> | null
}

export type ModelBooleanInput = {
  ne?: boolean | null
  eq?: boolean | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
}

export type EventTypes = {
  __typename: 'EventTypes'
  id: string
  name?: string | null
  enabled?: boolean | null
  createdAt: string
  updatedAt: string
  _version: number
  _deleted?: boolean | null
  _lastChangedAt: number
}

export type UpdateEventTypesInput = {
  id: string
  name?: string | null
  enabled?: boolean | null
  _version?: number | null
}

export type DeleteEventTypesInput = {
  id: string
  _version?: number | null
}

export type CreateEventInput = {
  id?: string | null
  name: string
  startDate?: string | null
  endDate?: string | null
  is_done?: boolean | null
  map_point?: string | null
  types?: Array<string | null> | null
  user: string
  descripcion?: string | null
  subTitulo?: string | null
  _version?: number | null
}

export type ModelEventConditionInput = {
  name?: ModelStringInput | null
  startDate?: ModelStringInput | null
  endDate?: ModelStringInput | null
  is_done?: ModelBooleanInput | null
  map_point?: ModelStringInput | null
  types?: ModelIDInput | null
  user?: ModelIDInput | null
  descripcion?: ModelStringInput | null
  subTitulo?: ModelStringInput | null
  and?: Array<ModelEventConditionInput | null> | null
  or?: Array<ModelEventConditionInput | null> | null
  not?: ModelEventConditionInput | null
}

export type ModelIDInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
  size?: ModelSizeInput | null
}

export type Event = {
  __typename: 'Event'
  id: string
  name: string
  startDate?: string | null
  endDate?: string | null
  is_done?: boolean | null
  map_point?: string | null
  types?: Array<string | null> | null
  user: string
  descripcion?: string | null
  subTitulo?: string | null
  createdAt: string
  updatedAt: string
  _version: number
  _deleted?: boolean | null
  _lastChangedAt: number
}

export type UpdateEventInput = {
  id: string
  name?: string | null
  startDate?: string | null
  endDate?: string | null
  is_done?: boolean | null
  map_point?: string | null
  types?: Array<string | null> | null
  user?: string | null
  descripcion?: string | null
  subTitulo?: string | null
  _version?: number | null
}

export type DeleteEventInput = {
  id: string
  _version?: number | null
}

export type ModelEventTypesFilterInput = {
  id?: ModelIDInput | null
  name?: ModelStringInput | null
  enabled?: ModelBooleanInput | null
  and?: Array<ModelEventTypesFilterInput | null> | null
  or?: Array<ModelEventTypesFilterInput | null> | null
  not?: ModelEventTypesFilterInput | null
}

export type ModelEventTypesConnection = {
  __typename: 'ModelEventTypesConnection'
  items: Array<EventTypes | null>
  nextToken?: string | null
  startedAt?: number | null
}

export type ModelEventFilterInput = {
  id?: ModelIDInput | null
  name?: ModelStringInput | null
  startDate?: ModelStringInput | null
  endDate?: ModelStringInput | null
  is_done?: ModelBooleanInput | null
  map_point?: ModelStringInput | null
  types?: ModelIDInput | null
  user?: ModelIDInput | null
  descripcion?: ModelStringInput | null
  subTitulo?: ModelStringInput | null
  and?: Array<ModelEventFilterInput | null> | null
  or?: Array<ModelEventFilterInput | null> | null
  not?: ModelEventFilterInput | null
}

export type ModelEventConnection = {
  __typename: 'ModelEventConnection'
  items: Array<Event | null>
  nextToken?: string | null
  startedAt?: number | null
}

export type ModelSubscriptionEventTypesFilterInput = {
  id?: ModelSubscriptionIDInput | null
  name?: ModelSubscriptionStringInput | null
  enabled?: ModelSubscriptionBooleanInput | null
  and?: Array<ModelSubscriptionEventTypesFilterInput | null> | null
  or?: Array<ModelSubscriptionEventTypesFilterInput | null> | null
}

export type ModelSubscriptionIDInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  in?: Array<string | null> | null
  notIn?: Array<string | null> | null
}

export type ModelSubscriptionStringInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  in?: Array<string | null> | null
  notIn?: Array<string | null> | null
}

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null
  eq?: boolean | null
}

export type ModelSubscriptionEventFilterInput = {
  id?: ModelSubscriptionIDInput | null
  name?: ModelSubscriptionStringInput | null
  startDate?: ModelSubscriptionStringInput | null
  endDate?: ModelSubscriptionStringInput | null
  is_done?: ModelSubscriptionBooleanInput | null
  map_point?: ModelSubscriptionStringInput | null
  types?: ModelSubscriptionIDInput | null
  user?: ModelSubscriptionIDInput | null
  descripcion?: ModelSubscriptionStringInput | null
  subTitulo?: ModelSubscriptionStringInput | null
  and?: Array<ModelSubscriptionEventFilterInput | null> | null
  or?: Array<ModelSubscriptionEventFilterInput | null> | null
}

export type CreateEventTypesMutationVariables = {
  input: CreateEventTypesInput
  condition?: ModelEventTypesConditionInput | null
}

export type CreateEventTypesMutation = {
  createEventTypes?: {
    __typename: 'EventTypes'
    id: string
    name?: string | null
    enabled?: boolean | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type UpdateEventTypesMutationVariables = {
  input: UpdateEventTypesInput
  condition?: ModelEventTypesConditionInput | null
}

export type UpdateEventTypesMutation = {
  updateEventTypes?: {
    __typename: 'EventTypes'
    id: string
    name?: string | null
    enabled?: boolean | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type DeleteEventTypesMutationVariables = {
  input: DeleteEventTypesInput
  condition?: ModelEventTypesConditionInput | null
}

export type DeleteEventTypesMutation = {
  deleteEventTypes?: {
    __typename: 'EventTypes'
    id: string
    name?: string | null
    enabled?: boolean | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type CreateEventMutationVariables = {
  input: CreateEventInput
  condition?: ModelEventConditionInput | null
}

export type CreateEventMutation = {
  createEvent?: {
    __typename: 'Event'
    id: string
    name: string
    startDate?: string | null
    endDate?: string | null
    is_done?: boolean | null
    map_point?: string | null
    types?: Array<string | null> | null
    user: string
    descripcion?: string | null
    subTitulo?: string | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type UpdateEventMutationVariables = {
  input: UpdateEventInput
  condition?: ModelEventConditionInput | null
}

export type UpdateEventMutation = {
  updateEvent?: {
    __typename: 'Event'
    id: string
    name: string
    startDate?: string | null
    endDate?: string | null
    is_done?: boolean | null
    map_point?: string | null
    types?: Array<string | null> | null
    user: string
    descripcion?: string | null
    subTitulo?: string | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type DeleteEventMutationVariables = {
  input: DeleteEventInput
  condition?: ModelEventConditionInput | null
}

export type DeleteEventMutation = {
  deleteEvent?: {
    __typename: 'Event'
    id: string
    name: string
    startDate?: string | null
    endDate?: string | null
    is_done?: boolean | null
    map_point?: string | null
    types?: Array<string | null> | null
    user: string
    descripcion?: string | null
    subTitulo?: string | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type GetEventTypesQueryVariables = {
  id: string
}

export type GetEventTypesQuery = {
  getEventTypes?: {
    __typename: 'EventTypes'
    id: string
    name?: string | null
    enabled?: boolean | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type ListEventTypesQueryVariables = {
  filter?: ModelEventTypesFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListEventTypesQuery = {
  listEventTypes?: {
    __typename: 'ModelEventTypesConnection'
    items: Array<{
      __typename: 'EventTypes'
      id: string
      name?: string | null
      enabled?: boolean | null
      createdAt: string
      updatedAt: string
      _version: number
      _deleted?: boolean | null
      _lastChangedAt: number
    } | null>
    nextToken?: string | null
    startedAt?: number | null
  } | null
}

export type SyncEventTypesQueryVariables = {
  filter?: ModelEventTypesFilterInput | null
  limit?: number | null
  nextToken?: string | null
  lastSync?: number | null
}

export type SyncEventTypesQuery = {
  syncEventTypes?: {
    __typename: 'ModelEventTypesConnection'
    items: Array<{
      __typename: 'EventTypes'
      id: string
      name?: string | null
      enabled?: boolean | null
      createdAt: string
      updatedAt: string
      _version: number
      _deleted?: boolean | null
      _lastChangedAt: number
    } | null>
    nextToken?: string | null
    startedAt?: number | null
  } | null
}

export type GetEventQueryVariables = {
  id: string
}

export type GetEventQuery = {
  getEvent?: {
    __typename: 'Event'
    id: string
    name: string
    startDate?: string | null
    endDate?: string | null
    is_done?: boolean | null
    map_point?: string | null
    types?: Array<string | null> | null
    user: string
    descripcion?: string | null
    subTitulo?: string | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type ListEventsQueryVariables = {
  filter?: ModelEventFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListEventsQuery = {
  listEvents?: {
    __typename: 'ModelEventConnection'
    items: Array<{
      __typename: 'Event'
      id: string
      name: string
      startDate?: string | null
      endDate?: string | null
      is_done?: boolean | null
      map_point?: string | null
      types?: Array<string | null> | null
      user: string
      descripcion?: string | null
      subTitulo?: string | null
      createdAt: string
      updatedAt: string
      _version: number
      _deleted?: boolean | null
      _lastChangedAt: number
    } | null>
    nextToken?: string | null
    startedAt?: number | null
  } | null
}

export type SyncEventsQueryVariables = {
  filter?: ModelEventFilterInput | null
  limit?: number | null
  nextToken?: string | null
  lastSync?: number | null
}

export type SyncEventsQuery = {
  syncEvents?: {
    __typename: 'ModelEventConnection'
    items: Array<{
      __typename: 'Event'
      id: string
      name: string
      startDate?: string | null
      endDate?: string | null
      is_done?: boolean | null
      map_point?: string | null
      types?: Array<string | null> | null
      user: string
      descripcion?: string | null
      subTitulo?: string | null
      createdAt: string
      updatedAt: string
      _version: number
      _deleted?: boolean | null
      _lastChangedAt: number
    } | null>
    nextToken?: string | null
    startedAt?: number | null
  } | null
}

export type OnCreateEventTypesSubscriptionVariables = {
  filter?: ModelSubscriptionEventTypesFilterInput | null
}

export type OnCreateEventTypesSubscription = {
  onCreateEventTypes?: {
    __typename: 'EventTypes'
    id: string
    name?: string | null
    enabled?: boolean | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type OnUpdateEventTypesSubscriptionVariables = {
  filter?: ModelSubscriptionEventTypesFilterInput | null
}

export type OnUpdateEventTypesSubscription = {
  onUpdateEventTypes?: {
    __typename: 'EventTypes'
    id: string
    name?: string | null
    enabled?: boolean | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type OnDeleteEventTypesSubscriptionVariables = {
  filter?: ModelSubscriptionEventTypesFilterInput | null
}

export type OnDeleteEventTypesSubscription = {
  onDeleteEventTypes?: {
    __typename: 'EventTypes'
    id: string
    name?: string | null
    enabled?: boolean | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type OnCreateEventSubscriptionVariables = {
  filter?: ModelSubscriptionEventFilterInput | null
}

export type OnCreateEventSubscription = {
  onCreateEvent?: {
    __typename: 'Event'
    id: string
    name: string
    startDate?: string | null
    endDate?: string | null
    is_done?: boolean | null
    map_point?: string | null
    types?: Array<string | null> | null
    user: string
    descripcion?: string | null
    subTitulo?: string | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type OnUpdateEventSubscriptionVariables = {
  filter?: ModelSubscriptionEventFilterInput | null
}

export type OnUpdateEventSubscription = {
  onUpdateEvent?: {
    __typename: 'Event'
    id: string
    name: string
    startDate?: string | null
    endDate?: string | null
    is_done?: boolean | null
    map_point?: string | null
    types?: Array<string | null> | null
    user: string
    descripcion?: string | null
    subTitulo?: string | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type OnDeleteEventSubscriptionVariables = {
  filter?: ModelSubscriptionEventFilterInput | null
}

export type OnDeleteEventSubscription = {
  onDeleteEvent?: {
    __typename: 'Event'
    id: string
    name: string
    startDate?: string | null
    endDate?: string | null
    is_done?: boolean | null
    map_point?: string | null
    types?: Array<string | null> | null
    user: string
    descripcion?: string | null
    subTitulo?: string | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}
