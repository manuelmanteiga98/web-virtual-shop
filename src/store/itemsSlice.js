import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    list: [],
    filteredList: [],
  },
  reducers: {
    itemAdded(state, action) {
      return state.push({
        id: action.payload.id,
        text: action.payload.text,
      });
    },
    addItems(state, action) {
      state["list"] = action.payload;
      state["filteredList"] = action.payload;
      return state;
    },
    toFiltered(state, action) {
      state["filteredList"] = state["list"].filter((item) =>
        item.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return state;
    },
  },
});

export const { itemAdded, itemDecrease, itemToggle, addItems, toFiltered } =
  itemsSlice.actions;
export default itemsSlice.reducer;
