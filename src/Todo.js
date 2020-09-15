import React, { useEffect } from "react";
import "./Todo.css";

import { Modal } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

import firebase from "firebase";
import db from "./firebase";

function Todo({ todo, index, id }) {
  const [open, setOpen] = React.useState(false);
  const [editModal, setEditModal] = React.useState("");

  useEffect(() => {
    setEditModal(todo);
  }, []);

  const handleOpen = (e) => {
    setOpen(e);
    // console.log(e);
  };

  const handleClose = () => {
    setOpen(false);
    setEditModal("");
  };

  const handleEdit = (e) => {
    handleOpen("edit_model");
    setEditModal(todo);

    // console.log(e.currentTarget.classList, "handleEdit");
  };

  const handleEditSubmit = () => {
    if (editModal) {
      db.collection("todos").doc(id).set(
        {
          todo: editModal,
        },
        { merge: true }
      );
      handleClose();
    }
  };

  const handleDelete = (e) => {
    handleOpen("delete_model");
    setEditModal(todo);

    // console.log(e.currentTarget.classList, "handleEdit");
  };

  const handleDeleteSubmit = () => {
    db.collection("todos").doc(id).delete();
    handleClose();
  };

  return (
    <div className="todo_item">
      <span className="todo_item_text">
        {index + 1}. {todo}
      </span>
      <button className="todo_item_btn_edit" onClick={handleEdit}>
        <FontAwesomeIcon icon={faPencilAlt} />
      </button>

      <button className="todo_item_btn_delete" onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </button>

      {/* Edit Modal */}
      <div>
        <Modal
          open={open === "edit_model" ? true : false}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="modal_body">
            <h2 className="model_header">Edit Modal</h2>

            <div className="model_content">
              <textarea
                onChange={(e) => setEditModal(e.target.value)}
                value={editModal}
                placeholder="Todo Item"
                className="model_content_textarea"
              ></textarea>
            </div>

            <div className="model_content_btn_wrap">
              <button
                className="model_content_btn_submit"
                onClick={handleEditSubmit}
              >
                Submit
              </button>
              <button
                className="model_content_btn_cancel"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>

      {/* Delete Modal */}

      <div>
        <Modal
          open={open === "delete_model" ? true : false}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="modal_body">
            <h2 className="model_header">Are you sure you want to delete?</h2>

            {/* <div className="model_content">
              <textarea
                onChange={(e) => setEditModal(e.target.value)}
                value={editModal}
                placeholder="Todo Item"
                className="model_content_textarea"
              ></textarea>
            </div> */}

            <div className="model_content_btn_wrap">
              <button
                className="model_content_btn_submit"
                onClick={handleDeleteSubmit}
              >
                Submit
              </button>
              <button
                className="model_content_btn_cancel"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Todo;
