import { setDoc, doc } from "firebase/firestore";
import { db, auth } from '../../firebase/config'
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-date-picker";
import { validate_email, validate_password, password_match } from "../../functions"

export default function Signup() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [conPassword, setConPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [DOB, setDOB] = useState(new Date())
    const [role, setRole] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (validate_email(email) === false) {

        }
        else if (validate_password(password) === false) {

        }
        else if (password_match(password, conPassword) === false) {

        } else if (validate_email(email) === true && validate_password(password) === true && password_match(password, conPassword) === true) {
            try {
                createUserWithEmailAndPassword(auth, email, password)
                    .then(async function () {
                        alert('User Created!')

                    })
                    .catch(function (error) {
                        // Firebase will use this to alert of its errors
                        var error_message = error.message

                        alert(error_message)
                    })
            }
            catch (error) {
                console.log(error)
            }
        }
        const userName = firstName.charAt(0) + lastName + (DOB.getMonth() + 1) + DOB.getFullYear().toString().slice(-2)
        const dateCreated = new Date();
        await setDoc(doc(db, 'users', userName), {
            id: userName,
            firstName: firstName,
            lastName: lastName,
            DOB: DOB.toDateString(),
            email: email,
            password: password,
            userName: userName,
            isActive: true,
            expiredPassword: false,
            createdAt: dateCreated.toDateString(),
            role: role,
        })
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-center">
                    First Name
                </Form.Label>
                <Form.Control onChange={(e) => setFirstName(e.target.value)} value={firstName} type="firstName" placeholder="Enter First Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-center">
                    Last Name
                </Form.Label>
                <Form.Control onChange={(e) => setLastName(e.target.value)} value={lastName} type="lastName" placeholder="Enter Last Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-center">
                    Date of Birth
                </Form.Label>
                <br></br>
                <DatePicker onChange={setDOB} value={DOB} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-center">
                    Select Role
                </Form.Label>
                <Form.Select className="text-center" onChange={(e) => setRole(e.target.value)} value={role}>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Accountant">Accountant</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-center">
                    Email address
                </Form.Label>
                <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group
                className="mb-3"
                controlId="formBasicPassword"
            >
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={(e) => setPassword(e.target.value)} value={password}
                    type="password" placeholder="Enter Password" />
            </Form.Group>
            <Form.Group
                className="mb-3"
                controlId="formBasicPassword"
            >
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={(e) => setConPassword(e.target.value)} value={conPassword}
                    type="password" placeholder="Confirm Password" />
            </Form.Group>
            <div className="d-grid">
                <Button onClick={handleSubmit} variant="primary">
                    Create user
                </Button>
            </div>
        </Form>
    )
}