
/*
npx webpack
firebase serve --onlyhosting
firebase emulators:start --only auth

git:
git add .
git commit -m [message]
git push origin main
*/


import { db } from "./firebase/config.js"
import { addDoc, collection } from "firebase/firestore"
export { db, addDoc }

function register() {
	email = document.getElementById('email').value
	password = document.getElementById('password').value
	confirmpassword = document.getElementById('confirmpassword').value
	first_name = document.getElementById('first_name').value

	// Validate input fields
	if (validate_email(email) == false) {
		alert('Email is in wrong format')
		return
	}
	console.log("sdfgsdfg");
	/*if (validate_password(password) == false) {
		return
	}
	if (passwordMatch(password, confirmpassword) == false) {
		return
	}*/


	// Move on with Auth
	auth.createUserWithEmailAndPassword(email, password)
		.then(async function () {

			var user = auth.currentUser
			var database_ref = database.ref()
			var user_data = {
				email: email,
				first_name: first_name,
				last_login: Date.now()
			}
			//database.addDoc(user_data)
			//database_ref.push(email);
			//database_ref.child('users/' + user.uid).set(user_data)


			try {
				await addDoc(collection(db, "Users"), {

					first: "Alan",
					middle: "Mathison",
					last: "Turing",
					born: 1912
				});

				console.log("Document written with ID: ", docRef.id);
			} catch (e) {
				console.error("Error adding document: ", e);
			}

			alert('User Created!');
			window.location = "./index.html";

		})
		.catch(function (error) {
			// Firebase will use this to alert of its errors
			var error_code = error.code
			var error_message = error.message

			alert(error_message)
		})
}

// Set up our login function

function login() {
	// Get all our input fields
	email = document.getElementById('email').value
	password = document.getElementById('password').value

	// Validate input fields
	if (validate_email(email) == false) {
		alert('Email is in wrong format')
	}


	auth.signInWithEmailAndPassword(email, password)
		.then(function () {
			// Declare user variable
			var user = auth.currentUser

			// Add this user to Firebase Database
			var database_ref = database.ref()

			// Create User data
			var user_data = {
				last_login: Date.now()
			}

			// Push to Firebase Database
			database_ref.child('users/' + user.uid).update(user_data)

			// DOne
			alert('User Logged In!!')
			window.location = "./UserSplash.html";

		})
		.catch(function (error) {

			loginAttempts--;


			// Firebase will use this to alert of its errors
			var error_code = error.code
			var error_message = error.message

			alert(error_message)
		})
}

// Validate Functions
function validate_email(email) {
	expression = /^[^@]+@\w+(\.\w+)+\w$/
	if (expression.test(email) == true) {
		// Email is good
		return true
	} else {
		// Email is not good
		return false
	}
}

function validate_password(password) {
	errors = [];
	// Firebase only accepts lengths greater than 6
	if (password.length <= 7) {
		errors.push("Your password must be at least 8 characters");
	}
	if (password.search(/[a-z]/i) < 0) {
		errors.push("Your password must contain at least one letter.");
	}
	if (password.search(/[0-9]/) < 0) {
		errors.push("Your password must contain at least one digit.");
	}
	if (password.search(/[!@#$%^&*]/) < 0) {
		errors.push("Your password must contain a special character.")
	}
	if (errors.length > 0) {
		alert(errors.join("\n"));
		return false;
	}
	return true;
}
function passwordMatch(password, confirmpassword) {
	if (password != confirmpassword) {
		alert("Passwords did not match");
		return false
	} else {
		return true;
	}

}



function validate_field(field) {
	if (field == null) {
		return false
	}

	if (field.length <= 0) {
		return false
	} else {
		return true
	}
}

