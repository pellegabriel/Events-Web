import Link from 'next/link'
import Image from 'next/image'
import EventCard3 from './EventCard3'
import svg7 from '../../../public/svg7.svg'
import { useGetEvents } from '../../../api/events'

export default function EventsNowList() {
  const { data, loading, error } = useGetEvents()

  if (loading) {
    return <p>loading...</p>
  }

  if (error) {
    return <p>Hubo un error con los eventos, vuelve a recargar la pagina por favor.</p>
  }
  
  return (
    <>
      {data && data.length === 0 ? (
        <div className='flex '>
          <Image
            alt=""
            src={svg7}
            width={300}
            height={300}
            style={{marginLeft:'40px',}}
            className="mx-auto  dark:bg-gray-500"
          />
          <h1
            style={{maxWidth:'500px'}}
            className="text-white text-xl font-bold leading-normal mb-1 flex justify-center items-center"
          >
            Ups! No hay eventos sucediendo ahora.
          </h1>
        </div>
      ) : 
      (
        data && data.map((event: any) => {
          return (
            <Link href={`/events/${event.id}`} key={event.id}>
              <EventCard3 event={event} key={event.id} />
            </Link>
          )
        })
      )}
    </>
  )
}
