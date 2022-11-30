import * as React from 'react';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import AddAccount from './AddAccount';
import NavBar from '../../components/navbar/Navbar';
import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, Firestore, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/config'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const usdPrice = {
    type: 'number',
    width: 130,
    valueFormatter: ({ value }) => currencyFormatter.format(value),
    cellClassName: 'font-tabular-nums',
};


const columns = [
    { field: 'id', headerName: 'Account Number', width: 120 },
    {
        field: 'accountName',
        headerName: 'Account Name',
        width: 250,
        editable: true,
        renderCell: (params) =>
            <Link to={`/${params.row.accountName}`}>{params.row.accountName}</Link>,
    },
    {
        field: 'category',
        headerName: 'Category',
        width: 150,
        editable: true,
    },
    {
        field: 'balance',
        ...usdPrice,
        headerName: 'Balance',
        type: 'number',
        width: 110,
        editable: true,
        //valueFormatter: ({ value }) => value.toLocalString(undefined, { maximumFractionDigits: 2 }),
    },
    {
        field: 'dateCreated',
        headerName: 'Date Created',
        sortable: true,
        width: 160,
    },
    {
        field: 'statement',
        headerName: 'Statement',
        sortable: true,
        width: 160,
    },

];

export var newRows = [];

export default function Accounts() {
    const navigate = useNavigate();
    const [updatedRows, setRows] = useState([]);
    const accountsRef = collection(db, "accounts");
    const getData = async () => {
        try {
            const data = await getDocs(accountsRef);
            setRows(data.docs.map((doc) => ({ ...doc.data() })))
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    const deleteAccount = async () => {
        if (selectedRows[0].balance > 0) {
            alert("Cannot Deactivate Account because it has a balance greater than 0")
        } else {
            try {
                await deleteDoc(doc(db, "accounts", selectedRows[0].accountName));
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
                    notes: userNameAdmin + " has deleted account: " + selectedRows[0].accountName,
                })
                alert("Account Deleted");
            } catch (e) {
                console.log(e);
            }
        }
    }

    const onRowsSelectionHandler = (ids) => {
        try {
            setSelectedRows(ids.map((id) => updatedRows.find((row) => row.id === id)));
        } catch (e) {
            console.log(e);
        }
    };
    //newRows = selectedRows
    const [selectedRows, setSelectedRows] = useState([])
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Click this to add a new account
        </Tooltip>
    );
    const changePage = () => {
        navigate('/JournalEntries');
    }
    const [sortModel, setSortModel] = React.useState([
        {
            field: 'id',
            sort: 'asc',
        },
    ]);
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
        <div>
            <NavBar />

            <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Accounts</h1>
            <Button onClick={getData}>Refresh</Button>
            <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={updatedRows}
                    columns={columns}
                    pageSize={8}
                    rowsPerPageOptions={[8]}
                    disableSelectionOnClick
                    checkboxSelection
                    disableMultipleSelection={true}
                    experimentalFeatures={{ newEditingApi: true }}
                    sortModel={sortModel}
                    onSortModelChange={(model) => setSortModel(model)}
                    onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                />
            </Box>

            <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
            >
                <Button onClick={handleShow} variant="outline-primary">Add New Account</Button>
            </OverlayTrigger>
            <Button onClick={deleteAccount} variant="outline-primary">Delete Account</Button>
            <Button onClick={changePage} variant="outline-primary">View Journal Entries</Button>

            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>
                        Add New Account
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <AddAccount />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </div >
    );
}
