import React from "react";
import "../styles/ticket.css";

export default function Ticket({ ticket, hideTicket, ticketNotFound }) {
  if (ticketNotFound) {
    return (
      <div className="ticket-notFound">
        <h1>{ticketNotFound.title}</h1>
      </div>
    );
  }
  const date = new Date(ticket.creationTime);
  const dateFormat = () => {
    return (
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      "/" +
      (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
      "/" +
      date.getFullYear() +
      ", " +
      (date.getHours() <= 9 ? "0" + date.getHours() : date.getHours()) +
      ":" +
      (date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes()) +
      ":" +
      (date.getSeconds() <= 9 ? "0" + date.getSeconds() : date.getSeconds()) +
      " " +
      (date.getHours() < 12 ? "AM" : "PM")
    );
  };
  return (
    <div className="ticket">
      <h1>{ticket.title}</h1>
      <button className="hideTicketButton" onClick={() => hideTicket(ticket)}>
        hide
      </button>
      <p>{ticket.content}</p>
      <div className="details">
        <span>{ticket.userEmail}</span> | <span>{dateFormat()}</span>
        <span>
          {ticket.labels &&
            ticket.labels.map((label, i) => {
              return (
                <button key={label + i} className="label">
                  {label}
                </button>
              );
            })}
        </span>
      </div>
    </div>
  );
}
