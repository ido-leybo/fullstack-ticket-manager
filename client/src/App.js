import "./App.css";
import { useState, useEffect } from "react";
import Search from "./components/Search";
import Tickets from "./components/Tickets";
import axios from "axios";
require("dotenv").config();

const initialList = [
  {
    title: "ticket 1",
    content: "some string",
    email: "idoley01@gmail.com",
    creationTime: "12/12/2020",
    labels: ["click", "save"],
  },
  {
    title: "ido",
    content: "some string",
    email: "idoley01@gmail.com",
    creationTime: "10/02/2021",
    labels: ["push", "update"],
  },
];

function App() {
  const [ticketsList, setTicketsList] = useState([]);

  useEffect(() => {
    onFirstLoad();
  }, []);

  const onFirstLoad = async () => {
    await axios
      .get("/api/tickets")
      .then((ticket) => {
        console.log(ticket.data);
        const allTicketList = ticket.data;
        setTicketsList(allTicketList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchOnChange = (e) => {
    const inputValue = e.target.value;
    console.log(inputValue);
    console.log(ticketsList);
    const filterList = initialList.filter((value) => {
      const lowerCase = value.title.toLowerCase();
      return lowerCase.includes(inputValue);
    });
    console.log(filterList);
    setTicketsList(filterList);
  };

  const hideTicket = (e) => {
    const ticket = e.target.parentElement;
    console.log(ticket);
    ticket.setAttribute("hidden", true);
  };
  return (
    <div className="App">
      <header>Tickets Manager</header>
      <div className="body">
        <Search onChange={searchOnChange} />
        <div>
          <span>restored</span>
        </div>
        <Tickets hideTicket={hideTicket} ticketsList={ticketsList} />
      </div>
    </div>
  );
}

export default App;
