import { createSlice } from "@reduxjs/toolkit";

// const dummyAuction = [
  // {
  //   start_time: new Date(),
  //   end_time: new Date(),
  //   status: 'open',
  //   current_price: 100,
  //   seller_id: 1,
  //   item_name: 'Dummy Item 1',
  //   img_url: 'item1.jpg',
  //   category: 'electronics',
  //   description: 'A dummy auction item 1.',
  // },
  // {
  //   start_time: new Date(),
  //   end_time: new Date(),
  //   status: 'open',
  //   current_price: 150,
  //   seller_id: 2, 
  //   item_name: 'Dummy Item 2',
  //   img_url: 'item2.jpg',
  //   category: 'clothing & accessories',
  //   description: 'A dummy auction item 2.',
  // },
  // {
  //   start_time: new Date(),
  //   end_time: new Date(),
  //   status: 'open',
  //   current_price: 200,
  //   seller_id: 3, 
  //   item_name: 'Dummy Item 3',
  //   img_url: 'item3.jpg',
  //   category: 'sporting goods',
  //   description: 'A dummy auction item 3.',
  // },
// ]

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
      state.allItems = action.payload;
    },
    setOpenItems: (state, action) => {
        state.openItems = state.openItems.push(action.payload);
    },
    setSearchResultItems: (state, action) => {
        state.searchResultItems = action.payload
    },
  },
});

export const { setAllItems, setOpenItems, setSearchResultItems } =
auctionItemsSlice.actions;

export default auctionItemsSlice.reducer;
