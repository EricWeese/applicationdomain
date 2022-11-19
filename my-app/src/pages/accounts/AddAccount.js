import { Form, Button } from "react-bootstrap"
import { useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, Firestore, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage"
import { db, storage } from '../../firebase/config'
import { newRows } from "./Accounts";
import { Input } from "@mui/material";

export default function AddAccount() {
    const [accountName, setAccountName] = useState('');
    const [category, setCategory] = useState('');
    const [statement, setStatementName] = useState('');
    const [id, setId] = useState('');
    const [file, setFile] = useState('');
    const ids = Array(1000, 1010, 1020, 1030, 1040, 1050, 2000, 2010, 3000, 3010, 4000, 5000, 5010, 5020, 5030, 5040);
    const handleSubmit = (e) => {
        console.log(newRows);
        e.preventDefault();
        console.log(accountName);
        console.log(category);
        console.log(statement);
        setData();
        upload();
    }
    const upload = () => {
        if (file == null)
            return;
        const storageRef = ref(storage, `files/${file.name}`)
        uploadBytes(storageRef, file).then(() => {
        })
    }

    const setData = async () => {
        console.log(id);
        if (ids.includes(id)) {
            alert("ID is already taken");
        }
        else {
            const dateCreated = new Date();
            await setDoc(doc(db, "accounts", accountName), {
                id: id,
                accountName: accountName,
                category: category,
                balance: 0,
                dateCreated: dateCreated.toDateString(),
                statement: statement,
            })
            alert("Account created")
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Account Name"
                    required
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                />
            </Form.Group>
            <br></br>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="ID"
                    required
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
            </Form.Group>
            <br></br>
            <Form.Select aria-label="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Category</option>
                <option value="Asset">Asset</option>
                <option value="Liabilities">Liabilities</option>
                <option value="Equity">Equity</option>
                <option value="Revenues">Revenues</option>
                <option value="Expenses">Expenses</option>
            </Form.Select>
            <br></br>
            <Form.Select aria-label="statement" value={statement} onChange={(e) => setStatementName(e.target.value)}>
                <option>Statement</option>
                <option value="Balance Sheet">Balance Sheet</option>
                <option value="Income Sheet">Income Sheet</option>
            </Form.Select>
            <br></br>
            <Form.Control
                type="file"
                placeholder="Upload File"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <br></br>
            <Button variant="success" type="submit" block>
                Add New Account
            </Button>
        </Form>
    )
}
