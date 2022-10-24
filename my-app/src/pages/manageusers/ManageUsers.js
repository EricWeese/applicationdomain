import { useState } from "react";
import { auth, database } from '../../firebase/config'

import './ManageUsers.css'

export default function ManageUsers() {
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
            var loginAttempts = 3;
			loginAttempts--;


			// Firebase will use this to alert of its errors
			var error_code = error.code
			var error_message = error.message

			alert(error_message)
		})
    }

    return (
        <div>
            <h1> Help</h1>
        </div>
    // <body>
    //     <div style="color:black; font-size:12px; background-color:aqua; width:100%; height:50px">
    //         <a href="Menu.html">
    //             <img src="../images/logo.png" style="width:50px; padding: 0px 20px 0px 5px" align="left" />
    //         </a>
    //         <div id="titleTable">All Users</div>
    //         <img src="../images/ProfilePic.jfif" style="width:30px; padding:10px" align="right" />
    //         <div style="font-size:12px; color:black; padding: 20px" align="right"> CGeorge0922 </div>
    //     </div>

    //     <div class="grid-container">
    //         <div id="titleTable"></div>
    //         <table class="blueTable">
    //             <thead>
    //                 <tr>
    //                     <th>Username</th>
    //                     <th>Email</th>
    //                     <th>Role</th>
    //                     <th>Date Created</th>
    //                 </tr>
    //             </thead>
    //             <tfoot>
    //                 <tr>
    //                     <td colspan="4">
    //                         <div class="links">
    //                             <a href="#">&laquo;</a> <a class="active" href="#">1</a> 
    //                             <a href="#">2</a> 
    //                             <a href="#">3</a> <a href="#">4</a> <a href="#">&raquo;</a>
    //                         </div>
    //                     </td>
    //                 </tr>
    //             </tfoot>
    //             <tbody>
    //                 <tr>
    //                     <td>CGeorge0922</td>
    //                     <td>test@gmail.com</td>
    //                     <td><select name="Role" id="role">
    //                             <option value="admin" selected>Admin</option>
    //                             <option value="manager">Manager</option>
    //                             <option value="user">Regular</option>
    //                         </select>
    //                     </td>
    //                     <td>9/23/22</td>
    //                 </tr>
    //                 <tr>
    //                     <td>YHat0922</td>
    //                     <td>manager@gmail.com</td>
    //                     <td><select name="Role" id="role">
    //                             <option value="admin">Admin</option>
    //                             <option value="manager" selected>Manager</option>
    //                             <option value="user">Regular</option>
    //                         </select></td>
    //                     <td>9/26/22</td>
    //                 </tr>
    //                 <tr>
    //                     <td>ALincoln0922</td>
    //                     <td>regular@gmail.com</td>
    //                     <td><select name="Role" id="role">
    //                             <option value="admin">Admin</option>
    //                             <option value="manager">Manager</option>
    //                             <option value="user" selected>Regular</option>
    //                         </select></td>
    //                     <td>9/28/22</td>
    //                 </tr>
    //                 <tr>
    //                     <td>EWeese0922</td>
    //                     <td>ericweese99@gmail.com</td>
    //                     <td><select name="Role" id="role">
    //                             <option value="admin">Admin</option>
    //                             <option value="manager">Manager</option>
    //                             <option value="user" selected>Regular</option>
    //                         </select></td>
    //                     <td>9/28/22</td>
    //                 </tr>

    //             </tbody>
    //         </table>
    //     </div>
    // </body>
    )
}