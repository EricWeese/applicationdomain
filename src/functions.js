import { txtPassword, txtConPassowrd, txtUserName } from "src/constants.js";

function passwordCheck() {
        errors = [];
    if (txtPassword.length <= 8) {
        errors.push("Your password must be at least 8 characters"); 
    }
    if (txtPassword.search(/[a-z]/i) < 0) {
        errors.push("Your password must contain at least one letter.");
    }
    if (txtPassword.search(/[0-9]/) < 0) {
        errors.push("Your password must contain at least one digit."); 
    }
    if (txtPassword.search(/[!@#$%^&*]/) < 0) {
        errors.push("Your password must contain a special character.")
    }
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }
    return true;
}

function passwordMatch() {
    if(txtPassword != txtConPassowrd){
        alert("Passwords did not match");
    } else {
        alert("Pasword created successfully.");
    }
}

function loginAttempts() {
    var attempts = 3
    if( txtUserName == 'John' && txtPassword == '123') {
        alert('success');
    } else {
        attempts--
        alert("You have "+attempts+" attempts left");
        if(attempts == 0){
            alert("You are blocked");
        }
    }
}