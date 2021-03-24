import "./styles/App.css";
import { useState, useEffect } from "react";
import Search from "./components/Search";
import Tickets from "./components/Tickets";
import Counter from "./components/Counter";
import axios from "axios";
import AddNewTicket from "./components/AddNewTicket";
require("dotenv").config();
// const labels = [
//   "Help",
//   "Tech",
//   "Guidelines",
//   "Corvid",
//   "Api",
//   "Collapse",
//   "Expand",
//   "Login",
//   "Problem",
//   "Tutorial",
// ];
let baseList;
function App() {
  const [ticketsList, setTicketsList] = useState([]);
  const [counter, setCounter] = useState(0);
  const [numOfShowTickets, setNumOfShowTickets] = useState(0);
  const [hideTickets, setHideTickets] = useState([]);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    axios
      .get("/api/tickets")
      .then((ticket) => {
        const allTicketList = ticket.data;
        baseList = allTicketList;
        setNumOfShowTickets(allTicketList.length);
        setTicketsList(allTicketList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSearch = (inputValue) => {
    axios.get(`/api/tickets?searchText=${inputValue}`).then((ticket) => {
      const allTicketList = ticket.data;
      const filterList = notShowIfHide(allTicketList);
      setTicketsList(filterList);
      setNumOfShowTickets(filterList.length);
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
    console.log(hideTickets);
    setTicketsList(filterArray);
    setNumOfShowTickets(filterArray.length);
    setCounter(counter + 1);
  };

  const restoredTickets = () => {
    setNumOfShowTickets(baseList.length);
    setTicketsList(baseList);
    setHideTickets([]);
    setCounter(0);
  };

  const notShowIfHide = (list) => {
    let filterArr = list.filter((ticket) => {
      return !hideTickets.includes(ticket.id);
    });

    return filterArr;
  };

  const addNewTicket = () => {
    onLoad();
  };

  return (
    <div className="App">
      <header>Tickets Manager</header>
      <div className="body">
        <Search onChange={searchOnChange} />
        <AddNewTicket onClick={addNewTicket} />
        <div className="restore-section">
          <Counter
            counter={counter}
            hideList={hideTickets}
            showTickets={numOfShowTickets}
            onClick={restoredTickets}
          />
        </div>
        <Tickets hideTicket={hideTicket} ticketsList={ticketsList} />
      </div>
    </div>
  );
}

export default App;
