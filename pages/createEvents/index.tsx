import { 
  EventCreateForm 
} from '../../src/ui-components';

export default function eventCreate () {

  return (
    <div className='bg-violet'>
    <h1>Create Your Event</h1>
    <div className='bg-white'>
    <EventCreateForm />
    </div>
    </div>
    
  )
}
