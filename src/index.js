import './styles.css';
import {
  hideLoginError,
  showLoginState,
  showLoginForm,
  showApp,
  showLoginError,
  btnLogin,
  btnSignup,
  btnLogout
} from './ui'

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator
} from 'firebase/auth';

const firebaseApp = initializeApp({
  authDomain: "dummy-authDomain.firebaseapp.com",
  projectId: "dummy-project-id",
  storageBucket: "dummy-authDomain.firebaseapp.com",
  apiKey: "AIzaSyBQ9fnV3v6hv7rc3QQa4B1wGn55RXDOpS8",
  messagingSenderId: "51150827521",
  appId: "1:51150827521:web:1758f5ef478c73f5a39000",
  measurementId: "G-W92Z7MX5WP"
});
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
