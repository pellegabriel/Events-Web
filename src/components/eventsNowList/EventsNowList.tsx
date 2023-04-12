import { withSSRContext } from 'aws-amplify'
import { ModelEventFilterInput } from '../../API'
import { listEvents } from '../../graphql/queries'
import { IFilters } from '../../../pages'
import Link from 'next/link'
import EventCard3 from './EventCard3'
import Image from 'next/image'
import svg7 from '../../../public/svg7.svg'
import { useState } from 'react'

interface IProps {
  events: Array<Event>
  filters: IFilters
}

export async function getServerSideProps({ req }: any) {
  const SSR = withSSRContext({ req })
  const today = new Date().toISOString()
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
  // const [isHover, setIsHover] = useState(false)

  // const handleMouseEnter = () => {
  //   setIsHover(true)
  // }
  // const handleMouseLeave = () => {
  //   setIsHover(false)
  // }
  // const boxStyle = {
  //   backgroundColor: isHover ? '#f43f5e' : '',
  //   width: '200px',
  //   padding: '8px',
  //   color: 'white',
  //   fontSize: '14px',
  //   borderRadius: '6px',
  //   border: '1px solid rgba(255, 255, 255, 0.6)',
  // }
  return (
<<<<<<< Updated upstream
    <>
    <EventCard3/>
    {events.length === 0 ? (
          <div className='flex '>
          <Image
                        alt=""
                        src={svg7}
                        width={300}
                        height={300}
                        className="mx-auto  dark:bg-gray-500"
                        style={{marginLeft:'40px',}}
                      />
            <h1 className="  text-white text-xl font-bold leading-normal mb-1 flex justify-center items-center" style={{maxWidth:'500px'}}>Ups! No hay eventos sucediendo ahora.</h1>
          </div>
      ) : 
      (
        events.map((event: any) => {
          return (
            <Link href={`/events/${event.id}`} key={event.id}>
              <EventCard3 event={event} key={event.id} />
            </Link>
          )
        })
      )}</>
    )
=======
    // <div
    //   style={{
    //     width: '1200px',
    //     height: '300px',
    //     display: 'flex',
    //     padding: '24px',
    //     overflow: 'auto',
    //     borderRadius: '18px',
    //     flexDirection: 'row',
    //     marginBottom: '64px',
    //     justifyContent: 'space-between',
    //     border: '1px solid rgba(255, 255, 255, 0.6)',
    //   }}
    // >
    //   <div
    //     style={{
    //       width: '50%',
    //       display: 'flex',
    //       flexDirection: 'column',
    //       justifyContent: 'space-between',
    //     }}
    //   >
    //     <div>
    //       <h2
    //         style={{ color: 'white', fontSize: '38px', marginBottom: '18px' }}
    //       >
    //         Cerati en Club TRI
    //       </h2>

    //       <p style={{ color: 'white', fontSize: '14px', marginBottom: '14px' }}>
    //         Club TRI • Mar del Plata, Provincia de Buenos Aires
    //       </p>

    //       <p style={{ color: 'white', fontSize: '14px', marginBottom: '14px' }}>
    //         15 de abr. de 2023
    //       </p>

    //       <p style={{ color: 'white', fontSize: '14px' }}>$ 2.000,00</p>
    //     </div>

    //     <button
    //       onMouseEnter={handleMouseEnter}
    //       onMouseLeave={handleMouseLeave}
    //       style={boxStyle}
    //     >
    //       Ver más
    //     </button>
    //   </div>

    //   <div
    //     style={{
    //       width: '60%',
    //       borderRadius: '14px',
    //       backgroundImage:
    //         'url(https://estudiantesdelaplata.com/wp-content/uploads/2015/09/CERATI.png)',
    //     }}
    //   />
    // </div>
  )
>>>>>>> Stashed changes
}
