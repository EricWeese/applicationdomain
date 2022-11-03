import * as React from 'react';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from 'react-bootstrap/Button';
import { Modal, NavLink } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import AddAccount from './AddAccount';
import NavBar from '../../components/navbar/Navbar';
import { useState } from "react";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
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

const rows = [

    { id: 1000, accountName: 'Cash', category: 'Assets', balance: 10629.00, dateCreated: '10/24/2022', statement: 'Balance Sheet' },
    { id: 1010, accountName: 'Accounts Receivable', category: 'Assets', balance: 6898.00, dateCreated: '10/24/2022', statement: 'Balance Sheet' },
    { id: 1020, accountName: 'Lab Equipment', category: 'Assets', balance: 3634.00, dateCreated: '10/24/2022', statement: 'Balance Sheet' },
    { id: 1030, accountName: 'Insurance', category: 'Assets', balance: 2921.00, dateCreated: '10/24/2022', statement: 'Balance Sheet' },
    { id: 1040, accountName: 'Lab Computers', category: 'Assets', balance: 5306.00, dateCreated: '10/24/2022', statement: 'Balance Sheet' },
    { id: 1050, accountName: 'Real Estate', category: 'Assets', balance: 2042.00, dateCreated: '10/24/2022', statement: 'Balance Sheet' },
    { id: 2000, accountName: 'Accounts Payable', category: 'Liabilities', balance: 3175.00, dateCreated: '10/24/2022', statement: 'Balance Sheet' },
    { id: 2010, accountName: 'Unearned Rent', category: 'Liabilities', balance: 8356.00, dateCreated: '10/24/2022', statement: 'Balance Sheet' },
    { id: 3000, accountName: 'Doris Green, Equity', category: 'Equity', balance: 7266.00, dateCreated: '10/24/2022', statement: 'Balance Sheet' },
    { id: 3010, accountName: 'Doris Green, Withdrawals', category: 'Equity', balance: 7198.00, dateCreated: '10/24/2022', statement: 'Balance Sheet' },
    { id: 4000, accountName: 'Fees Earned', category: 'Revenues', balance: 7311.00, dateCreated: '10/24/2022', statement: 'Income Statment' },
    { id: 5000, accountName: 'Wages', category: 'Expenses', balance: 8758.00, dateCreated: '10/24/2022', statement: 'Income Statment' },
    { id: 5010, accountName: 'Rent', category: 'Expenses', balance: 5599.00, dateCreated: '10/24/2022', statement: 'Income Statment' },
    { id: 5020, accountName: 'Utilities', category: 'Expenses', balance: 6915.00, dateCreated: '10/24/2022', statement: 'Income Statment' },
    { id: 5030, accountName: 'Lab Supplies', category: 'Expenses', balance: 8927.00, dateCreated: '10/24/2022', statement: 'Income Statment' },
    { id: 5040, accountName: 'Misc.', category: 'Expenses', balance: 9554.00, dateCreated: '10/24/2022', statement: 'Income Statment' },

];




export default function Accounts() {
    const navigate = useNavigate();
    const [updatedRows, setRows] = useState([]);
    const accountsRef = collection(db, "accounts");
    const num = 0;
    // const setData = async () => {

    //     await addDoc(collection(db, 'accounts'), {
    //         id: rows[num].id,
    //         accountName: rows[num].accountName,
    //         category: rows[num].category,
    //         balance: rows[num].balance,
    //         dateCreated: rows[num].dateCreated,
    //         statement: rows[num].statement,
    //     })
    // }
    // setData();
    const getData = async () => {
        try {
            const data = await getDocs(accountsRef);
            setRows(data.docs.map((doc) => ({ ...doc.data() })))
            console.log(updatedRows[2]);
            //updatedRows.forEach
        } catch (e) {
            console.log(e);
        }
    }

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

    return (
        <div>
            <NavBar />
            <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={rows}
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
                <Button onClick={handleShow} variant="outline-primary">Add New Account</Button>
            </OverlayTrigger>
            <Button onClick={getData}>Get Datas</Button>
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
        </div>
    );
}


