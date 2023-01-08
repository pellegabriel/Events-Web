import { Amplify, API, withSSRContext } from 'aws-amplify'
import { ModelEventFilterInput } from '../../src/API'
import awsExports from '../../src/aws-exports'
import { listEvents } from '../../src/graphql/queries'
import { NextRouter, useRouter } from 'next/router'
import { FocusEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { Event } from '../../src/models'
import parseDate from '../../src/helperFunctions/parseDate'

Amplify.configure({ ...awsExports, ssr: false })

interface IFilters {
  startDate: string
  types: string
}

interface IProps {
  events: Array<Event>
}

export default function Events({ events = [] }: IProps) {
  const router = useRouter()
  const { categoryTitle } = router.query
  const [loading, setLoading] = useState(false)
  const [listOfEvents, setListOfEvents] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await API.graphql({
          // agregar la interface de la respuesta de la api asi graphql<interface>
          query: listEvents,
          variables: {
            filter: {
              and: [{ types: { contains: categoryTitle } }],
            }
          },
        })

        if (response.data.listEvents) { 
          setListOfEvents(response.data.listEvents.items)
        }

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [categoryTitle])


  return (
    <div className="w-6/6 bg-white flex items-center  rounded-lg p-6 ">
  
      <div>
        tipo de evento:{' '}
        <input
          type="text"
          placeholder="tipo"
          onBlur={(e: FocusEvent<HTMLInputElement>) => {
            // handleChange(e.target.value, 'types', router)
          }}
        />
      </div>
      <div className="flex justify-center">
        <div className="block rounded-lg shadow-lg bg-white max-w-sm text-center">
          <div className="text-gray-900 text-xl font-medium mb-2 border-b border-gray-300">
            Lista de Eventos
          </div>
          <div className="p-1">
            <h5 className="py-1 px-6 ">Cantidad de eventos disponibles: </h5>
            <div className="flex px-6  text-gray-700 text-base mb-4">
              <code>{events.length}</code>
              events
            </div>
          </div>
          <div className="py-3 px-6 ">

            {loading && (
              <p>loading...</p>
            )}

            {listOfEvents && listOfEvents.map((event) => {
              const startDate = event.startDate
                ? parseDate(event.startDate)
                : ''

              return (
                <Link href={`/events/edit/${event.id}`} key={event.id}>
                  <div className="border-b border-gray-300" key={event.id}>
                    <h3>{event.name}</h3>
                    <h3>{startDate}</h3>
                    <h3>{event.types}</h3>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
