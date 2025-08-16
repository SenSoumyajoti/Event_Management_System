// src/components/EventGrid.jsx
import EventCard from './EventCard';
// import './EventCard.css';

const dummyEvents = [
  { id: 1, title: 'Rock Concert',   date: '22 Jul' },
  { id: 2, title: 'Food Fest',      date: '23 Jul' },
  { id: 3, title: 'Tech Meetup',    date: '24 Jul' },
  { id: 4, title: 'Art Exhibition', date: '25 Jul' },
];

export default function EventGrid() {
  return (
    <section className="event-grid">
      {dummyEvents.map(ev => (
        <EventCard key={ev.id} title={ev.title} date={ev.date} />
      ))}
    </section>
  );
}