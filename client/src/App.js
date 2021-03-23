import "./App.css";
import { useState, useEffect } from "react";
import Search from "./components/Search";
import Tickets from "./components/Tickets";
import axios from "axios";
require("dotenv").config();

function App() {
  const [ticketsList, setTicketsList] = useState([]);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    axios
      .get("/api/tickets")
      .then((ticket) => {
        const allTicketList = ticket.data;
        setTicketsList(allTicketList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSearch = (inputValue) => {
    axios.get(`/api/tickets?searchText=${inputValue}`).then((ticket) => {
      const allTicketList = ticket.data;
      setTicketsList(allTicketList);
    });
  };

  const searchOnChange = (e) => {
    const inputValue = e.target.value;
    onSearch(inputValue);
  };

  const hideTicket = (e) => {
    const ticket = e.target.parentElement;
    console.log(ticket);
    setCounter(counter + 1);
    ticket.setAttribute("hidden", true);
  };

  // const restoredTickets = () => {

  //   console.log("restore");
  //   setTicketsList(statelList);
  // };

  return (
    <div className="App">
      <header>Tickets Manager</header>
      <div className="body">
        <Search onChange={searchOnChange} />
        <div className="restore-section">
          <span>{counter} hidden ticket`s </span>
          <button id="restoreHideTickets">restored</button>
        </div>
        <Tickets hideTicket={hideTicket} ticketsList={ticketsList} />
      </div>
    </div>
  );
}

export default App;
