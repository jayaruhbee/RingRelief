import React from "react";

const DeleteButton = ({ onDelete }) => {
  const handleDelete = () => {
    const checkpoint = window.confirm(
      "Are you sure you would like to delete this?"
    );
    if (checkpoint) {
      onDelete();
    }
  };
  return (
    <button
    onClick={handleDelete}
    className="text-gray-600 hover:text-red-600 pl-1"
  >
    Delete
  </button>
  );
};

export default DeleteButton;
