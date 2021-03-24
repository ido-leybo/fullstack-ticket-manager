import React from "react";
import "../styles/search.css";

export default function Search({ onChange }) {
  return (
    <div className="search">
      <input
        id="searchInput"
        onChange={onChange}
        placeholder="search ticket.."
      />
    </div>
  );
}
