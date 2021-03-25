import React from "react";
import "../styles/menu.css";

export default function Menu({
  showDoneTickets,
  refreshPage,
  showDeleteTickets,
  closeNav,
}) {
  let className = "sidenav";
  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
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
        <span
          href={void 0}
          onClick={() => showDeleteTickets()}
          style={{ cursor: "pointer" }}
        >
          Recycle Bin
        </span>
      </div>
      <span
        style={{
          fontSize: "40px",
          cursor: "pointer",
          fontWeight: "bold",
          fontFamily: "cursive",
        }}
        onClick={() => openNav()}
      >
        &#9776; Menu
      </span>
    </>
  );
}
