import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import auctionItemReducer from "./slices/auctionItemsSlice";
import userReducer from "./slices/userSlice"

// Right now cart does nothing
export const store = configureStore({
    reducer : {
        cart : cartReducer,
        auctionItems : auctionItemReducer,
        user: userReducer
    }
});