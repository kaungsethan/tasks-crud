import Swal from "sweetalert2";
import {
    checked,
    contentContainer,
    createdLists,
    doneAllBtn,
    editInputTemplate,
    inputText,
    taskTemplate,
} from "./selector.js";
import { v4 as uuidv4 } from "uuid";

export const tasks = ["Initial Render 1", "Initial Render 2"];

export const checkedListsCount = () => {
  const checkedLists = document.querySelectorAll(".mainText.line-through");
  checked.innerText = checkedLists.length;
  return checkedLists;
};

export const createdListsCount = () => {
  const lists = document.querySelectorAll(".lists");
  createdLists.innerText = lists.length;
  return lists;
};

export const createList = (text) => {
  const list = taskTemplate.content.cloneNode(true).children[0];
  const mainText = list.querySelector(".mainText");
  mainText.innerText = text;
  list.id = "input-" + uuidv4();
  list.classList.add("lists");

  return list;
};

export const addList = (text) => {
  inputText.value = "";
  contentContainer.append(createList(text));
};

export const deleteList = (listID) => {
  const targetList = document.querySelector(`#${listID}`);
  Swal.fire({
    position: "top-end",
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#0000",
    cancelButtonColor: "#0000",
    confirmButtonText: "Yes, delete this task !"
  }).then((result) => {
    if (result.isConfirmed) {
      const allList = contentContainer.querySelectorAll(".lists");
      allList.forEach((list) => {
         targetList.classList.add("animate__flipOutX", "animate__animated");
    targetList.addEventListener("animationend", () => {
      targetList.remove();
        });
      });
    }
  });
};

export const doneList = (listID) => {
  const targetList = document.querySelector(`#${listID}`);

  const mainText = targetList.querySelector(".mainText");
  const listCheckbox = targetList.querySelector(".listCheckbox");
  const editBtn = targetList.querySelector(".editBtn");

  mainText.classList.toggle("line-through");

  //to disable edit button while in list checked
  if (listCheckbox.checked) {
    editBtn.setAttribute("disabled", "true");
  } else {
    editBtn.removeAttribute("disabled");
  }
};

export const editList = (listID) => {
  const targetList = document.querySelector(`#${listID}`);
  const mainText = targetList.querySelector(".mainText");

  //store original text b4 replace
  const taskText = mainText.innerText;
  //replace with input
  const newEditInput = editInputTemplate.content.cloneNode(true).children[0];
  mainText.replaceWith(newEditInput);
  // to show the original text
  const taskEdit = targetList.querySelector(".taskEdit");
  taskEdit.value = taskText;
  // cursor at the end of text
  taskEdit.focus();
  const textLength = taskEdit.value.length;
  taskEdit.setSelectionRange(textLength, textLength);
};

export const updateList = (listID) => {
  const targetList = document.querySelector(`#${listID}`);
  const taskEdit = targetList.querySelector(".taskEdit");

  const innerTextTemplate = document.querySelector("#innerTextTemplate");
  const newInnerText = innerTextTemplate.content.cloneNode(true).children[0];

  const updateHandler = () => {
    newInnerText.innerText = taskEdit.value;
    taskEdit.replaceWith(newInnerText);
  };
  taskEdit.addEventListener("blur", updateHandler);
};

export const updateListWithEnter = (listID) => {
  const targetList = document.querySelector(`#${listID}`);
  const taskEdit = targetList.querySelector(".taskEdit");

  const innerTextTemplate = document.querySelector("#innerTextTemplate");
  const newInnerText = innerTextTemplate.content.cloneNode(true).children[0];

  const updateHandler = () => {
    newInnerText.innerText = taskEdit.value;
    taskEdit.replaceWith(newInnerText);
  };
  taskEdit.addEventListener("change", updateHandler);
};

export const deleteAll = () => {
  Swal.fire({
    position: "top-end",
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#0000",
    cancelButtonColor: "#0000",
    confirmButtonText: "Yes, delete all!"
  }).then((result) => {
    if (result.isConfirmed) {
      const allList = contentContainer.querySelectorAll(".lists");
      allList.forEach((list) => {
        list.classList.add("animate__flipOutX", "animate__animated");
        list.addEventListener("animationend", () => {
          list.remove();
        });
      });
    }
  });
};

export const doneAll = () => {
  const allList = contentContainer.querySelectorAll(".lists");
  const isAllChecked = [...allList].every(
    (list) => list.querySelector(".listCheckbox").checked
  );

  allList.forEach((list) => {
    const mainText = list.querySelector(".mainText");
    const listCheckbox = list.querySelector(".listCheckbox");
    const editBtn = list.querySelector(".editBtn");

    if (isAllChecked) {
      listCheckbox.checked = false;
      mainText.classList.remove("line-through");
      editBtn.removeAttribute("disabled");
    } else {
      listCheckbox.checked = true;
      mainText.classList.add("line-through");
      editBtn.setAttribute("disabled", "true");
    }
  });
  doneAllBtn.innerText = isAllChecked ? "Check All" : "Uncheck All";
};
