import { EventRow } from "./eventRow";

export const EventTable = ({ events, toggleEvent, showCompleted = false }) => {

  const eventTableRows = (doneValue) => {
    
    return (
      events
      .filter(event=> event.done === doneValue)
      .map(event => (
        <EventRow event={event} key={event.name} toggleEvent={toggleEvent} />
      ))
    )
  }

  return (
    <table className="table table-dark table-borderless">
      <thead>
        <tr className="table-primary">
          <th>Events</th>
        </tr>
      </thead>
      <div>
      <tbody >
        {
        eventTableRows(showCompleted)
        }
      </tbody>
      </div>
    </table>
  );
};
 