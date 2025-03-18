import { createSlice } from "@reduxjs/toolkit";
import { IAuthUser } from "@/type/auth";

interface IState {
  authUser: IAuthUser | null;
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

export const systemUsersActions = slice.actions;
