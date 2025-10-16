import { checkedListsCount, createdListsCount } from "./list.js";
import { contentContainer } from "./selector.js";

const observer = () => {
    const job = () => {
    checkedListsCount();
    createdListsCount();
}

const listObserver = new MutationObserver(job);
listObserver.observe(contentContainer,{
  attributes: true,
  childList: true,
  subtree: true,
})
}

export default observer;