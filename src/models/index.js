// @ts-check
import { initSchema } from '@aws-amplify/datastore'
import { schema } from './schema'

const { EventTypes, Event } = initSchema(schema)

export { EventTypes, Event }
