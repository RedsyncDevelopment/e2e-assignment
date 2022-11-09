import React from "react";

interface FormButtonsProps {
  onEditClick: () => void;
  onDeleteClick: () => void;
  isEditOpen: boolean;
}

const FormButtons: React.FC<FormButtonsProps> = ({
  onEditClick,
  onDeleteClick,
  isEditOpen,
}) => {
  return (
    <div className="w-full flex space-x-2">
      <button onClick={onEditClick} className="edit-btn">
        {isEditOpen ? "Close" : "Edit"}
      </button>
      <button onClick={onDeleteClick} className="delete-btn">
        Delete
      </button>
    </div>
  );
};

export default FormButtons;
