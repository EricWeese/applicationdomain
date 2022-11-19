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
import RejectJournalEntry from './RejectJournalEntry';

export var creditId;
export var debitId;

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


    const acceptEntry = () => {
        copyData();
        updateAccounts();
        deleteEntry();
        alert("Accepted Journal Entries");
        getData();
    }
    const rejectEntry = async () => {
        creditId = selectedRows[0].id;
        debitId = selectedRows[1].id;
        setShowReject(true)
        getData();
    }
    const getCurrDate = () => {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        if (parseInt(today.getHours()) > 12) {

            var hours = "0" + (parseInt(today.getHours()) - 12);
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
    const copyData = async () => {
        var dateTime = getCurrDate();
        const creditRef = doc(db, "pendingJournalEntries", "credit" + selectedRows[0].credit);
        const creditSnap = await getDoc(creditRef);
        const debitRef = doc(db, "pendingJournalEntries", "debit" + selectedRows[1].debit);
        const debitSnap = await getDoc(debitRef);

        const counterRef = doc(db, "helperData", "counters");
        const counterSnap = (await getDoc(counterRef)).data();
        const journalCounterNew = parseInt(counterSnap.journal) + 1;
        const allJournalCounterNew = parseInt(counterSnap.allJournal) + 1;
        //Increment counters
        await updateDoc(counterRef, {
            journal: journalCounterNew
        })
        await updateDoc(counterRef, {
            allJournal: allJournalCounterNew,
        })

        await setDoc(doc(db, "journalEntries", journalCounterNew + " - Credit"), {
            id: journalCounterNew + " - Credit",
            date: dateTime,
            accountName: selectedRows[0].accountName,
            debit: 0.0,
            credit: selectedRows[0].credit,
            notes: selectedRows[0].notes
        })
        await setDoc(doc(db, "journalEntries", journalCounterNew + " - Debit"), {
            id: journalCounterNew + " - Debit",
            date: dateTime,
            accountName: selectedRows[1].accountName,
            debit: selectedRows[1].debit,
            credit: 0.0,
            notes: selectedRows[1].notes
        })

        await setDoc(doc(db, "allJournalEntries", allJournalCounterNew + " - Credit"), {
            id: allJournalCounterNew + " - Credit",
            date: dateTime,
            accountName: selectedRows[0].accountName,
            debit: 0.0,
            credit: selectedRows[0].credit,
            notes: selectedRows[0].notes,
            type: "Accepted"
        })
        await setDoc(doc(db, "allJournalEntries", allJournalCounterNew + " - Debit"), {
            id: allJournalCounterNew + " - Debit",
            date: dateTime,
            accountName: selectedRows[1].accountName,
            debit: selectedRows[1].debit,
            credit: 0.0,
            notes: selectedRows[1].notes,
            type: "Accepted"
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
        await deleteDoc(doc(db, "pendingJournalEntries", selectedRows[1].id));
        await deleteDoc(doc(db, "pendingJournalEntries", selectedRows[0].id));
        getData();
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Click this to add a journal entry
        </Tooltip>
    );
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const [showReject, setShowReject] = useState(false)
    const handleShowReject = () => setShowReject(true)
    const handleCloseReject = () => setShowReject(false)

    const viewJournalEntries = () => {
        navigate('/JournalEntries')
    }
    const [sortModel, setSortModel] = React.useState([
        {
            field: 'date',
            sort: 'desc',
        },
    ]);
    return (
        <div>
            <NavBar />
            <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Pending Journal Entries</h1>
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
                    sortModel={sortModel}
                    onSortModelChange={(model) => setSortModel(model)}
                    onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                />
            </Box>

            <Button onClick={viewJournalEntries} variant="outline-primary">View Accepted Journal Entries</Button>
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

            <Modal show={showReject} onHide={handleCloseReject}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Reject Journal Entry
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RejectJournalEntry />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseReject}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

