import { createSlice } from "@reduxjs/toolkit";
const user = JSON.parse(localStorage.getItem("user")) || {};
const initialState = {
  email: user.email || null,
  name: user.name || null,
  companyName: user.companyName || null,
  id: user.uid || null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.companyName = action.payload.companyName;
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = null;
      state.name = null;
      state.id = null;
    }
  }
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
