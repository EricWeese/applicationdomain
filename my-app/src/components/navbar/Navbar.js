// import React from "react";
import { getAuth, signOut } from "firebase/auth";
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { userName } from '../../pages/login/Login'
export default function NavBar() {
  const navigate = useNavigate();
  const auth = getAuth();
  const logout = (e) => {
    navigate('/Login');
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((e) => {
      // An error happened.
    });
  }

  return (
    <div>
      <Navbar bg="primary" variant="dark" >
        <Container>
          <Navbar.Brand href="/"> <img src="../../assets/favicon.ico" alt="" width="30" height="24" /></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Accounts">Accounts</Nav.Link>
            <Nav.Link href="/Users">Users</Nav.Link>
            <Nav.Link href="/JournalEntries">Journal Entries</Nav.Link>
          </Nav>
        </Container>
        <Navbar.Text>
          Signed in as: <a href="/AccountInfo">{userName.userName}</a>
        </Navbar.Text>
        <Form className="d-flex">
          <Button bg="primary" onClick={logout}>Logout</Button>
        </Form>
      </Navbar>
      <br />
    </div>
  )
}