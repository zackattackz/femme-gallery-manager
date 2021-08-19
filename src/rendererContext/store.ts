import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import galleryActionsReducer from './features/galleryActions/galleryActionsSlice';

export const store = configureStore({
  reducer: {
    galleryActions: galleryActionsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
