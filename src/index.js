/*
npx webpack
firebase serve --onlyhosting
firebase emulators:start --only auth

git:
git add .
git commit -m [message]
git push origin main
*/

//import { getFirestore } from "firebase/firestore";
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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const database = firebase.database()
const db = firebase.getFirestore();
//const database = getDatabase();

function register() {

	email = document.getElementById('email').value
	password = document.getElementById('password').value
	first_name = document.getElementById('first_name').value

	// Validate input fields
	if (validate_email(email) == false) {
		alert('Email is incorrect')
		return
	}
	if (validate_password(password) == false) {
		alert('Password is incorrect')
		return
	}
	if (validate_field(first_name) == false) {
		alert('One or More Extra Fields is incorrect')
		return
	}

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

			database_ref.child('users/' + user.uid).set(user_data)
			/*
						try {
							const docRef = await addDoc(collection(db, "Users"), {
								first: "Alan",
								middle: "Mathison",
								last: "Turing",
								born: 1912
							});
			
							console.log("Document written with ID: ", docRef.id);
						} catch (e) {
							console.error("Error adding document: ", e);
						}
			
			
*/


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
	if (validate_email(email) == false || validate_password(password) == false) {
		alert('Email or Password is Outta Line!!')
		return
		// Don't continue running the code
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
			window.location = "./Menu.html";

		})
		.catch(function (error) {
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
	// Firebase only accepts lengths greater than 6
	if (password < 6) {
		return false
	} else {
		return true
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
/*// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQ9fnV3v6hv7rc3QQa4B1wGn55RXDOpS8",
  authDomain: "applicationdomain-9e9fc.firebaseapp.com",
  databaseURL: "https://applicationdomain-9e9fc-default-rtdb.firebaseio.com",
  projectId: "applicationdomain-9e9fc",
  storageBucket: "applicationdomain-9e9fc.appspot.com",
  messagingSenderId: "51150827521",
  appId: "1:51150827521:web:1758f5ef478c73f5a39000",
  measurementId: "G-W92Z7MX5WP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);


submitRegister1.addEventListener('click',(e) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
	.then((userCredential) => {
	  console.print(email);
	console.print(password);
	  const user = userCredential.user;
	  //window.location = "https://www.tutorialspoint.com";
	  alert("Created User");
	})
	.catch((error) => {
	  const errorCode = error.code;
	  const errorMessage = error.message;
	  console.prin("ssfgsdfg");
	  alert(errorMessage);
	});

});

/*

import './styles.css';
import {
  hideLoginError,
  showLoginState,
  showLoginForm,
  showApp,
  showLoginError,
  btnLogin,
  btnSignup,
  btnLogout,
  txtPassword
} from './ui'

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator,
  confirmPasswordReset
} from 'firebase/auth';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBQ9fnV3v6hv7rc3QQa4B1wGn55RXDOpS8",
  authDomain: "applicationdomain-9e9fc.firebaseapp.com",
  databaseURL: "https://applicationdomain-9e9fc-default-rtdb.firebaseio.com",
  projectId: "applicationdomain-9e9fc",
  storageBucket: "applicationdomain-9e9fc.appspot.com",
  messagingSenderId: "51150827521",
  appId: "1:51150827521:web:1758f5ef478c73f5a39000",
  measurementId: "G-W92Z7MX5WP"
});

//const CryptoJS = require('crypto-js');
// const encryptWithAES = (text) => {
//   const passphrase = '123';
//   return CryptoJS.AES.encrypt(text, passphrase).toString();
// };

// const decryptWithAES = (ciphertext) => {
//   const passphrase = '123';
//   const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
//   const originalText = bytes.toString(CryptoJS.enc.Utf8);
//   return originalText;
// };

// Login using email/password
  const loginEmailPassword = async () => {
  const loginEmail = txtEmail.value
  const loginPassword = txtPassword.value

  // step 1: try doing this w/o error handling, and then add try/catch
  //await signInWithEmailAndPassword(auth, loginEmail, loginPassword)

  // step 2: add error handling
   try {
	 await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
   }
   catch(error) {
	 console.log('There was an error: ${error}')
	 showLoginError(error)
   }
}

// Create new account using email/password
const createAccount = async () => {
  const email = txtEmail.value
  const password = txtPassword.value
  try {
	await createUserWithEmailAndPassword(auth, email, password)
  }
  catch(error) {
	console.log('There was an error: ${error}')
	showLoginError(error)
  }
}

//Should reset password
const pswdReset = async() => {
  const conCode = txtConCode.value
  const newPassword = txtPassword.value

  try{
	await confirmPasswordReset(conCode, newPassword)
  }
  catch(error){
	console.log('There was an error: ${error}')
	showResetError(error)
  }
}

// Monitor auth state
const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
	if (user) {
	  console.log(user)
	  showApp()
	  showLoginState(user)

	  hideLoginError()
	  //hideLinkError()
	}
	else {
	  showLoginForm()
	  lblAuthState.innerHTML = 'You\'re not logged in.'
	}
  })
}

// Log out
const logout = async () => {
  await signOut(auth);
}

btnLogin.addEventListener("click", loginEmailPassword)
btnSignup.addEventListener("click", createAccount)
btnLogout.addEventListener("click", logout)

const auth = getAuth(firebaseApp);
connectAuthEmulator(auth, "http://localhost:9099");

monitorAuthState();
*/
