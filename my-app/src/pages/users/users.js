import * as React from 'react';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from 'react-bootstrap/Button';
// import { useNavigate } from "react-router-dom";
import { Modal } from 'react-bootstrap';
// import AddAccount from './AddAccount';
import { useState } from "react";
import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
import { collection, getDocs, where } from "firebase/firestore";
import { db } from '../../firebase/config'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const columns = [
    { field: 'id', headerName: 'Account Number', width: 120 },
    {
        field: 'firstName',
        headerName: 'First Name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last Name',
        width: 110,
        editable: true,
    },
    {
        field: 'dateOfBirth',
        headerName: 'Date Of Birth',
        width: 110,
        editable: true,
    },
    {
        field: 'role',
        headerName: 'Role',
        width: 110,
        editable: true,
    },
    {
        field: 'dateCreated',
        headerName: 'Date Created',
        sortable: true,
        width: 160,
    },
    {
        field: 'expiredPassword',
        headerName: 'Expired Password',
        sortable: true,
        width: 160,
    },

];

const info = [];
const rows = async (e) => {await getDocs(collection(db, "users"), where("isActive" === true));
    rows.forEach((doc) => {
        info.push(doc.data)
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    });
}


export default function Accounts() {

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    const [value, setValue] = React.useState(0);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Click this to update the users
        </Tooltip>
    );

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
        <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange} aria-label="Navigation Bar">
          <Link to="/Home" className="text-primary fw-bold"> Home </Link>
          <Link to="/Accounts" className="text-primary fw-bold"> Accounts </Link>
          <Link to="/Users" className="text-primary fw-bold"> Users </Link>
        </Tabs>
        </Box>
        
            <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={info}
                    columns={columns}
                    pageSize={8}
                    rowsPerPageOptions={[8]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }} />
            </Box>

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
                {/* <Modal.Body>
                    <AddAccount />
                </Modal.Body> */}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    );
}