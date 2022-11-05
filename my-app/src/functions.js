// Validate Functions
//Validates that the email is an actual email
export function validate_email(email) {
	const expression = /^[^@]+@\w+(\.\w+)+\w$/
	if (expression.test(email) === true) {
		// Email is good
		return true
	} else {
		// Email is not good
		return false
	}
}

//Check to make sure the password is a strong password
export function validate_password(password) {
	const errors = [];
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

//Checks wether the passwords match or not
export function password_match(password, confirmpassword) {
	if (password !== confirmpassword) {
		alert("Passwords did not match");
		return false
	} else {
		return true;
	}
}

//Makes sure field is not empty
export function validate_field(field) {
	if (field == null) {
		return false
	}

	if (field.length <= 0) {
		return false
	} else {
		return true
	}
}
