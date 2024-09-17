// store.ts

import { configureStore } from "@reduxjs/toolkit";
import { UserApi } from "@/store/apis/UsersApi";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [UserApi.reducerPath]: UserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserApi.middleware),
});

// Export hooks for using the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
