import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  theme: 'Light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      return {
        theme: action.payload,
      };
    },
  },
});

export const {setTheme} = themeSlice.actions;

export default themeSlice.reducer;