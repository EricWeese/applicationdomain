
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

var firebaseConfig = {
    apiKey: "AIzaSyBQ9fnV3v6hv7rc3QQa4B1wGn55RXDOpS8",
    authDomain: "applicationdomain-9e9fc.firebaseapp.com",
    databaseURL: "https://applicationdomain-9e9fc.firebaseio.com",
    projectId: "applicationdomain-9e9fc",
    storageBucket: "applicationdomain-9e9fc.appspot.com",
    messagingSenderId: "51150827521",
    appId: "1:51150827521:web:1758f5ef478c73f5a39000",
    measurementId: "G-W92Z7MX5WP"
};
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
//import { getDatabase, ref, set } from "firebase/database";
var userId = "andreawu"
var name = "awu"
var email = "meemail@me.com"
var imageUrl = "myinageurl"
const app = initializeApp(firebaseConfig);
function writeUserData() {
    alert("test")
    const db = getDatabase();
    const reference = ref(db, 'users/' + userID)
    set(reference, {
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}
//writeUserData("andreawu", "awu", "meemail@me.com", "myinageurl")
/*
//var firebaseRef = database.ref();
//const database = getDatabase();
function testdb() {
    alert("worked")
    set(ref(database, 'users/' + userId), {
        username: "test",
        email: "test@gmail.com"
    });

    //firebaseRef.push(document.getElementById('email').value);
}*/






/*
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBQ9fnV3v6hv7rc3QQa4B1wGn55RXDOpS8",
    authDomain: "applicationdomain-9e9fc.firebaseapp.com",
    databaseURL: "https://applicationdomain-9e9fc.firebaseio.com",
    projectId: "applicationdomain-9e9fc",
    storageBucket: "applicationdomain-9e9fc.appspot.com",
    messagingSenderId: "51150827521",
    appId: "1:51150827521:web:1758f5ef478c73f5a39000",
    measurementId: "G-W92Z7MX5WP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

import { getDatabase, ref, set } from "firebase/database";

function writeUserData(userId, name, email, imageUrl) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}*/