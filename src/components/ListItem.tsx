import React from "react";
import { Link } from "react-router-dom";
import { INote } from "../interfaces/note";
import { Button, Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { DeleteOutlined } from "@ant-design/icons";
import axiosInstance from "../configs/axios";

const ListItem = ({
  note,
  onDelete,
}: {
  note: INote;
  onDelete: (id: number) => void;
}) => {
  let getTitle = (note: INote) => {
    let title = note.title;
    if (title.length > 25) {
      title = title.slice(0, 25) + "...";
    }
    return title;
  };
  let getDate = (note: INote) => {
    return new Date(note.updatedAt).toLocaleDateString();
  };
  let getContent = (note: INote) => {
    let content = note.content;
    if (content.length > 69) {
      return content.slice(0, 69) + "...";
    }
    return content;
  };

  const deleteNote = async (id: number) => {
    await axiosInstance.delete(`/notes/${id}`);
    onDelete(id);
  };

  const updateNote = async (e: CheckboxChangeEvent, id: number) => {
    await axiosInstance.patch(`/notes/${id}`, {
      completed: e.target.checked,
    });
  };

  return (
    <div className="note-container">
      <Checkbox
        defaultChecked={note.completed}
        onChange={(e) => updateNote(e, note.id)}
      ></Checkbox>

      <div className="notes-list-item">
        <Link to={`/note/${note.id}`}>
          <h3>{getTitle(note)}</h3>
          <p>{getContent(note)}</p>
          <p>{getDate(note)}</p>
        </Link>
      </div>
      <div className="notes-edit">
        {/* <form action=""> */}
        <DeleteOutlined
          className="sss"
          style={{ fontSize: "32px" }}
          onClick={() => deleteNote(note.id)}
        />
        {/* </form> */}
      </div>
    </div>
  );
};

export default ListItem;
