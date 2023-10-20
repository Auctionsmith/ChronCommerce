import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  LoggedIn: true,
  openBids: [],
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
