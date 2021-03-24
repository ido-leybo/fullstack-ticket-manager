import "./styles/App.css";
import { useState, useEffect } from "react";
import Search from "./components/Search";
import Tickets from "./components/Tickets";
import Counter from "./components/Counter";
import axios from "axios";
require("dotenv").config();

let baseList;
let hideTickets = [];
function App() {
  const [ticketsList, setTicketsList] = useState([]);
  const [counter, setCounter] = useState(0);
  const [showTickets, setShowTickets] = useState(0);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    axios
      .get("/api/tickets")
      .then((ticket) => {
        const allTicketList = ticket.data;
        baseList = allTicketList;
        setShowTickets(allTicketList.length);
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
      setShowTickets(allTicketList.length);
    });
  };

  const searchOnChange = (e) => {
    const inputValue = e.target.value;
    onSearch(inputValue);
  };

  const hideTicket = (ticket) => {
    hideTickets.push(ticket.id);
    const filterArray = ticketsList.filter(
      (ticketId) => ticket.id !== ticketId.id
    );
    setTicketsList(filterArray);
    setShowTickets(filterArray.length);
    setCounter(counter + 1);
  };

  const restoredTickets = () => {
    setShowTickets(baseList.length);
    setTicketsList(baseList);
    hideTickets = [];
    setCounter(0);
  };

  return (
    <div className="App">
      <header>Tickets Manager</header>
      <div className="body">
        <Search onChange={searchOnChange} />
        <div className="restore-section">
          <span>
            <span id="hideTicketsCounter">{counter}</span> hidden ticket`s{" "}
          </span>
          <button id="restoreHideTickets" onClick={restoredTickets}>
            restored
          </button>
          <Counter
            counter={counter}
            hideList={hideTickets}
            showTickets={showTickets}
          />
        </div>
        <Tickets hideTicket={hideTicket} ticketsList={ticketsList} />
      </div>
    </div>
  );
}

export default App;
