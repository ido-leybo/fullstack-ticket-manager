import "./styles/App.css";
import { useState, useEffect } from "react";
import Search from "./components/Search";
import Tickets from "./components/Tickets";
import Counter from "./components/Counter";
import axios from "axios";
import AddNewTicket from "./components/AddNewTicket";
import Menu from "./components/Menu";
require("dotenv").config();

let baseList;
function App() {
  const [ticketsList, setTicketsList] = useState([]);
  const [counter, setCounter] = useState(0);
  const [numOfShowTickets, setNumOfShowTickets] = useState(0);
  const [hideTickets, setHideTickets] = useState([]);
  const [doneTickets, setDoneTickets] = useState([]);
  const [deleteTickets, setDeleteTickets] = useState([]);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    axios
      .get("/api/tickets")
      .then((ticket) => {
        const allTicketList = ticket.data;
        baseList = allTicketList;
        allTicketList.forEach((ticketItem) => {
          if (ticketItem.done) {
            if (!doneTickets.includes(ticketItem)) {
              doneTickets.push(ticketItem);
            }
          }

          if (ticketItem.delete) {
            if (!deleteTickets.includes(ticketItem)) {
              deleteTickets.push(ticketItem);
            }
          }
        });
        const filterAfterDelete = allTicketList.filter((filterTicket) => {
          if (!filterTicket.delete) {
            return filterTicket;
          }
        });
        const filterAfterrestore = allTicketList.filter((filterTicket) => {
          if (filterTicket.delete) {
            return filterTicket;
          }
        });
        setDeleteTickets(filterAfterrestore);
        setNumOfShowTickets(filterAfterDelete.length);
        setTicketsList(filterAfterDelete);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSearch = (inputValue) => {
    axios.get(`/api/tickets?searchText=${inputValue}`).then((ticket) => {
      const allTicketList = ticket.data;
      const filterList = notShowIfHide(allTicketList);
      const filterAfterDelete = filterList.filter((filterTicket) => {
        if (!filterTicket.delete) {
          return filterTicket;
        }
      });
      setTicketsList(filterAfterDelete);
      setNumOfShowTickets(filterAfterDelete.length);
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

  const refreshPage = () => {
    onLoad();
  };

  const doneTicket = (ticket, e) => {
    let value = e.target.textContent;
    e.target.textContent = value === "✅" ? "⛔" : "✅";

    if (value === "✅") {
      doneTickets.push(ticket);
      e.target.parentElement.parentElement.style.backgroundColor = "gray";
      axios.patch(`/api/tickets/${ticket.id}/done`);
    } else {
      e.target.parentElement.parentElement.style.backgroundColor =
        "rgba(172, 213, 214, 0.658)";
      const filterArr = doneTickets.filter(
        (doneTicket) => doneTicket.id !== ticket.id
      );
      axios.patch(`/api/tickets/${ticket.id}/undone`);
      setDoneTickets(filterArr);
    }
  };

  const showDoneTickets = () => {
    setTicketsList(doneTickets);
    setNumOfShowTickets(doneTickets.length);
  };

  const deleteTicket = (ticket, e) => {
    let value = e.target.textContent;
    e.target.textContent = value === "❌" ? "↩" : "❌";
    const ticketId = ticket.id;

    if (value === "❌") {
      deleteTickets.push(ticket);
      axios.put(`/api/tickets/${ticketId}/delete`);
    } else {
      axios.put(`/api/tickets/${ticketId}/restore`);

      const filterArr = deleteTickets.filter(
        (deleteTicket) => deleteTicket.id !== ticketId
      );
      console.log(filterArr);
      setDeleteTickets(filterArr);
      console.log("restore");
    }

    onLoad();
  };

  const showDeleteTickets = () => {
    console.log(deleteTickets);
    setTicketsList(deleteTickets);
    setNumOfShowTickets(deleteTickets.length);
  };

  const closeMainNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

  return (
    <div className="App">
      <header onClick={() => closeMainNav()}>Tickets Manager</header>
      <Menu
        showDoneTickets={showDoneTickets}
        refreshPage={refreshPage}
        showDeleteTickets={showDeleteTickets}
        closeNav={closeMainNav}
      />
      <div className="body" onClick={() => closeMainNav()}>
        <Search onChange={searchOnChange} />
        <AddNewTicket onClick={refreshPage} />
        <div className="restore-section">
          <Counter
            counter={counter}
            hideList={hideTickets}
            showTickets={numOfShowTickets}
            onClick={restoredTickets}
          />
        </div>
        <Tickets
          hideTicket={hideTicket}
          ticketsList={ticketsList}
          doneTicket={doneTicket}
          doneTickets={doneTickets}
          deleteTicket={deleteTicket}
          deleteTickets={deleteTickets}
        />
      </div>
    </div>
  );
}

export default App;
