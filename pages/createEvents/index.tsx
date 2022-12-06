import { 
  EventCreateForm 
} from '../../src/ui-components';

export default function eventCreate () {

  return (
    <div className='bg-black'>
    <h1>Create Your Event</h1>
    <div className='p-8 mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
    <EventCreateForm />
    </div>
    </div>
    
  )
}
