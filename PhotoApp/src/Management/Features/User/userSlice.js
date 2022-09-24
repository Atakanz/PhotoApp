import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: [],
  profilePhoto: null,
  userPosts: [],
  allUsers: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    updateUser: (state, action) => {
      state.user =  {...state.user, ...action.payload};
    },
    logOut: (state, action) => {
      state.user = action.payload;
    },
    logIn: (state, action) => {
      state.user = action.payload;
      AsyncStorage.setItem('savedUser', JSON.stringify(action.payload))
    },
    setProfilePhoto: (state, action) => {
      state.profilePhoto = action.payload;
      // firebase.firestore().collection('users')
		  // .doc(firebase.auth().currentUser.uid)
		  // .update({image: action.payload});
  },
    setUserPosts: (state, action) => {
      state.userPosts = [...state.userPosts, action.payload];
  },
}});

export const {setUser, logIn, logOut, setProfilePhoto, setLocation,setUserPosts, updateUser, setAllUsers} = userSlice.actions;

export default userSlice.reducer;