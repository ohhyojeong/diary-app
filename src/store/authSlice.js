import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    isAuthenticated: false
  },

  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    logoutAction(state) {
      state.user = null;
      state.isAuthenticated = false;
    }
  }
});

export const { loginSuccess, logoutAction } = authSlice.actions;
export default authSlice.reducer;