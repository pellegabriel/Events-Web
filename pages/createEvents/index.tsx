import { 
  EventCreateForm 
} from '../../src/ui-components';

export default function eventCreate () {

  return (
    <div className='font-mono bg-gray-200  h-screen'>
      <div className='p-8 mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
        <h1>Create Your Event</h1>
        <EventCreateForm 
        />
      </div>
    </div>
    
  )
}
