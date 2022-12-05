import * as React from 'react';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import AccountantNavBar from '../../components/navbar/AccountantNavbar';
import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, Firestore, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/config'
import Notifications from './Notifications'
import { connectStorageEmulator } from 'firebase/storage';

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
        field: 'debit',
        ...usdPrice,
        headerName: 'Debit',
        width: 110,
        editable: false,
    },
    {
        field: 'credit',
        ...usdPrice,
        headerName: 'Credit',
        type: 'number',
        width: 110,
        editable: false,
        //valueFormatter: ({ value }) => value.toLocalString(undefined, { maximumFractionDigits: 2 }),
    },
];

export var newRows = [];

export default function Accounts() {
    const navigate = useNavigate();
    const [updatedRows, setRows] = useState([]);
    const accountsRef = collection(db, "accounts");
    const accountsSummaryRef = collection(db, "accountsSummary");
    const getData = async () => {
        try {
            const data = await getDocs(accountsRef);
            var tempRows = data.docs.map(doc => doc.data())
            var debitBal = 0;
            var creditBal = 0;
            for (const account of tempRows) {
                var category = account.category;
                if (category == "Assets" || category == "Expenses") {
                    debitBal += account.balance;
                    await setDoc(doc(db, "accountsSummary", account.accountName), {
                        id: account.id,
                        accountName: account.accountName,
                        debit: account.balance,
                        credit: 0,
                    })

                } else {
                    creditBal += account.balance;
                    await setDoc(doc(db, "accountsSummary", account.accountName), {
                        id: account.id,
                        accountName: account.accountName,
                        debit: 0,
                        credit: account.balance,
                    })

                }
            }
            await setDoc(doc(db, "accountsSummary", "Total"), {
                id: 9999,
                accountName: "Total",
                debit: debitBal,
                credit: creditBal,
            })
            const dataNew = await getDocs(accountsSummaryRef);
            setRows(dataNew.docs.map((doc) => ({ ...doc.data() })))
        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        getData();
    }, [])


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

    const [sortModel, setSortModel] = React.useState([
        {
            field: 'id',
            sort: 'asc',
        },
    ]);
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
            <AccountantNavBar />

            <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Summary</h1>
            <Box sx={{ height: 800, width: '100%' }}>
                <DataGrid
                    rows={updatedRows}
                    columns={columns}
                    pageSize={20}
                    rowHeight={38}
                    rowsPerPageOptions={[20]}
                    disableSelectionOnClick
                    disableMultipleSelection={true}
                    experimentalFeatures={{ newEditingApi: true }}
                    sortModel={sortModel}
                    onSortModelChange={(model) => setSortModel(model)}
                    onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                />
            </Box>

            {/* <Button onClick={handleShow} variant="outline-primary">View Notifications</Button> */}

            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>
                        Notifications
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

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
