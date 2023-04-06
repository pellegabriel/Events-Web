import {
  ModelInit,
  MutableModel,
  __modelMeta__,
  ManagedIdentifier,
} from '@aws-amplify/datastore'
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from '@aws-amplify/datastore'

type EagerEventTypes = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EventTypes, 'id'>
    readOnlyFields: 'createdAt' | 'updatedAt'
  }
  readonly id: string
  readonly name?: string | null
  readonly enabled?: boolean | null
  readonly createdAt?: string | null
  readonly updatedAt?: string | null
}

type LazyEventTypes = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EventTypes, 'id'>
    readOnlyFields: 'createdAt' | 'updatedAt'
  }
  readonly id: string
  readonly name?: string | null
  readonly enabled?: boolean | null
  readonly createdAt?: string | null
  readonly updatedAt?: string | null
}

export declare type EventTypes = LazyLoading extends LazyLoadingDisabled
  ? EagerEventTypes
  : LazyEventTypes

export declare const EventTypes: (new (
  init: ModelInit<EventTypes>,
) => EventTypes) & {
  copyOf(
    source: EventTypes,
    mutator: (
      draft: MutableModel<EventTypes>,
    ) => MutableModel<EventTypes> | void,
  ): EventTypes
}

type EagerEvent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Event, 'id'>
    readOnlyFields: 'createdAt' | 'updatedAt'
  }
  readonly id: string
  readonly name: string
  readonly startDate?: string | null
  readonly endDate?: string | null
  readonly is_done?: boolean | null
  readonly map_point?: string | null
  readonly types?: (string | null)[] | null
  readonly user: string
  readonly descripcion?: string | null
  readonly subTitulo?: string | null
  readonly createdAt?: string | null
  readonly updatedAt?: string | null
}

type LazyEvent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Event, 'id'>
    readOnlyFields: 'createdAt' | 'updatedAt'
  }
  readonly id: string
  readonly name: string
  readonly startDate?: string | null
  readonly endDate?: string | null
  readonly is_done?: boolean | null
  readonly map_point?: string | null
  readonly types?: (string | null)[] | null
  readonly user: string
  readonly descripcion?: string | null
  readonly subTitulo?: string | null
  readonly createdAt?: string | null
  readonly updatedAt?: string | null
}

export declare type Event = LazyLoading extends LazyLoadingDisabled
  ? EagerEvent
  : LazyEvent

export declare const Event: (new (init: ModelInit<Event>) => Event) & {
  copyOf(
    source: Event,
    mutator: (draft: MutableModel<Event>) => MutableModel<Event> | void,
  ): Event
}
