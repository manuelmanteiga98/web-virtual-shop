import React from "react";
import Listitem from "./ListItem";
import { useDispatch, useSelector } from "react-redux";
import { isEmptyList, selectFilteredItems } from "../selectors";
import { getItems as getItemsBackend } from "../../backend/firestore";
import { addItems } from "../../../store/itemsSlice";

function InventoryList() {
  const empty = useSelector(isEmptyList);
  const filteredList = useSelector(selectFilteredItems);
  const dispatch = useDispatch();

  if (empty) {
    getItemsBackend((items) => dispatch(addItems(items)));
    return <p>No items to display</p>;
  }

  return (
    <div class="container d-flex item-list">
      {filteredList.map((element) => (
        <Listitem item={element} />
      ))}
    </div>
  );
}

export { InventoryList };
