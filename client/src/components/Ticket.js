import React from "react";

export default function Ticket({ ticket, hideTicket }) {
  return (
    <div className="ticket">
      <h1>{ticket.title}</h1>
      <button className="hideTicketButton" onClick={hideTicket}>
        hide
      </button>
      <p>{ticket.content}</p>
      <p className="information">
        {ticket.email} | {ticket.creationTime}
      </p>
      <span>
        {ticket.labels.map((label) => {
          return (
            <button key={`${ticket.title}-${label}`} className="label">
              {label}
            </button>
          );
        })}
      </span>
    </div>
  );
}
