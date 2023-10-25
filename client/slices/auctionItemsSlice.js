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
  allItems: [  {
    start_time: new Date(),
    end_time: "10/21/2023 8:00 pm",
    status: 'open',
    current_price: 100,
    seller_id: 1,
    item_name: 'Dummy Item 1',
    img_url: 'https://justbobbybucket.s3.us-west-2.amazonaws.com/1697987760950',
    category: 'electronics',
    description: 'A dummy auction item 1.',
  },
  {
    start_time: new Date(),
    end_time: "10/21/2023 8:00 pm",
    status: 'open',
    current_price: 150,
    seller_id: 2, 
    item_name: 'Dummy Item 2',
    img_url: 'https://freepngimg.com/thumb/kobe_bryant/98558-player-basketball-bryant-kobe-hd-image-free.png',
    category: 'clothing & accessories',
    description: 'A dummy auction item 2.',
  },
  {
    start_time: new Date(),
    end_time: "10/21/2023 8:00 pm",
    status: 'open',
    current_price: 200,
    seller_id: 3, 
    item_name: 'Dummy Item 3',
    img_url: 'https://freepngimg.com/thumb/kobe_bryant/98558-player-basketball-bryant-kobe-hd-image-free.png',
    category: 'sporting goods',
    description: 'A dummy auction item 3.',
  },
  {
    start_time: new Date(),
    end_time: "10/21/2023 8:00 pm",
    status: 'open',
    current_price: 150,
    seller_id: 4, 
    item_name: 'Dummy Item 4',
    img_url: 'https://freepngimg.com/thumb/kobe_bryant/98558-player-basketball-bryant-kobe-hd-image-free.png',
    category: 'clothing & accessories',
    description: 'A dummy auction item 2.',
  },
  {
    start_time: new Date(),
    end_time: "10/21/2023 8:00 pm",
    status: 'open',
    current_price: 150,
    seller_id: 5, 
    item_name: 'Dummy Item 5',
    img_url: 'https://freepngimg.com/thumb/kobe_bryant/98558-player-basketball-bryant-kobe-hd-image-free.png',
    category: 'clothing & accessories',
    description: 'A dummy auction item 2.',
  },
  {
    start_time: new Date(),
    end_time: "10/21/2023 8:00 pm",
    status: 'open',
    current_price: 150,
    seller_id: 6, 
    item_name: 'Dummy Item 6',
    img_url: 'https://freepngimg.com/thumb/kobe_bryant/98558-player-basketball-bryant-kobe-hd-image-free.png',
    category: 'clothing & accessories',
    description: 'A dummy auction item 2.',
  },
],
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
