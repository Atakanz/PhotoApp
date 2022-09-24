import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDbC0jsSLUo80mmnfOTGclfGxhCoGNx8jM",
    authDomain: "photoapp-f9147.firebaseapp.com",
    projectId: "photoapp-f9147",
    storageBucket: "photoapp-f9147.appspot.com",
    messagingSenderId: "1057394188851",
    appId: "1:1057394188851:web:ccfb7c806b4c1d7b5c7946"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

