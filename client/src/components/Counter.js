import React from "react";
import "../styles/counter.css";

export default function Counter({ counter, hideList, showTickets, onClick }) {
  if (hideList.length > 0) {
    return (
      <>
        <div className="counter-section">
          <span className="show-tickets-number">
            Showing {showTickets} results
          </span>
        </div>
        <span className="hidden-text">
          <span id="hideTicketsCounter">{counter}</span> hidden ticket`s{" "}
          <button id="restoreHideTickets" onClick={onClick}>
            restored
          </button>
        </span>
      </>
    );
  } else {
    return (
      <span className="show-tickets-number">Showing {showTickets} results</span>
    );
  }
}
