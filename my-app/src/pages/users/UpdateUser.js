import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { db, } from '../../firebase/config'
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
            await updateDoc(doc(db, 'users', userId[0].id), {
                firstName: firstName,
                lastName: lastName,
                DOB: DOB.toDateString(),
                email: email,
                userName: userName,
                isActive: active,
                expiredPassword: false,
                role: role,
            })
            var dateTime = getCurrDate();
            const userRef = doc(db, "helperData", "currentUser");
            const userSnap = (await getDoc(userRef)).data();
            var userNameAdmin = userSnap.username;
            const activityRef = doc(db, "helperData", "counters");
            const activitySnap = (await getDoc(activityRef)).data();
            const activityNew = parseInt(activitySnap.activity) + 1;
            await updateDoc(activityRef, {
                activity: activityNew
            })
            await setDoc(doc(db, "activityLog", activityNew + " - Log"), {
                id: activityNew,
                date: dateTime,
                userName: userNameAdmin,
                notes: userNameAdmin + " has updated user " + userName,
            })
            alert("User Was Updated")
        }

    }
    const getCurrDate = () => {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        if (parseInt(today.getHours()) > 12) {

            var hours = (parseInt(today.getHours()));
        } else {
            var hours = today.getHours();
        }
        if (parseInt(today.getMinutes()) < 10) {
            var minutes = "0" + parseInt(today.getMinutes());
        } else {
            var minutes = today.getMinutes();
        }
        if (parseInt(today.getSeconds()) < 10) {
            var seconds = "0" + parseInt(today.getSeconds());
        } else {
            var seconds = today.getSeconds();
        }
        var time = hours + ":" + minutes + ":" + seconds;
        var dateTime = date + ' ' + time;
        return dateTime;
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-center">
                    First Name
                </Form.Label>
                <Form.Control onChange={(e) => setFirstName(e.target.value)} type="firstName" placeholder={userId[0].firstName} value={firstName} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-center">
                    Last Name
                </Form.Label>
                <Form.Control onChange={(e) => setLastName(e.target.value)} type="lastName" placeholder={userId[0].lastName} value={lastName} />
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
                    <option>Choose Role</option>
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
                    <option>Select Option</option>
                    <option value={true}>Activate</option>
                    <option value={false}>Deactivate</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-center">
                    Email address
                </Form.Label>
                <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder={userId[0].email} value={email} />
            </Form.Group>
            <div className="d-grid">
                <Button onClick={handleSubmit} variant="primary">
                    Update User
                </Button>
            </div>
        </Form>
    )
}