import {configureStore} from '@reduxjs/toolkit';
import themeSlice from './Features/Theme/themeSlice';
import userSlice from './Features/User/userSlice';

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    user: userSlice,
  },
});