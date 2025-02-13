import { configureStore } from "@reduxjs/toolkit";
import callsReducer from "../../features/calls/model/callsSlice";

/**
 * Глобальный Store, который содержит в себе все состояния приложения, а так же Reducer для изменения состояний звонков.
 */
export const store = configureStore({
  reducer: {
    calls: callsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
