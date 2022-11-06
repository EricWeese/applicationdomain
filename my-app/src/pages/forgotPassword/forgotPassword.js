import { addDoc, collection } from "firebase/firestore";
import { db, auth } from '../../firebase/config'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";

export default function Login() {
    const [email, getEmail] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        console.log(email)
        sendPasswordResetEmail(auth, email)
            .then(function () {
                // Done
                alert('Email Sent! It will take up to 5 minutes for you to recieve it.')
                navigate('/Login');

            })
            .catch(function (error) {

                // Firebase will use this to alert of its errors
                var error_message = error.message

                alert(error_message)
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
                                    <p className=" mb-5">Please enter your email address.</p>
                                    <div className="mb-3">
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Email address
                                                </Form.Label>
                                                <Form.Control onChange={(e) => getEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
                                            </Form.Group>
                                            <div className="mt-3">
                                                <p className="mb-0  text-center">
                                                    Don't have an account?{" "}
                                                    <Link to="/" className="text-primary fw-bold">
                                                        Sign Up
                                                    </Link>
                                                </p>
                                            </div>
                                            <div className="d-grid">
                                                <Button onClick={handleSubmit} variant="primary">
                                                    Submit
                                                </Button>
                                            </div>
                                        </Form>
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