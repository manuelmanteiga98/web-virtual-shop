import { createSlice } from "@reduxjs/toolkit";

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    list: [],
    filteredList: [],
  },
  reducers: {
    articleAdded(state, action) {
      return state.push({
        id: action.payload.id,
        text: action.payload.text,
      });
    },
    addArticles(state, action) {
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

export const {
  articleAdded,
  articleDecrease,
  articleToggle,
  addArticles,
  toFiltered,
} = articlesSlice.actions;
export default articlesSlice.reducer;
