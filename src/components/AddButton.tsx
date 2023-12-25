import React from "react";
import { Link } from "react-router-dom";
import Addicon from "../assets/add.svg";

const AddButton = () => {
  return (
    <div className="floating-button">
      <Link to="note/new/">
        {/* <Addicon /> */}
        Add
      </Link>
    </div>
  );
};

export default AddButton;
