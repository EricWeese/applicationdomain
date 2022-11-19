import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import NavBar from '../../components/navbar/Navbar';
// import Table from '../../components/table/Table';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase/config'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import UpdateUser from './UpdateUser'
import CreateUser from './CreateUsers'
import SendEmail from './SendEmail'

//Array of columns for the table
const columns = [
    { field: 'Id', hide: true },
    { field: 'userName', headerName: 'User Name', flex: 1 },
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'DOB', headerName: 'Date Of Birth', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
    { field: 'createdAt', headerName: 'Date Created', flex: 1 },
    { field: 'expiredPassword', headerName: 'Expired Password', flex: 1 },
    { field: 'isActive', headerName: 'isActive', flex: 1 },
];

export var userId = [];

export default function Users() {
    //Variables
    const [show, setShow] = useState(false)
    const [showTwo, setShowTwo] = useState(false)
    const [showThree, setShowThree] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    const handleCloseTwo = () => setShowTwo(false)
    const handleCloseThree = () => setShowThree(false)
    const [userTable, setUserTable] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const [download, setDownload] = useState([])

    //Fetches all the users from the database
    const fetchUsers = async (e) => {
        const data = await getDocs(collection(db, "users"))
        setUserTable(data.docs.map((doc) => ({ ...doc.data() })))
    }

    //Loads the data for the page
    useEffect(() => {
        if (!!download.length) {
            startDownload()
        }
        fetchUsers()
    }, [])

    //Gets the user's Id for the admin to update the account.
    const onRowsSelectionHandler = (ids) => {
        try {
            setSelectedRows(ids.map((id) => userTable.find((row) => row.id === id)));
        } catch (e) {
            console.log(e);
        }
    };
    userId = selectedRows

    const startDownload = async () => {
        const userCollection = collection(db, 'users')
        const data = await getDocs(userCollection)
        setDownload(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        console.log(data)
    }

    const checkUserId = () => {
        if (userId[0] == null) {
            alert("Must Select User To Update")
            setShowTwo(false)
        } else {
            setShowTwo(true)
        }
    }

    const checkEmail = () => {
        if (userId[0] == null) {
            alert("Must Select User To Send Email Too")
            setShowThree(false)
        } else if (userId[0].role === "Accountant") {
            alert("You can only send email to manager or admin")
        } else {
            setShowThree(true)
        }
    }

    // const sendEmail() {

    // }
    //Shows what the button is supposed to do
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            This Adds A New User
        </Tooltip>
    );


    return (
        <div>
            <NavBar />
            <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Users</h1>
            <Box sx={{ display: 'flex', height: 600, width: '100%' }}>
                <DataGrid
                    rows={userTable}
                    getRowId={(row) => row.id}
                    columns={columns}
                    pageSize={8}
                    rowsPerPageOptions={[8]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                />
            </Box>
            <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
            >
                <Button onClick={handleShow} variant="outline-primary">Add User</Button>
            </OverlayTrigger>
            <Button onClick={checkUserId} variant="outline-primary">Update User</Button>
            <Button onClick={checkEmail} variant="outline-primary">Send Email To User</Button>
            <Button onClick={startDownload} variant="outline-primary">Generate Report</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Enter User Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateUser />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showTwo} onHide={handleCloseTwo}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update User Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UpdateUser />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseTwo}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showThree} onHide={handleCloseThree}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Send Email
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SendEmail />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseThree}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}