import { contains } from "@firebase/util";

function passwordCheck() {
    var password = document.getElementById('pswd').value
        errors = [];
    if (password.length <= 8) {
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

function passwordMatch() {
    var password1 = document.getElementById('pswd').value
    var password2 = document.getElementById('pswd2').value
    if(password1 != password2){
        alert("Passwords did not match");
    } else {
        alert("Pasword created successfully.");
    }
}

function loginAttempts() {
    var attempts = 3
    var username = document.getElementById('username').value
    var password = document.getElementById('pswd').value

    if( username == 'John' && password == '123') {
        alert('success');
    } else {
        attempts--
        alert("You have "+attempts+" attempts left");
        if(attempts == 0){
            alert("You are blocked");
        }
    }
}