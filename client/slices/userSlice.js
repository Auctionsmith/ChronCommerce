import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    address: '123 Main St',
    city: 'Springfield',
    state: 'IL',
    zip: 62704,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: 123456789,
    password: 'password'
  },
  LoggedIn: true,
  openBids: [  {
    start_time: new Date(),
    end_time: "10/21/2023 8:00 pm",
    status: 'open',
    current_price: 100,
    seller_id: 1,
    item_name: 'Dummy Item 1',
    img_url: 'https://freepngimg.com/thumb/kobe_bryant/98558-player-basketball-bryant-kobe-hd-image-free.png',
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
    seller_id: 2, 
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
    seller_id: 2, 
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
    seller_id: 2, 
    item_name: 'Dummy Item 6',
    img_url: 'https://freepngimg.com/thumb/kobe_bryant/98558-player-basketball-bryant-kobe-hd-image-free.png',
    category: 'clothing & accessories',
    description: 'A dummy auction item 2.',
  },
],
  wonItems: [],
  purchaseHistory: [],
  itemsForSale: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    login: (state, action) => {
      state.LoggedIn = true;
    },
    logout: (state, action) => {
      state.LoggedIn = false;
    },
    addBid: (state, action) => {
      state.openBids = state.openBids.push(action.payload);
    },
    addWonItem: (state, action) => {
      state.wonItems = state.wonItems.push(action.payload);
    },
    addPurchaseHistory: (state, action) => {
        state.purchaseHistory = state.purchaseHistory.push(action.payload);
    },
    sellItem: (state, action) => {
        state.itemsForSale = state.itemsForSale.push(action.payload);
    },
  },
});

export const { getUserInfo, login, logout, addBid, addWonItem, addPurchaseHistory, sellItem } =
  userSlice.actions;
export default userSlice.reducer;
