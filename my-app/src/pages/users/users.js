import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import NavBar from '../../components/navbar/Navbar';
import Table from '../../components/table/Table';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase/config'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const columns = [
    { value: 'id', heading: 'Account Number', width: 120 },
    { value: 'firstName', heading: 'First Name' },
    { value: 'lastName', heading: 'Last Name' },
    { value: 'dateOfBirth', heading: 'Date Of Birth' },
    { value: 'role', heading: 'Role' },
    { value: 'dateCreated', heading: 'Date Created' },
    { value: 'expiredPassword', heading: 'Expired Password' },
];

export default function Accounts() {

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    const [userTable, setUserTable] = useState([])

    const fetchUsers = async (e) => {
        const data = await getDocs(collection(db, "users"));
        
        data.forEach(item => {
            setUserTable([...userTable, item.data])
            // doc.data() is never undefined for query doc snapshots
            console.log(item.id, " => ", item.data());
        });
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Click this to update the users
        </Tooltip>
    );


    return (
        <div>
            <NavBar/>
            <Table data={userTable} column={columns}/>
            <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
            >
                <Button onClick={handleShow} variant="outline-primary">Update User</Button>
            </OverlayTrigger>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update Exisiting User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    );
}