import { collection, getDocs } from "firebase/firestore";
import { db, auth } from '../../firebase/config'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form, Alert } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

export var userName = []

export default function Login() {
    const [email, getEmail] = useState('')
    const [password, getPassword] = useState('')
    const [userData, setUserData] = useState([])
    const [errorMess, setErrorMess] = useState('')
    const navigate = useNavigate()
    const userRef = collection(db, "users");

    const fetchUsers = async () => {
        try {
            //const q = query(userRef, where("email", "==", email))
            //const data = await getDocs(q);
            const data = await getDocs(userRef);
            setUserData(data.docs.map((doc) => ({ ...doc.data() })))
        } catch (e) {
            setErrorMess(e);
        }
    }
    useEffect(() => {
        fetchUsers()
    }, [])

    //  9CYo!L&#g!iY
    const handleSubmit = async () => {
        fetchUsers()
        signInWithEmailAndPassword(auth, email, password)
            .then(function () {
                var userRole = "";
                // Done
                alert('User Logged In!!')
                for (var i = 0; i < userData.length; i++) {
                    if (userData[i].email === email) {
                        userRole = userData[i].role;
                        userName = userData[i]
                    }
                }
                if (userRole === "Admin") {
                    navigate('/Accounts');
                } else if (userRole === "Manager") {
                    navigate('/AccountsManager')
                } else {
                    navigate('/AccountsAccountant')
                }

            })
            .catch(function (error) {
                // Firebase will use this to alert of its errors
                setErrorMess(error.message)
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
                                                    Email address
                                                </Form.Label>
                                                <Form.Control onChange={(e) => getEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
                                                {errorMess && (
                                                    <Alert variant="danger"> {errorMess}</Alert>
                                                )}
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control onChange={(e) => getPassword(e.target.value)} value={password} type="password" placeholder="Password" />
                                                {errorMess && (
                                                    <Alert variant="danger"> {errorMess}</Alert>
                                                )}
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicCheckbox"
                                            >
                                                <p className="small">
                                                    <Link to="/forgotPassword" className="text-primary" >
                                                        Forgot password?
                                                    </Link>
                                                </p>
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button onClick={handleSubmit} variant="primary">
                                                    Login
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Don't have an account?{" "}
                                                <Link to="/" className="text-primary fw-bold">
                                                    Sign Up
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
