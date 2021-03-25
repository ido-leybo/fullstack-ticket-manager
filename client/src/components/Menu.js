import React from "react";
import "../styles/menu.css";

export default function Menu({ showDoneTickets, refreshPage }) {
  let className = "sidenav";
  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

  return (
    <>
      <div id="mySidenav" className={className}>
        <span
          className="closebtn"
          onClick={() => closeNav()}
          style={{ cursor: "pointer" }}
        >
          &times;
        </span>
        <span onClick={() => refreshPage()} style={{ cursor: "pointer" }}>
          Home
        </span>
        <span
          href={void 0}
          onClick={() => showDoneTickets()}
          style={{ cursor: "pointer" }}
        >
          Done Tickets
        </span>
      </div>
      <span
        style={{ fontSize: "30px", cursor: "pointer" }}
        onClick={() => openNav()}
      >
        &#9776; Menu
      </span>
    </>
  );
}
