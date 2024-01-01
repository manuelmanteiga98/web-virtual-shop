import React from "react";
import Listitem from "./ListItem";
import { useDispatch, useSelector } from "react-redux";
import { isEmptyList, selectFilteredItems } from "../selectors";
import { getItemsFromFirestore } from "../../backend/itemsBackend";
import { addCategory, addItem } from "../../../store/itemsSlice";
import InventoryListBar from "./AddItemModal";

function InventoryList() {
  const empty = useSelector(isEmptyList);
  const filteredList = useSelector(selectFilteredItems);
  const dispatch = useDispatch();

  if (empty) {
    getItemsFromFirestore(
      (item) => dispatch(addItem(item)),
      (category) => dispatch(addCategory(category))
    );
    return (
      <div>
        <InventoryListBar />
        <div className="items-no-items">No items to display</div>
      </div>
    );
  }

  return (
    <div>
      <InventoryListBar />
      <div class="container d-flex item-list">
        {filteredList.map((item) => (
          <Listitem
            id={item.id}
            name={item.name}
            units={item.units}
            imageURL={item.imageURL}
          />
        ))}
      </div>
    </div>
  );
}

export { InventoryList };
