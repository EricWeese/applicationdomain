import * as React from 'react';
import { Link, Navigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from 'react-bootstrap/Button';
import { Modal, NavLink } from 'react-bootstrap';
import NavBar from '../../components/navbar/Navbar';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Tabs from '@mui/material/Tabs';
import { addDoc, collection, getDocs, deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/config'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import AddJournalEntry from './AddJournalEntry';


export default function JournalEntries() {
    const journalEntriesRef = collection(db, "pendingJournalEntries");
    const [updatedRows, setRows] = useState([]);
    const navigate = useNavigate()
    const [selectedRows, setSelectedRows] = useState([])

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
        {
            field: 'id',
            headerName: 'Transaction',
            width: 120
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 250
        },
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
            type: 'number',
            width: 250,
            editable: false,
        },
        {
            field: 'credit',
            ...usdPrice,
            headerName: 'Credit',
            type: 'number',
            width: 250,
            editable: false,
        },
        {
            field: 'notes',
            headerName: 'Notes',
            width: 500,
            editable: false,
        },
    ];

    const rows = [

        { id: 1, date: '11/2/2022', accountName: 'Cash', debit: 0, credit: 4000.00, notes: "Bought Lab Equipment for 4000" },
        { id: 2, date: '', accountName: 'Lab Equipment', debit: 4000, credit: 0, notes: "Bought Lab Equipment for 4000" },


    ];
    const submitData = () => {

    }
    /*const setData = async () => {
        await setDoc(doc(db, "", rows[num].accountName), {
            id: rows[num].id,
            accountName: rows[num].accountName,
            category: rows[num].category,
            balance: rows[num].balance,
            dateCreated: rows[num].dateCreated,
            statement: rows[num].statement,
        })
    }
    setData();*/
    const getData = async () => {
        try {
            const data = await getDocs(journalEntriesRef);
            setRows(data.docs.map((doc) => ({ ...doc.data() })))
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
    console.log(selectedRows);
    const acceptEntry = () => {
        copyData();
        updateAccounts();
        deleteEntry();
        alert("Accepted Journal Entries")
    }
    const rejectEntry = () => {
        deleteEntry();
        alert("Entries Rejected");
    }
    const copyData = async () => {
        const dateCreated = new Date();
        const creditRef = doc(db, "pendingJournalEntries", "credit" + selectedRows[0].credit);
        const creditSnap = await getDoc(creditRef);
        const debitRef = doc(db, "pendingJournalEntries", "debit" + selectedRows[1].debit);
        const debitSnap = await getDoc(debitRef);
        console.log(creditSnap.data());
        console.log(debitSnap.data());

        await setDoc(doc(db, "journalEntries", "credit" + selectedRows[0].credit), {
            id: selectedRows[0].credit + "Credit",
            dateCreated: dateCreated.toDateString(),
            accountName: selectedRows[0].accountName,
            debit: 0.0,
            credit: selectedRows[0].credit,
            notes: selectedRows[0].notes
        })
        await setDoc(doc(db, "journalEntries", "debit" + selectedRows[1].debit), {
            id: selectedRows[1].debit + "Debit",
            dateCreated: dateCreated.toDateString(),
            accountName: selectedRows[1].accountName,
            debit: selectedRows[1].debit,
            credit: 0.0,
            notes: selectedRows[1].notes
        })
    }
    const updateAccounts = async () => {
        //Get current values
        const account1Ref = doc(db, "accounts", selectedRows[0].accountName);
        const account1Snap = (await getDoc(account1Ref)).data();
        const account1Balance = parseInt(account1Snap.balance);

        const account2Ref = doc(db, "accounts", selectedRows[1].accountName);
        const account2Snap = (await getDoc(account2Ref)).data();
        const account2Balance = parseInt(account2Snap.balance);


        await updateDoc(doc(db, 'accounts', selectedRows[0].accountName), {
            balance: account1Balance + parseInt(selectedRows[0].credit) + parseInt(selectedRows[0].debit)
        })
        await updateDoc(doc(db, 'accounts', selectedRows[1].accountName), {
            balance: account2Balance + parseInt(selectedRows[1].credit) + parseInt(selectedRows[1].debit)
        })
    }
    const deleteEntry = async () => {
        try {
            await deleteDoc(doc(db, "pendingJournalEntries", "debit" + selectedRows[1].debit));
        } catch (e) {
            console.log(e);
        }
        try {
            await deleteDoc(doc(db, "pendingJournalEntries", "credit" + selectedRows[0].credit));
        } catch (e) {
            console.log(e);
        }
    }
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Click this to add a journal entry
        </Tooltip>
    );
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    const viewJournalEntries = () => {
        navigate('/JournalEntries')
    }
    return (
        <div>
            <NavBar />
            <Button onClick={getData}>Refresh</Button>
            <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={updatedRows}
                    columns={columns}
                    pageSize={8}
                    rowsPerPageOptions={[8]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                />
            </Box>

            <Button onClick={viewJournalEntries} variant="outline-primary">View All Journal Entries</Button>
            <Button onClick={acceptEntry} variant="outline-primary">Accept Journal Entry</Button>
            <Button onClick={rejectEntry} variant="outline-primary">Reject Journal Entry</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add New Journal Entry
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddJournalEntry />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

