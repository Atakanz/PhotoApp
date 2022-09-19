import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDbC0jsSLUo80mmnfOTGclfGxhCoGNx8jM",
    authDomain: "photoapp-f9147.firebaseapp.com",
    projectId: "photoapp-f9147",
    storageBucket: "photoapp-f9147.appspot.com",
    messagingSenderId: "1057394188851",
    appId: "1:1057394188851:web:ccfb7c806b4c1d7b5c7946"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export {firebase};