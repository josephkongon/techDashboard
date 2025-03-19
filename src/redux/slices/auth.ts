import { createSlice } from "@reduxjs/toolkit";
import { UsersType } from "@/types/auth.ts";

interface IState {
  authUser: UsersType | null;
}

const slice = createSlice({
  name: "auth",
  initialState: {} as IState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.authUser = payload.currentUser;
    },
    clearCurrentUser: (state, { payload }) => {
      state.authUser = null;
    },
  },
});

export default slice.reducer;

export const usersActions = slice.actions;
