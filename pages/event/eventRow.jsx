export const EventRow = ({ event, toggleEvent }) => {
  return (
    <tr>
      <td className="d-flex justify-content-between">
        {event.name}
        <input
          type="checkbox"
          checked={event.done}
          onChange={() => toggleEvent(event)}
        />
      </td>
    </tr>
  );
};
