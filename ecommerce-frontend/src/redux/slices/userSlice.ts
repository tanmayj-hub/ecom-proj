// src/redux/slices/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    userInfo: null,
  },
  reducers: {
    loginUser(state, action) {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userInfo = null;
    },
  },
});

export const { loginUser, logout } = userSlice.actions; // ✅ clearly correct
export default userSlice.reducer;
