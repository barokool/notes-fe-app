import React, { useState, useEffect } from "react";
import ListItem from "../components/ListItem.js";
import AddButton from "../components/AddButton.js";
import axios from "axios";
import axiosInstance from "../configs/axios.js";
import { ResponseListModel } from "../interfaces/response.js";

const NotesListPage = () => {
  let [notes, setNote] = useState([]);

  useEffect(() => {
    getNotes();
  }, []); // fires once when the component is mounted

  let getNotes = async () => {
    let response = await axiosInstance.get<never, ResponseListModel<never>>(
      "notes"
    );
    let data = response.data;
    setNote(data?.data);
  };

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>
      <div className="notes-list">
        {notes?.map((note, index) => {
          return (
            <div className="note-preview" key={index}>
              <ListItem note={note} />
            </div>
          );
        })}
      </div>
      <AddButton />
    </div>
  );
};

export default NotesListPage;
