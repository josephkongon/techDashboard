import { configureStore } from "@reduxjs/toolkit";

import systemUsersActions from "./slices/auth";
import uiReducer from "./slices/ui";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    systemUsers: systemUsersActions,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
