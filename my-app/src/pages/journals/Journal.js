import './Journal.css'

export default function ManageUsers() {
    // const [username, getUserName] = useState('')
    // const [password, getPassword] = useState('')

    // const handleSubmit = async (e) => {
    //     auth.signInWithEmailAndPassword(username, password)
    //         .then(function () {
    //             // Declare user variable
    //             var user = auth.currentUser

    //             // Add this user to Firebase Database
    //             var database_ref = database.ref()

    //             // Create User data
    //             var user_data = {
    //                 last_login: Date.now()
    //             }

    //             // Push to Firebase Database
    //             database_ref.child('users/' + user.uid).update(user_data)

    //             // Done
    //             alert('User Logged In!!')
    //             window.location = "./UserSplash.html";

    //         })
    //         .catch(function (error) {
    //             var loginAttempts = 3;
    //             loginAttempts--;


    //             // Firebase will use this to alert of its errors
    //             var error_code = error.code
    //             var error_message = error.message

    //             alert(error_message)
    //         })
    // }

    return (
        <div>
            <div id="journalHead">
                <div>
                    LOGO
                </div>
                <div id="headerText">
                    Journal
                </div>
                <div id="nameDisplay">
                    <div id="pad">
                        CGeorge0922
                    </div>
                    <div>
                        PIC
                    </div>
                </div>
            </div>
        </div>
    )
}