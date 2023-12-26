import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, redirect } from "react-router-dom";
import axiosInstance from "../configs/axios";
import { Input } from "antd";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  dateTimePicker: {
    "& .MuiInputLabel-root": {
      color: "white", // Màu của label
      fontWeight: "bold", // Độ đậm của label
      "&.Mui-focused ": {
        color: "white", // Màu của border khi focus
      },
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white", // Màu của border
      },
      "&:hover fieldset": {
        borderColor: "white", // Màu của border khi hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "white", // Màu của border khi focus
      },
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
    "& .css-i4bv87-MuiSvgIcon-root": {
      color: "white",
    },
  },
}));

const NotePage = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  let [note, setNote] = useState<{ title: string; content: string }>({
    title: "",
    content: "",
  });
  const [value, setValue] = useState<Dayjs | null>(dayjs(new Date()));
  const classes = useStyles();

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
    const newNote = await axiosInstance.post(`/notes`, {
      ...note,
      reminder: value,
    });
    return newNote;
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
    await axiosInstance.delete(`/notes/${id}`);
  };

  let handleSubmit = () => {
    if (id !== "new" && !note.title) {
      deleteNote();
    } else if (id !== "new") {
      updateNote();
    } else if (id === "new" && note !== null) {
      createNote();
    }
    window.location.replace("/");
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

      <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
        <div style={{ padding: "10px 20px", width: "100%" }}>
          <DateTimePicker
            label="Reminder"
            value={value}
            onChange={(newValue) => {
              console.log(newValue?.format("YYYY-MM-DD HH:mm:ss"));
              setValue(newValue);
            }}
            className={classes.dateTimePicker}
          />
        </div>
      </DemoContainer>
      <div className="note-body">
        <Input
          placeholder="Title"
          value={note.title}
          onChange={(e) => {
            setNote({ ...note, title: e.target.value });
          }}
          style={{ marginTop: "20px" }}
        />
        <textarea
          onChange={(e) => {
            setNote({ ...note, content: e.target.value });
          }}
          placeholder="Write your note here..."
          value={note.content}
          style={{ marginTop: "20px" }}
        ></textarea>
      </div>
    </div>
  );
};

export default NotePage;
