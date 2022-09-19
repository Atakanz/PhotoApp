import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state, action) => {
      state.user = action.payload;
      AsyncStorage.removeItem('savedUser');
      
    },
    logIn: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {setUser, logIn, logOut} = userSlice.actions;

export default userSlice.reducer;