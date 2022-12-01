import { useState } from "react";

export const EventCreator = (props) => {
    console.log(props) 
    const [newEventName, setNewEventName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        props.createNewEvent(newEventName)
        setNewEventName("")
}

    return (
        <form onSubmit={handleSubmit} className="my-2 row">
            <div className="col-9">
                <input
                type="text"
                placeholder='New Event...'
                value={newEventName}
                onChange={(e) => setNewEventName(e.target.value)}
                className="form-control"
                />
            </div>
            <div className="col-3">
                <button className="btn btn-primary btn-sm">Save Event</button>
            </div>
        </form>
    )
}

export default EventCreator