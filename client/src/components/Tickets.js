import React from "react";
import Ticket from "./Ticket";

export default function Tickets({ ticketsList, hideTicket }) {
  return (
    <div className="all-tickets">
      {ticketsList.map((ticket, i) => (
        <Ticket
          key={ticket.title + i}
          ticket={ticket}
          hideTicket={hideTicket}
        />
      ))}
    </div>
  );
}
