import Swal from "sweetalert2";
import {
  addList,
  deleteAll,
  deleteList,
  doneAll,
  doneList,
  editList,
  updateList,
  updateListWithEnter,
} from "./list.js";

export const contentContainerHandler = (event) => {
  const list = event.target.closest(".lists");

  if (event.target.classList.contains("listCheckbox")) {
    doneList(list.id);
  }

  if (event.target.classList.contains("deleteBtn")) {
    deleteList(list.id);
  }

  if (event.target.classList.contains("editBtn")) {
    editList(list.id);
    updateList(list.id);
  }
};

export const addListHandler = () => {
  if (inputText.value.trim()) {
    addList(inputText.value);
  } else {
    Swal.fire({
      position: "top-end",
      icon: "warning",
      title: "No Task Found",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

export const addListWithEnterHandler = (event) => {
  if (inputText.value.trim()) {
    if (event.key === "Enter") {
      addList(inputText.value);
    }
  } else {
    Swal.fire({
      position: "top-end",
      icon: "warning",
      title: "No Task Found",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

export const editListWithEnterHandler = (event) => {
  if (event.key === "Enter") {
    const list = event.target.closest(".lists");
    updateListWithEnter(list.id);
  }
};

export const doneAllBtnHandler = () => {
  doneAll();
};

export const deleteAllBtnHandler = () => {
  deleteAll();
};
