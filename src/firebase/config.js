import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
var firebaseConfig = {
    apiKey: "AIzaSyBQ9fnV3v6hv7rc3QQa4B1wGn55RXDOpS8",
    authDomain: "applicationdomain-9e9fc.firebaseapp.com",
    //databaseURL: "https://applicationdomain-9e9fc-default-rtdb.firebaseio.com",
    projectId: "applicationdomain-9e9fc",
    storageBucket: "applicationdomain-9e9fc.appspot.com",
    messagingSenderId: "51150827521",
    appId: "1:51150827521:web:1758f5ef478c73f5a39000",
    measurementId: "G-W92Z7MX5WP"
};
initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore();

export { auth, db }