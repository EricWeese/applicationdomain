// import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { collection, getDoc, updateDoc, doc } from "firebase/firestore";
import { db, auth } from '../../firebase/config'
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { userName } from '../../pages/login/Login'
import { useState, useEffect } from "react";
export default function NavBar() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [userName, setUserName] = useState('');
  const logout = (e) => {
    navigate('/Login');
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((e) => {
      // An error happened.
    });
  }
  useEffect(() => {
    setName();
  }, [])
  const setName = async () => {
    const userRef = doc(db, "helperData", "currentUser");
    const userSnap = (await getDoc(userRef)).data();

    setUserName(userSnap.username);
  }


  return (
    <div>
      <Navbar bg="secondary" variant="dark" >
        <Container>
          <Navbar.Brand href="/"> <img src="../../assets/favicon.ico" alt="" width="30" height="24" /></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/AccountsAccountants">Accounts</Nav.Link>
            <Nav.Link href="/JournalEntriesAccountants">Journal Entries</Nav.Link>
            <Nav.Link href="/ActivityLog">Activity Log</Nav.Link>
          </Nav>
        </Container>
        <Navbar.Text>
          Signed in as: <a href="/AccountInfo">{userName}</a>
        </Navbar.Text>
        <Form className="d-flex">
          <Button bg="primary" onClick={logout}>Logout</Button>
        </Form>
      </Navbar>
      <br />
    </div>
  )
}