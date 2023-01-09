import { withSSRContext } from 'aws-amplify'
import { ModelEventFilterInput } from '../../API'
import { listEvents } from '../../graphql/queries'
import { IFilters } from '../../../pages'
import Link from 'next/link'
import EventCard3 from './EventCard3'

interface IProps {
  events: Array<Event>
  filters: IFilters
}

export async function getServerSideProps({ req }: any) {
  const SSR = withSSRContext({ req })

  const today = new Date().toISOString()
  console.log(today)
  const dateFilter: ModelEventFilterInput = {
    and: [{ startDate: { le: today } }, { endDate: { ge: today } }],
  }

  try {
    const response = await SSR.API.graphql({
      query: listEvents,
      variables: { filter: dateFilter },
    })

    return {
      props: {
        events: response.data.listEvents.items,
      },
    }
  } catch (err) {
    console.log(err)
    return {
      props: {},
    }
  }
}

export default function EventsNowList({ events = [] }: IProps) {
  return (
    <div
      style={{
        width: '800px',
        display: 'flex',
        flexDirection: 'row',
        height: '180px',
        overflow: 'auto',
        marginBottom: '64px',
      }}
    >
      {events.length === 0 ? (
        <div>No hay eventos disponibles en este momento</div>
      ) : (
        events.map((event: any) => {
          return (
            <Link href={`/events/${event.id}`} key={event.id}>
              <EventCard3 event={event} key={event.id} />
            </Link>
          )
        })
      )}
    </div>
  )
}
