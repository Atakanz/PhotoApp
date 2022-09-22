import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '../../../../config';

const initialState = {
  user: [],
  profilePhoto: null,
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
      firebase.auth().signOut();
    },
    logIn: (state, action) => {
      state.user = action.payload;
    },
    setProfilePhoto: (state, action) => {
      state.profilePhoto = action.payload;
      firebase.firestore().collection('users')
		  .doc(firebase.auth().currentUser.uid)
		  .update({image: action.payload});
  },
}});

export const {setUser, logIn, logOut, setProfilePhoto} = userSlice.actions;

export default userSlice.reducer;