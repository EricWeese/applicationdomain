import { useState } from "react"
import Title from '../../components/Title'
import LoginButton from "../../components/LoginButton"
import SignupButton from "../../components/SignupButton"
import './Login.css'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [DOB, setDOB] = useState('')
    const navitage = useNavigate()
    const handleSubmit = async (e) => {

        e.preventDefault()
        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then(async function () {
                    alert('User Created!');
                    navitage("Login")

                })
                .catch(function (error) {
                    // Firebase will use this to alert of its errors
                    var error_code = error.code
                    var error_message = error.message

                    alert(error_message)
                })
        }
        catch (error) {
            console.log(error)
        }
        await addDoc(collection(db, 'users'), {
            firstName: firstName,
            lastName: lastName,
            DOB: DOB,
            email: email,
            password: password
        })
    }

    return (
        <div className="">
            <Title title="Login"/>
                    <input 
                    type="email"
                    id="email" 
                    placeholder="Email"
                    onChange={(e) => setUserName(e.target.value)}
                    value={username}
                    />
                    <input 
                    type="password" 
                    id="password" 
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    />
                    <input type="password" id="confirmpassword" placeholder="Confirm Password"/>
                    <div className="button_container">
                        <LoginButton title="Login"/>
                        <SignupButton title="SignUp"/>
                    </div>
                    <a href="../reset/ForgotPassword">Forgot Password</a>
        </div>
    )
}
