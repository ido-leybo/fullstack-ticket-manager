import React from "react";

export default function Search({ onChange }) {
  return (
    <div>
      <input id="searchInput" onChange={onChange} placeholder="search ticket" />
    </div>
  );
}