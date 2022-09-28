/*
npx webpack
firebase serve --onlyhosting
firebase emulators:start --only auth

git:
git add .
git commit -m [message]
git push origin main
*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

submitRegister.addEventListener('click',(e) => {

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
