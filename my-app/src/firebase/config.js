import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBQ9fnV3v6hv7rc3QQa4B1wGn55RXDOpS8",
    authDomain: "applicationdomain-9e9fc.firebaseapp.com",
    //databaseURL: "https://applicationdomain-9e9fc-default-rtdb.firebaseio.com",
    projectId: "applicationdomain-9e9fc",
    storageBucket: "applicationdomain-9e9fc.appspot.com",
    messagingSenderId: "51150827521",
    appId: "1:51150827521:web:1758f5ef478c73f5a39000",
    measurementId: "G-W92Z7MX5WP"
};

// init firebase
const app = initializeApp(firebaseConfig)

// init firestore
const db = getFirestore(app)

// init storage
const storage = getStorage(app)

// init firebase auth
const auth = getAuth(app)

export { auth, db, app, storage }