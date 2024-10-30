import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "./cartSlice";

interface Favourite {
  items: CartItem[];
}

const initialState: Favourite = {
  items: [],
};

const FavouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    addToFav(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        console.log("Item already exists");
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItemFromFav(state, action: PayloadAction<{ id: number }>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addToFav, removeItemFromFav } = FavouriteSlice.actions;
export default FavouriteSlice.reducer;
