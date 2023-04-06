import { Amplify } from 'aws-amplify'
import awsExports from '../../aws-exports'
import { ChangeEvent, FocusEvent } from 'react'
import { Event, EventTypes } from '../../models'
import { IFilters } from '../../../pages'
import EventCard2 from '../eventCard2/eventCard2'
import Link from 'next/link'
import svg5 from '../../../public/svg5.svg'
import Image from 'next/image'
import React from 'react'
import Select, { ActionMeta, SingleValue } from 'react-select'

Amplify.configure({ ...awsExports, ssr: true })
interface IProps {
  eventTypesOptions: Array<EventTypes>
  events: Array<Event>
  filters: Partial<IFilters>
  updateFilters: (newValue: Partial<IFilters>) => void
}

export default function EventsUser({
  eventTypesOptions,
  events = [],
  updateFilters,
  filters,
}: IProps) {
  const handleChange = (value: string, name: string) => {
    updateFilters({ [name]: value })
  }

  const typesOptions = eventTypesOptions.map((options) => ({
    value: options.id,
    label: options.name,
  }))
  const handleSelectChange = (
    optionSelected: SingleValue<{
      value: string
      label: string | null | undefined
    }>,
    actionMeta: ActionMeta<{
      value: string
      label: string | null | undefined
    }>,
  ) => {
    if (optionSelected?.label) {
      updateFilters({ types: optionSelected.label })
    }
  }

  return (
    <div className=" hover:bg-white  flex justify-center ">
      <div className=" mb-10 mt-10  " style={{ maxWidth: '400px' }}>
        <div
          className="text-sm font-medium flex justify-content items-center"
          style={{ marginLeft: '20px' }}
        >
          <h5 className="py-1 mb-1" style={{ color: 'white' }}>
            Cantidad de eventos disponibles: {events.length}
          </h5>
        </div>
        <div className="flex flex-col py-6 p-8 ">
          <h2 className="mb-4 text-sm text-white">Fecha inicio: </h2>
          <input
            className="w-7"
            type="date"
            placeholder="Fecha"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleChange(e.target.value, 'startDate')
            }}
          />
        </div>
        <div className="flex flex-col p-8 ">
          <h2 className="mb-4 font- text-sm text-white">Tipo de evento:</h2>
          <Select
            options={typesOptions}
            className="w-7"
            placeholder="tipo"
            onChange={handleSelectChange}
          />
          <h2 className=" mt-4 text-white text-sm">
            Filtra tus eventos para seleccionar el que quieras editar
          </h2>
          <Image alt="" src={svg5} width={500} height={500} />
        </div>
      </div>

      <div
        style={{
          padding: '10px',
          borderRadius: '10px',
          maxWidth: '800px',
          maxHeight: '1200px',
        }}
      >
        <div className="">
          <div
            className="flex flex-wrap justify-center items-center"
            style={{
              height: '650px',
              overflow: 'auto',
            }}
          >
            <div>
              {events.map((event: any) => {
                return (
                  <Link href={`/events/edit/${event.id}`} key={event.id}>
                    <EventCard2 event={event} key={event.id} />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
