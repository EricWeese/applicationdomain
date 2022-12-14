import { addDoc, collection } from "firebase/firestore";
import { db } from '../../firebase/config'
import { useState } from "react";

import './Signup.css'

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [DOB, setDOB] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        await addDoc(collection(db, 'users'), {
            firstName: firstName,
            lastName: lastName,
            DOB: DOB,
            email: email,
            password: password
        })
    }

    return (
    <body>
        <div id="content_container">
            <div id="form_container">
                <div id="form_header_container">
                    <h2 id="form_header">Signup</h2>
                </div>

                <div id="form_content_container">
                    <div id="form_content_inner_container">
                        <input 
                        required 
                        type="firstName" 
                        id="first_name" 
                        placeholder="First name"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        />
                        <input type="lastName" 
                        id="last_name" 
                        placeholder="Last name"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        />
                        <input 
                        type="date" 
                        id="birthday" 
                        placeholder="Date of Birth" 
                        title="Date of Birth"
                        onChange={(e) => setDOB(e.target.value)}
                        value={DOB}
                        />
                        <input 
                        type="email"
                        id="email" 
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        />
                        <input 
                        type="password" 
                        id="password" 
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        />
                        <input type="password" id="confirmpassword" placeholder="Confirm Password"/>
                        <button onClick={handleSubmit}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    </body>
    )
}