import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../configs/axios";
import { Input } from "antd";
// import notes from '../assets/data.js'
// import ArrowLeft from "../assets/arrow-left.svg";

const NotePage = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  let [note, setNote] = useState<{ title: string; content: string }>({
    title: "",
    content: "",
  });

  useEffect(() => {
    let getNote = async () => {
      if (id === "new") return;
      let response = await fetch(`/api/notes/${id}`);
      let data = await response.json();
      console.log(data);
      setNote(data);
    };
    getNote();
  }, [id]);

  let createNote = async () => {
    // const newNote = await axiosInstance.post(`/notes`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ ...note }),
    // });

    console.log(note);
  };

  let updateNote = async () => {
    await fetch(`/api/notes/${id}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  let deleteNote = async () => {
    await fetch(`/api/notes/${id}/delete/`, {
      method: "DELETE",
    });
    navigate("/");
  };

  let handleSubmit = () => {
    if (id !== "new" && !note.title) {
      deleteNote();
    } else if (id !== "new") {
      updateNote();
    } else if (id === "new" && note !== null) {
      createNote();
    }
    navigate("/");
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">Back</Link>
        </h3>
        {id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Save</button>
        )}
      </div>
      <div className="note-body">
        <Input
          placeholder="Title"
          value={note.title}
          onChange={(e) => {
            setNote({ ...note, title: e.target.value });
          }}
        />
        <textarea
          onChange={(e) => {
            setNote({ ...note, content: e.target.value });
          }}
          value={note.content}
        ></textarea>
      </div>
    </div>
  );
};

export default NotePage;
