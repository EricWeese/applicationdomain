import { collection, getDocs, updateDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from '../../firebase/config'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form, Alert } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

export var userName = ""

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
                for (var i = 0; i < userData.length; i++) {
                    if (userData[i].email === email) {
                        userRole = userData[i].role;
                        userName = userData[i].userName
                    }
                }
                writeUserName(userName);
                updateActivity(userName);

                if (userRole === "Admin") {
                    navigate('/Accounts');
                } else if (userRole === "Manager") {
                    navigate('/AccountsManagers')
                } else {
                    navigate('/AccountsAccountants')
                }
                alert('User Logged In!!')
            })
            .catch(function (error) {
                // Firebase will use this to alert of its errors
                setErrorMess(error.message)
            })

    }
    const writeUserName = async (userName) => {
        const userRef = doc(db, "helperData", "currentUser");
        await updateDoc(userRef, {
            username: userName
        })
    }
    const updateActivity = async (userName) => {
        var dateTime = getCurrDate();
        const counterRef = doc(db, "helperData", "counters");
        const counterSnap = (await getDoc(counterRef)).data();
        const activityNew = parseInt(counterSnap.activity) + 1;
        await updateDoc(counterRef, {
            activity: activityNew
        })
        await setDoc(doc(db, "activityLog", activityNew + " - Log"), {
            id: activityNew,
            date: dateTime,
            userName: userName,
            notes: userName + " has logged in"
        })
    }
    const getCurrDate = () => {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        if (parseInt(today.getHours()) < 10) {
            var hours = ("0" + parseInt(today.getHours()));
        } else {
            var hours = (parseInt(today.getHours()));
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
