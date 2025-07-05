import { configureStore } from '@reduxjs/toolkit';
import { apiEndPoints } from './apiEndPoints';

export const store = configureStore({
  reducer: {
    [apiEndPoints.reducerPath]: apiEndPoints.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiEndPoints.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
