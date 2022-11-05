import { doc, updateDoc } from "firebase/firestore";
import { db,} from '../../firebase/config'
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-date-picker";
import { validate_email } from "../../functions"
import { userId } from './Users'

export default function Signup() {

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [active, setActive] = useState('')
    const [DOB, setDOB] = useState(new Date())
    const [role, setRole] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validate_email(email) === false) {

        } else if (validate_email(email) === true) {
            const userName = firstName.charAt(0) + lastName + (DOB.getMonth() + 1) + DOB.getFullYear().toString().slice(-2)
            await updateDoc(doc(db, 'users', userId[0].id ), {
                firstName: firstName,
                lastName: lastName,
                DOB: DOB.toDateString(),
                email: email,
                userName: userName,
                isActive: active,
                expiredPassword: false,
                role: role,
            })
            alert("User Was Updated")
        }
        
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
                    Activate Or Deactivate
                </Form.Label>
                <Form.Select className="text-center" onChange={(e) => setActive(e.target.value)} value={active}>
                    <option value={true}>Activate</option>
                    <option value={false}>Deactivate</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-center">
                    Email address
                </Form.Label>
                <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
            </Form.Group>
            <div className="d-grid">
                <Button onClick={handleSubmit} variant="primary">
                    Update User
                </Button>
            </div>
        </Form>
    )
}