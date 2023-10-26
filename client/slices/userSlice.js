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
  openBids: [],
  followedItems: [],
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
    getAllOpenBids: (state, action) => {
      state.openBids = action.payload;
    },
    getFollowedItems: (state, action) => {
      state.followedItems = action.payload;
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

export const { getUserInfo, login, logout, getAllOpenBids, addWonItem, addPurchaseHistory, sellItem, getFollowedItems } =
  userSlice.actions;
export default userSlice.reducer;
