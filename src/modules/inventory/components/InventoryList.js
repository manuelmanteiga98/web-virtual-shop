import React from "react";
import Listitem from "./ListItem";
import { useDispatch, useSelector } from "react-redux";
import { isEmptyList, selectFilteredArticles } from "../selectors";
import { getArticles as getArticlesBackend } from "../../backend/firestore";
import { addArticles } from "../../../store/articlesSlice";

function InventoryList() {
  const empty = useSelector(isEmptyList);
  const filteredList = useSelector(selectFilteredArticles);
  const dispatch = useDispatch();

  if (empty) {
    getArticlesBackend((items) => dispatch(addArticles(items)));
    return <p>No items to display</p>;
  }

  return (
    <div class="container d-grid item-list">
      {filteredList.map((element) => (
        <Listitem
          itemKey={element.id}
          content={element.name}
          units={element.units}
        />
      ))}
    </div>
  );
}

export { InventoryList };
