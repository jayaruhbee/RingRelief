import React from "react";

const DeleteButton = ({ onDelete }) => {
  const handleDelete = () => {
    const checkpoint = window.confirm(
      "Are you sure you would like to delete your post/comment?"
    );
    if (checkpoint) {
      onDelete();
    }
  };
  return (
    <button onClick={handleDelete} className="border-2 border-black">
      X 
    </button>
  );
};

export default DeleteButton;
