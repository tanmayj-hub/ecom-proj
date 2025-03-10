// src/redux/slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Clearly defined CartItem type
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Clearly typed initial state
const initialState: { items: CartItem[] } = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      state.items.push(action.payload);
    },
    removeFromCart(state, action: PayloadAction<{ id: string }>) {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
