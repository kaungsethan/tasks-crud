import {
  addListHandler,
  addListWithEnterHandler,
  contentContainerHandler,
  deleteAllBtnHandler,
  doneAllBtnHandler,
  editListWithEnterHandler,
} from "./handler.js";

import {
  addBtn,
  contentContainer,
  deleteAllBtn,
  doneAllBtn,
  inputText,
} from "./selector.js";

const listener = () => {
  addBtn.addEventListener("click", addListHandler);
  inputText.addEventListener("keyup", addListWithEnterHandler);
  contentContainer.addEventListener("keyup", editListWithEnterHandler); // Event Delegation
  contentContainer.addEventListener("click", contentContainerHandler); // Event Delegation
  doneAllBtn.addEventListener("click", doneAllBtnHandler);
  deleteAllBtn.addEventListener("click", deleteAllBtnHandler);
};

export default listener;
