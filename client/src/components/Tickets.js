import React from "react";
import Ticket from "./Ticket";

export default function Tickets({
  ticketsList,
  hideTicket,
  doneTicket,
  doneTickets,
}) {
  if (ticketsList.length === 0) {
    const ticket = {
      title: "No matching tickets found",
    };
    return (
      <div className="all-tickets">
        <Ticket key={"notFound"} ticketNotFound={ticket} />
      </div>
    );
  }
  return (
    <div className="all-tickets">
      {ticketsList.map((ticket, i) => (
        <Ticket
          key={ticket.title + i}
          ticket={ticket}
          hideTicket={hideTicket}
          doneTicket={doneTicket}
          doneTickets={doneTickets}
        />
      ))}
    </div>
  );
}
