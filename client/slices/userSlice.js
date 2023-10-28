import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    address: '123 Main St',
    city: 'Springfield',
    state: 'IL',
    id:1,
    zip: 62704,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: 123456789,
    password: 'password'
  },
  LoggedIn: false,
  openBids: [],
  followedItems: [],
  wonItems: [  {
    "id": 2,
    "start_time": "2023-10-23T00:31:51.754Z",
    "end_time": "2023-10-23T00:31:51.754Z",
    "status": "closed",
    "current_price": 151,
    "buyer_id": 1,
    "seller_id": 2,
    "item_name": "Dummy Item 2",
    "img_url": "item2.jpg",
    "category": "clothing & accessories",
    "description": "Example Update.",
    "createdAt": "2023-10-23T00:31:53.100Z",
    "updatedAt": "2023-10-25T13:10:44.210Z"
  }],
  purchaseHistory: [],
  itemsForSale: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserInfo: (state, action) => {
      state.userInfo = action.payload;
      state.LoggedIn = true;
    },
    login: (state, action) => {
      state.LoggedIn = true;
    },
    logout: (state, action) => {
      state.LoggedIn = false;
    },
    getAllOpenBids: (state, action) => {
      state.openBids = action.payload;
    },
    getFollowedItems: (state, action) => {
      state.followedItems = action.payload;
    },
    getWonItems: (state, action) => {
      state.wonItems = action.payload;
    },
    addPurchaseHistory: (state, action) => {
        state.purchaseHistory = state.purchaseHistory.push(action.payload);
    },
    sellItem: (state, action) => {
        state.itemsForSale = state.itemsForSale.push(action.payload);
    },
  },
});

export const { getUserInfo, login, logout, getAllOpenBids, getWonItems, addPurchaseHistory, sellItem, getFollowedItems } =
  userSlice.actions;
export default userSlice.reducer;
