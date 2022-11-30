import * as React from 'react';
import { Link, Navigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from 'react-bootstrap/Button';
import { Modal, NavLink } from 'react-bootstrap';
import NavBar from '../../components/navbar/AccountantNavbar';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Tabs from '@mui/material/Tabs';
import { addDoc, collection, getDocs, deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/config'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


export default function JournalEntries() {
    const activityRef = collection(db, "activityLog");
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
            headerName: 'ID',
            width: 120,
            editable: false,
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 250,
            editable: false,
        },
        {
            field: 'userName',
            headerName: 'User',
            width: 250,
            editable: false,
        },
        {
            field: 'notes',
            headerName: 'Notes',
            width: 800,
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
            const data = await getDocs(activityRef);
            setRows(data.docs.map((doc) => ({ ...doc.data() })))
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getData();
    }, [])



    const [sortModel, setSortModel] = React.useState([
        {
            field: 'date',
            sort: 'desc',
        },
    ]);

    return (
        <div>
            <NavBar />
            <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Activity Log</h1>
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
        </div>
    )
}

