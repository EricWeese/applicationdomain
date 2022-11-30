import * as React from 'react';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from 'react-bootstrap/Button';
import NavBar from '../../components/navbar/AccountantNavbar';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/config'

export var creditId;
export var debitId;

export default function JournalEntries() {
    const journalEntriesRef = collection(db, "pendingJournalEntries");
    const [updatedRows, setRows] = useState([]);
    const navigate = useNavigate()
    const [selectedRows, setSelectedRows] = useState([])
    var userName = "";
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

    const getData = async () => {
        try {
            const data = await getDocs(journalEntriesRef);
            setRows(data.docs.map((doc) => ({ ...doc.data() })))
            const userRef = doc(db, "helperData", "currentUser");
            const userSnap = (await getDoc(userRef)).data();
            userName = userSnap.username;
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
            notes: userName + " has accepted journal entry " + journalCounterNew,
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

    const viewJournalEntries = () => {
        navigate('/JournalEntriesAccountants')
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
        </div>
    )
}