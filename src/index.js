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

	if (validate_password(password) == false) {
		return
	}
	if (passwordMatch(password, confirmpassword) == false) {
		return
	}


	// Move on with Auth
	auth.createUserWithEmailAndPassword(email, password)
		.then(async function () {
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
