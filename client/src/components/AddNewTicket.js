import React from "react";
import "../styles/addNewTicket.css";

export default function AddNewTicket({ onClick }) {
  const openForm = (e) => {
    const currentDiv = e.target.parentElement.children[2];
    currentDiv.style.display = "block";
  };

  const closeForm = (e) => {
    const currentDiv = e.target.parentElement.parentElement;
    currentDiv.style.display = "none";
  };

  return (
    <>
      <button className="open-button" onClick={openForm}>
        ➕
      </button>
      <div className="form-popup" id="myForm">
        <form action="/api/tickets" className="form-container" method="post">
          <h1>New ticket</h1>

          <label htmlFor="title">
            <b>Title</b>
          </label>
          <input
            id="titleInput"
            type="text"
            placeholder="Enter your title"
            name="title"
            required
          ></input>

          <label htmlFor="content">
            <b>Content</b>
          </label>
          <input
            id="contentInput"
            type="text"
            placeholder="Enter content"
            name="content"
            required
          ></input>

          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            id="emailInput"
            type="text"
            placeholder="Enter email"
            name="email"
            required
          ></input>
          <br />
          <label htmlFor="labels">
            <b>Label</b>
          </label>
          <input
            id="labelInput"
            type="text"
            placeholder="Enter label"
            name="labels"
          ></input>

          <button
            id="addButton"
            onClick={onClick}
            type="submit"
            className="btn"
          >
            Add
          </button>
          <button type="button" className="btn cancel" onClick={closeForm}>
            Close
          </button>
        </form>
      </div>
    </>
  );
}
