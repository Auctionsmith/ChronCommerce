import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allItems: [],
  openItems: [],
  searchResultItems: [],
};

export const auctionItemsSlice = createSlice({
  name: "auctionItems",
  initialState,
  reducers: {
    setAllItems: (state, action) => {
      state.username = state.allItems.push(action.payload);
    },
    setOpenItems: (state, action) => {
        state.username = state.openItems.push(action.payload);
    },
    setSearchResultItems: (state, action) => {
        state.username = state.searchResultItems.push(action.payload);
    },
  },
});

export const { setAllItems, setOpenItems, setSearchResultItems } =
auctionItemsSlice.actions;

export default auctionItemsSlice.reducer;
