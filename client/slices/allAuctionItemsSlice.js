import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allItems: [],
  openItems: [],
};

export const allAuctionItemsSlice = createSlice({
  name: "allAuctionItems",
  initialState,
  reducers: {
    getAllItems: (state, action) => {
      state.username = state.allItems.push(action.payload);
    },
    getOpenItems: (state, action) => {
        state.username = state.openItems.push(action.payload);
    },
  },
});

export const { getAllItems, getOpenItems } =
allAuctionItemsSlice.actions;
export default allAuctionItemsSlice.reducer;
