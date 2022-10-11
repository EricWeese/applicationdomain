import { useState } from "react";

import './Login.css'

export default function Login() {
    const [username, getUserName] = useState('')
    const [password, getPassword] = useState('')

    const handleSubmit = async (e) => {
        auth.signInWithEmailAndPassword(username, password)
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

			// Done
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

    return (
    <body>
        <div id="content_container">
            <div id="form_container">
                <div id="form_header_container">
                    <h2 id="form_header">Login</h2>
                </div>
                <div id="form_content_container">
                    <div id="form_content_inner_container">
                        <input 
                        type="email"
                        id="email" 
                        placeholder="Email"
                        onChange={(e) => getUserName(e.target.value)}
                        value={email}
                        />
                        <input 
                        type="password" 
                        id="password" 
                        placeholder="Password"
                        onChange={(e) => getPassword(e.target.value)}
                        value={password}
                        />
                        <input type="password" id="confirmpassword" placeholder="Confirm Password"/>
                        <button onClick={handleSubmit}>Login</button>
                        <button>Forgot Passord</button>
                    </div>
                </div>
            </div>
        </div>
    </body>
    )
}