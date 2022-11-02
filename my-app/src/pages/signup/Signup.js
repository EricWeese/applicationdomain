import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from '../../firebase/config'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import DatePicker from "react-date-picker";
import './Signup.css'
import { validate_email, validate_password, password_match } from "../../functions"

export default function Signup() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [conPassword, setConPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [DOB, setDOB] = useState(new Date())
    const navigate = useNavigate()
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
                        alert('User Created!');
                        navigate('/Login');

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
        await addDoc(collection(db, 'users'), {
            firstName: firstName,
            lastName: lastName,
            DOB: DOB,
            email: email,
            password: password,
            userName: firstName.charAt(0) + lastName + (DOB.getMonth() + 1) + DOB.getFullYear(),
            isActive: true,
            expiredPassword: false,
            createdAt: serverTimestamp(),
        })
    }

    return (
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-primary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase ">EZ Books</h2>
                                    <p className=" mb-5">Please enter your login and password!</p>
                                    <div className="mb-3">
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
                                                    Sign Up
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Already have an account?{" "}
                                                <Link to="/Login" className="text-primary fw-bold">
                                                    Login
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
