// JavaScript source code
import { collection, addDoc, updateDoc, getDoc, doc, serverTimestamp, query, where, orderBy } from "firebase/firestore";
import { txtPassword, txtFirstName, txtLastName, txtDOB, txtAddress, txtCity, txtState, txtRole } from "src/constants.js";

const userRef = doc(db, "users", "firstname", "lastname", "DOB", "address", "city", "state", "active", "isDelted", "password")

try {
    const docRef = await addDoc(collection(db, "users"), {
        firstName: txtFirstName,
        lastName: txtLastName,
        DOB: txtDOB,
        address: txtAddress,
        city: txtCity,
        state: txtState,
        active: true,
        isDeleted: false,
        password: txtPassword,
        role: txtRole,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    });
    console.log("Document written with ID: ", docRef.id);
} catch (e) {
    console.error("Error adding document: ", e);
}

try {
    const getUsers = query(userRef, where("active", "==", true), orderBy("lastName"));
    console.log("Failed to fetch users from db", getUsers.id);
} catch (e){
    console.log("Error getting document", e)
}

try {
    await updateDoc(userRef, {
        firstName: txtFirstName,
        lastName: txtLastName,
        DOB: txtDOB,
        address: txtAddress,
        city: txtCity,
        state: txtState,
        active: true,
        isDeleted: false,
        password: txtPassword,
        updatedAt: serverTimestamp()
    });
    console.log("Document updated with ID: ", docRef.id);
} catch (e) {
    console.error("Error updating document: ", e);
}