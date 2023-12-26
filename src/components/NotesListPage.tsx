import React, { useState, useEffect } from "react";
import ListItem from "../components/ListItem.js";
import AddButton from "../components/AddButton.js";
import axios from "axios";
import axiosInstance from "../configs/axios.js";
import { ResponseListModel } from "../interfaces/response.js";
import { INote } from "../interfaces/note.js";

const NotesListPage = () => {
  let [notes, setNote] = useState<INote[]>([]);

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    console.log("Fetch data");
    let response = await axiosInstance.get<never, ResponseListModel<INote>>(
      "notes?limit=100&offset=0"
    );
    let data = response.data;
    setNote(data?.data);
  };

  const onTriggerDeleteNote = (id: number) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNote(filteredNotes);
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
              <ListItem note={note} onDelete={onTriggerDeleteNote} />
            </div>
          );
        })}
      </div>
      <AddButton />
    </div>
  );
};

export default NotesListPage;
