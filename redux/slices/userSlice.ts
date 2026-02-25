import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id?: string;
  name?: string;
  email?: string;
  avatar?: string;
  role?: string;
}

interface UserState {
  token?: string;
  user?: User;
}

const initialState: UserState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      return { ...state, ...action.payload };
    },
    clearUser() {
      return {};
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
