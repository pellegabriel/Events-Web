import { useState, useEffect } from "react";
import { EventCreator } from "./eventCreator";
import {EventTable } from "./eventTable";
import { VisibilityControl } from "./visibilityControl";
import {Container} from "./container"

export default function Event() {
  const [eventsItems, setEventsItems] = useState([]);
  const [showCompleted, setShowCompleted]  = useState(false)

  function createNewEvent(eventName) {
    if (!eventsItems.find((event) => event.name === eventName)) {
      setEventsItems([...eventsItems, { name: eventName, done: false }]);
    }
  }

  const toggleEvent = (event) => {
    setEventsItems(
      eventsItems.map((t) => (t.name === event.name ? { ...t, done: !t.done } : t))
    );
  };

  useEffect(() => {
    let data = localStorage.getItem("events");
    if (data) {
      setEventsItems(JSON.parse(data));
    }
  }, []);

  const cleanEvents = ()=> {
    setEventsItems(eventsItems.filter(event => !event.done))
    setShowCompleted(false)
  }

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(eventsItems));
  }, [eventsItems]);

  return (
    <main className= "main-event">
      <Container>
        <EventCreator createNewEvent={createNewEvent} />
        <EventTable events={eventsItems} toggleEvent={toggleEvent} />
        <VisibilityControl
          isChecked={showCompleted}
          setShowCompleted={(checked)=>setShowCompleted(checked)}
          cleanEvents ={cleanEvents}
        />
        {showCompleted === true && (
            <EventTable 
            events={eventsItems} 
              toggleEvent={toggleEvent} 
              showCompleted={showCompleted}
            />
          )}
      </Container>
    </main>
  );
}
