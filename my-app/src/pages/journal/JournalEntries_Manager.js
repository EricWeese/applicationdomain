import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import NavBar from '../../components/navbar/ManagerNavbar';
import { useState, useEffect } from "react";
import { collection, getDocs, getDoc, updateDoc } from "firebase/firestore";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from '../../firebase/config'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import AddJournalEntry from './AddJournalEntry';


export default function JournalEntries() {
    const journalEntriesRef = collection(db, "journalEntries");
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
    const getCurrDate = () => {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var hours;
        var seconds;
        var minutes
        if (parseInt(today.getHours()) > 12) {

            hours = "0" + (parseInt(today.getHours()) - 12);
        } else {
            hours = today.getHours();
        }
        if (parseInt(today.getMinutes()) < 10) {
            minutes = "0" + parseInt(today.getMinutes());
        } else {
            minutes = today.getMinutes();
        }
        if (parseInt(today.getSeconds()) < 10) {
            seconds = "0" + parseInt(today.getSeconds());
        } else {
            seconds = today.getSeconds();
        }
        var time = hours + ":" + minutes + ":" + seconds;
        var dateTime = date + ' ' + time;
        return dateTime;
    }
    const setData = async () => {
        var today = new Date();
        var date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes();
        var dateTime = date + ' ' + time;
        //Debit Entry
        await setDoc(doc(db, "journalEntries", "debit" + rows[1].debit), {
            id: rows[1].numTransactions + ".Debit",
            date: dateTime,
            accountName: rows[1].accountName,
            debit: rows[1].debit,
            credit: 0.0,
            notes: rows[1].notes
        })
        //Credit Entry
        await setDoc(doc(db, "journalEntries", "credit" + rows[0].credit), {
            id: rows[0].numTransactions + ".Credit",
            date: dateTime,
            accountName: rows[0].accountName,
            debit: 0.0,
            credit: rows[0].credit,
            notes: rows[0].notes
        })
    }
    //setData();
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
    const deleteEntries = async () => {
        try {
            const account1Ref = doc(db, "accounts", selectedRows[0].accountName);
            const account1Snap = (await getDoc(account1Ref)).data();
            const account1Balance = parseInt(account1Snap.balance);
            const account2Ref = doc(db, "accounts", selectedRows[1].accountName);
            const account2Snap = (await getDoc(account2Ref)).data();
            const account2Balance = parseInt(account2Snap.balance);

            await updateDoc(doc(db, 'accounts', selectedRows[0].accountName), {
                balance: account1Balance - parseInt(selectedRows[0].credit) - parseInt(selectedRows[0].debit)
            })
            await updateDoc(doc(db, 'accounts', selectedRows[1].accountName), {
                balance: account2Balance - parseInt(selectedRows[1].credit) - parseInt(selectedRows[1].debit)
            })
            await deleteDoc(doc(db, "journalEntries", selectedRows[0].id));
            await deleteDoc(doc(db, "journalEntries", selectedRows[1].id));
            const userRef = doc(db, "helperData", "currentUser");
            const userSnap = (await getDoc(userRef)).data();
            var userName = userSnap.username;
            var dateTime = getCurrDate();
            const activityRef = doc(db, "helperData", "counters");
            const activitySnap = (await getDoc(activityRef)).data();
            const activityNew = parseInt(activitySnap.activity) + 1;
            await updateDoc(activityRef, {
                activity: activityNew
            })
            await setDoc(doc(db, "activityLog", activityNew + " - Log"), {
                id: activityNew,
                date: dateTime,
                userName: userName,
                notes: userName + " has deleted journal entry " + selectedRows[0].id + " and " + selectedRows[1].id,
            })
            alert("Entries Deleted");
            //Adds to all journal entries
            dateTime = getCurrDate();
            const allJournalCounterRef = doc(db, "helperData", "counters");
            const allJournalCounterSnap = (await getDoc(allJournalCounterRef)).data();
            const allJournalCounterNew = parseInt(allJournalCounterSnap.allJournal) + 1;
            await updateDoc(allJournalCounterRef, {
                counter: allJournalCounterNew
            })

            await setDoc(doc(db, "allJournalEntries", allJournalCounterNew + " - Credit"), {
                id: allJournalCounterNew + " - Credit",
                date: dateTime,
                accountName: selectedRows[0].accountName,
                debit: 0.0,
                credit: selectedRows[0].credit,
                notes: selectedRows[0].notes,
                type: "Deleted"
            })
            await setDoc(doc(db, "allJournalEntries", allJournalCounterNew + " - Debit"), {
                id: allJournalCounterNew + " - Debit",
                date: dateTime,
                accountName: selectedRows[1].accountName,
                debit: selectedRows[1].debit,
                credit: 0.0,
                notes: selectedRows[1].notes,
                type: "Deleted"
            })
            getData();

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
    const viewPending = () => {
        navigate('/PendingJournalEntriesManagers')
    }
    const viewAll = () => {
        navigate('/AllJournalEntries')
    }
    const onRowsSelectionHandler = (ids) => {
        try {
            setSelectedRows(ids.map((id) => updatedRows.find((row) => row.id === id)));
        } catch (e) {
            console.log(e);
        }
    };
    const [sortModel, setSortModel] = React.useState([
        {
            field: 'date',
            sort: 'desc',
        },
    ]);
    return (
        <div>
            <NavBar />
            <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Journal Entries</h1>
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

            <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
            >
                <Button onClick={handleShow} variant="outline-primary">Add New Journal Entry</Button>
            </OverlayTrigger>
            <Button onClick={deleteEntries} variant="outline-primary">Delete Journal Entries</Button>
            <Button onClick={viewPending} variant="outline-primary">View Pending Journal Entries</Button>
            <Button onClick={viewAll} variant="primary">View All Journal Entries</Button>
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