// import '../styles/'
export default function EventCard({ title, date }) {
  return (
    <div className="event-card">
      <div className="event-content">
        <h3>{title}</h3>
        <p>{date}</p>
      </div>
    </div>
  );
}