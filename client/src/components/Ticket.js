import React from "react";
import "../styles/ticket.css";

export default function Ticket({
  ticket,
  hideTicket,
  ticketNotFound,
  doneTicket,
  doneTickets,
  deleteTicket,
  deleteTickets,
}) {
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
  let className;
  if (doneTickets.includes(ticket)) {
    className = "doneTicket";
  } else {
    className = "ticket";
  }
  let deleteClassName;
  if (deleteTickets.includes(ticket)) {
    deleteClassName = "deletedTicket";
  } else {
    deleteClassName = "ticket";
  }

  return (
    <div className={className}>
      <span>
        <button
          className={"hideTicketButton"}
          onClick={() => hideTicket(ticket)}
        >
          hide
        </button>
        <button className="doneButton" onClick={(e) => doneTicket(ticket, e)}>
          {className === "doneTicket" ? "⛔" : "✅"}
        </button>
        <button
          className="deleteButton"
          onClick={(e) => deleteTicket(ticket, e)}
        >
          {deleteClassName === "deletedTicket" ? "↩" : "❌"}
        </button>
        <h1>{ticket.title}</h1>
      </span>
      <p>{ticket.content}</p>
      <div className="details">
        <span>{ticket.userEmail}</span> | <span>{dateFormat()}</span>
        <span className="label-span">
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
