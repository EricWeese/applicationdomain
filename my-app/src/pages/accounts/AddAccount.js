import { Form, Button } from "react-bootstrap"
import { useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, Firestore, setDoc, getDoc, updateDoc } from "firebase/firestore";
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
                notes: userNameAdmin + " has created a new account: " + accountName,
            })
            alert("Account created")
        }
    }
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
