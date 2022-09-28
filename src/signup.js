// Your web app's Firebase configuration
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
function rundb() {
    // Initialize Firebase


    // node refrence
    var userID = "userID"
    var firebaseRef = firebase.database()

    // data to store
    var data = {
        username: "wadiemendja",
        password: "UserPassword"
    }

    // store data in a node with a random unique key
    firebaseRef.ref('users/')
    firebaseRef.push(data)
    /*
    root
      |____ users
              |____-MCadGHUbDSEjwx_Ma
                           |_________ username:"wadiemendja"
                           |_________ password:"UserPassword"
    */

    // store data in a node with a given key
    firebaseRef.ref('users/' + userID)
    firebaseRef.set(data)
    /*
    root
      |____ users
              |____userID
                      |___ username:"wadiemendja"
                      |___ password:"UserPassword"
                           
    */

    // update data
    var newData = {
        username: "anotherUsername",
        password: "anotherPassword"
    }
    var firebaseRef = firebase.database().ref('users/' + userID)
    firebaseRef.update(newData)

    // remove data
    var firebaseRef = firebase.database().ref('users/' + userID)
    firebaseRef.remove()

    // Read data
    // visit this repo: https://github.com/wadiemendja/retrieve-data-firebase-login-example
}