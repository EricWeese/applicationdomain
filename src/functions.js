import { txtPassword, txtConPassowrd, txtUserName, tblUserPop, tblrow, tbld } from "src/constants.js";
import { getUsers } from "./dbScripts";

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

// Going throw all the users in the db to select certain fields to populate table in webpage.
function getUserData() {
    getUsers.array.forEach(element => {
        var userName = element.val().userName;
        var role = element.val().role;
        var action = element.val().action;
        var expired = false;
        populateTable(userName, role, action, expired);
    });
}

// Populating the table with the data from the db.
function populateTable(userName, role, action, expired) {
    var tbody = tblUserPop;
    var trow = tblrow;
    var td1 = tbld;
    var td2 = tbld;
    var td3 = tbld;
    var td4 = tbld;
    td1.innerHTML = userName;
    td2.innerHTML = role;
    td3.innerHTML = action;
    td4.innerHTML = expired;
    trow.appendChild(td1); trow.appendChild(td2); trow.appendChild(td3); trow.appendChild(td4);
    tbody.appendChild(trow);
}