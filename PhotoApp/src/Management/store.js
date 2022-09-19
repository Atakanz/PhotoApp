import {configureStore} from '@reduxjs/toolkit';
import themeSlice from './Features/Theme/themeSlice';

export const store = configureStore({
  reducer: {
    theme: themeSlice,
  },
});