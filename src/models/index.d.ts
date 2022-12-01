import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";





type EagerEventTypes = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EventTypes, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly EventTypes?: string | null;
  readonly untitledfield?: string | null;
  readonly eventID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEventTypes = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EventTypes, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly EventTypes?: string | null;
  readonly untitledfield?: string | null;
  readonly eventID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type EventTypes = LazyLoading extends LazyLoadingDisabled ? EagerEventTypes : LazyEventTypes

export declare const EventTypes: (new (init: ModelInit<EventTypes>) => EventTypes) & {
  copyOf(source: EventTypes, mutator: (draft: MutableModel<EventTypes>) => MutableModel<EventTypes> | void): EventTypes;
}

type EagerEvent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Event, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Event?: string | null;
  readonly EventTypes?: (EventTypes | null)[] | null;
  readonly date?: string | null;
  readonly user?: string | null;
  readonly is_done?: boolean | null;
  readonly map_point?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEvent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Event, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Event?: string | null;
  readonly EventTypes: AsyncCollection<EventTypes>;
  readonly date?: string | null;
  readonly user?: string | null;
  readonly is_done?: boolean | null;
  readonly map_point?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Event = LazyLoading extends LazyLoadingDisabled ? EagerEvent : LazyEvent

export declare const Event: (new (init: ModelInit<Event>) => Event) & {
  copyOf(source: Event, mutator: (draft: MutableModel<Event>) => MutableModel<Event> | void): Event;
}