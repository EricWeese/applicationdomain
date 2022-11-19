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
    const allJournalEntriesRef = collection(db, "allJournalEntries");
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
            field: 'type',
            headerName: 'Type',
            widthe: 250,
            editable: false,
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
        {
            field: 'reason',
            headerName: 'Rejection Reason',
            width: 400,
            editable: false,
        },

    ];

    const rows = [

        { id: 1, date: '11/2/2022', accountName: 'Cash', debit: 0, credit: 4000.00, notes: "Bought Lab Equipment for 4000" },
        { id: 2, date: '', accountName: 'Lab Equipment', debit: 4000, credit: 0, notes: "Bought Lab Equipment for 4000" },


    ];
    const submitData = () => {

    }

    const getData = async () => {
        try {
            const data = await getDocs(allJournalEntriesRef);
            setRows(data.docs.map((doc) => ({ ...doc.data() })))
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getData();
    }, [])





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
    const [sortModel, setSortModel] = React.useState([
        {
            field: 'date',
            sort: 'desc',
        },
    ]);

    return (
        <div>
            <NavBar />
            <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>All Journal Entries</h1>
            <Button onClick={getData}>Refresh</Button>
            <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={updatedRows}
                    columns={columns}
                    pageSize={8}
                    rowsPerPageOptions={[8]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    sortModel={sortModel}
                    onSortModelChange={(model) => setSortModel(model)}
                />
            </Box>

            <Button onClick={viewJournalEntries} variant="outline-primary">View Accepted Journal Entries</Button>
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

