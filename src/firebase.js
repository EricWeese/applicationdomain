// import functions from sdk
import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, addDoc, 
    getDocs, doc, deleteDoc 
} from "firebase/firestore";

// web apps firebase config
var firebaseConfig = {
	apiKey: "AIzaSyBQ9fnV3v6hv7rc3QQa4B1wGn55RXDOpS8",
	authDomain: "applicationdomain-9e9fc.firebaseapp.com",
	databaseURL: "https://applicationdomain-9e9fc-default-rtdb.firebaseio.com",
	projectId: "applicationdomain-9e9fc",
	storageBucket: "applicationdomain-9e9fc.appspot.com",
	messagingSenderId: "51150827521",
	appId: "1:51150827521:web:1758f5ef478c73f5a39000",
	measurementId: "G-W92Z7MX5WP"
};

// initialize Firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

//collection ref
const colRef = collection(db, 'Users')

//get collection data
getDocs(colRef)
    .then((snapshot) => {
        let users = []
        snapshot.docs.forEach((doc) => {
            users.push({ ...doc.data(), id: doc.id})
        })
        console.log(users)
    })
    .catch(err => {
        console.log(err.message)
    })

const addUserForm = document.querySelector('.user')
addUserForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        firstName: addUserForm.firstName.value,
        lastName: addUserForm.lastName.value,
        DOB: addUserForm.DOB.value,
        address: addUserForm.address.value,
        city: addUserForm.city.value,
        state: addUserForm.state.value,
        active: true,
        isDeleted: false,
        password: addUserForm.password.value,
        role: addUserForm.role.value,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    })
    .then(() => {
        addUserForm.reset()
    })
})