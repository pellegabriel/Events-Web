import { DataStore } from '@aws-amplify/datastore';
import { Event } from './models';


console.log(models);

const Events = () => {
    const models = await DataStore.query(Event);
    return ( 
        <div>
            {models.toString()}
        </div>
    )
}