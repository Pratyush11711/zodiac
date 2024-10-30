import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"
import favouriteReducer from "./favouriteSlice"
const store = configureStore({
    reducer:{
        cart:cartReducer,
        favourite:favouriteReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = ReturnType<typeof store.dispatch>
export default store