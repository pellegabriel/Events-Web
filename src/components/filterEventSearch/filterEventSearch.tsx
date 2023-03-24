import { Amplify } from 'aws-amplify'
import awsExports from '../../aws-exports'
import { ChangeEvent, FocusEvent } from 'react'
import { Event, EventTypes } from '../../models'
import { IFilters } from '../../../pages'
import Select, { ActionMeta, SingleValue } from 'react-select'
import EventCard2 from '../eventCard2/eventCard2'
import Link from 'next/link'
import svg5 from '../../../public/svg5.svg'
import Image from 'next/image'
import React from 'react'

Amplify.configure({ ...awsExports, ssr: true })
interface IProps {
  eventTypesOptions:Array<EventTypes>
  events: Array<Event>
  filters: IFilters
  updateFilters: (newValue: Partial<IFilters>) => void
}

export default function EventsSearch({ events = [], updateFilters, eventTypesOptions = [] }: IProps) {
  const handleChange = (value: string, name: string) => {
    updateFilters({ [name]: value })
  }

  const typesOptions = eventTypesOptions.map((options) => ({value: options.id, label: options.name}))
  const handleSelectChange = (optionSelected: SingleValue<{
    value: string;
    label: string | null | undefined;
}>, actionMeta: ActionMeta<{
    value: string;
    label: string | null | undefined;
}>) => {
    if (optionSelected?.label) {
      updateFilters({ types: optionSelected.label })

    }
  }
  return (
    <div className=" hover:bg-black  flex justify-center" style={{ padding:'8px', marginBottom:'100px' ,  color:'gray-900', }}>
      <div className="mb-10  p-8" style={{ maxWidth: '700px' }}>
        <div className="flex flex-col py-1 p-8 ">
          <h2 className=" text-sm text-white text-lg font-extrabold ">Fecha inicio: </h2>
          <input
            className="w-7"
            type="date"
            placeholder="Fecha"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleChange(e.target.value, 'startDate')
            }}
          />
        </div>
        <div className="flex flex-col p-8 " >
          <h2 className=" text-sm text-white text-lg font-extrabold">
            Tipo de evento:
          </h2>
          <Select
          options={typesOptions}
          className="w-7"
          placeholder="tipo"
          onChange={handleSelectChange}
        />
        
          
          <Image alt="" src={svg5} width={500} height={500} />
          <h2 className="font-medium text-sm text-white text-lg font-extrabold">Filtra entre los eventos existentes para encontrar el que mas te guste.</h2>

        </div>
      </div>

      <div className="flex justify-center" style={{
      padding: '48px'}}>
        <div className="">
          <div className=" text-xl text-black font-medium mb-12 border-b border-gray-300 ">
            <h5 className="py-1 mb-1 font-extrabold" style={{color:'white'}}>
              Cantidad de eventos disponibles: {events.length}
            </h5>
          </div>

          <div
      className="flex flex-wrap "
      style={{
        width: '860px',
        height: '900px',
        overflow: 'auto',
        
      }}
    >
            {events.map((event: any) => {
              return (
                <Link href={`/events/${event.id}`} key={event.id} >
                  <EventCard2 event={event} key={event.id} />
                </Link>
                //poner el audio fuera del link 
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
