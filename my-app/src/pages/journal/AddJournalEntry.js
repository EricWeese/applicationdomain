import { Form, Button } from "react-bootstrap"
import { collection, getDocs, addDoc, deleteDoc, doc, Firestore, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from '../../firebase/config'

export default function AddJournalEntry() {
    const [debitAccount, setDebitAccount] = useState('');
    const [debitAmount, setDebitAmount] = useState('');
    const [creditAccount, setCreditAccount] = useState('');
    const [creditAmount, setCreditAmount] = useState('');
    const [notes, setNotes] = useState('');
    var numTransactions = 2
    const handleSubmit = (e) => {
        if (debitAmount == creditAmount) {
            setData();
        }
        else {
            alert("Credits and Debits are not equal")
        }
        e.preventDefault();
        console.log(debitAccount);
        console.log(debitAmount);
        console.log(creditAccount);
        console.log(creditAmount);
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

    const setData = async () => {

        var dateTime = getCurrDate();
        const counterRef = doc(db, "helperData", "counters");
        const counterSnap = (await getDoc(counterRef)).data();
        const counterNew = parseInt(counterSnap.pendingJournal) + 1;
        const allJournalCounterNew = parseInt(counterSnap.allJournal) + 1;
        //Increment counter
        await updateDoc(counterRef, {
            pendingJournal: counterNew
        })
        await updateDoc(counterRef, {
            allJournal: allJournalCounterNew
        })
        //Debit Entry
        await setDoc(doc(db, "pendingJournalEntries", counterNew + " - Debit"), {
            id: counterNew + " - Debit",
            date: dateTime,
            accountName: debitAccount,
            debit: debitAmount,
            credit: 0.0,
            notes: notes

        })
        //Credit Entry
        await setDoc(doc(db, "pendingJournalEntries", counterNew + " - Credit"), {
            id: counterNew + " - Credit",
            date: dateTime,
            accountName: creditAccount,
            debit: 0.0,
            credit: creditAmount,
            notes: notes
        })

        await setDoc(doc(db, "allJournalEntries", allJournalCounterNew + " - Debit"), {
            id: allJournalCounterNew + " - Debit",
            date: dateTime,
            accountName: debitAccount,
            debit: debitAmount,
            credit: 0.0,
            notes: notes,
            type: "Pending"
        })
        await setDoc(doc(db, "allJournalEntries", allJournalCounterNew + " - Credit"), {
            id: allJournalCounterNew + " - Credit",
            date: dateTime,
            accountName: creditAccount,
            debit: 0.0,
            credit: creditAmount,
            notes: notes,
            type: "Pending"
        })
        alert("Journal entry under review")
    }
    return (
        <Form onSubmit={handleSubmit}>
            <h3>Debit Account</h3>

            <Form.Select aria-label="category" value={debitAccount} onChange={(e) => setDebitAccount(e.target.value)}>
                <option>Select Debit Account</option>
                <option value="Cash">Cash</option>
                <option value="Accounts Receivable">Accounts Receivable</option>
                <option value="Lab Equipment">Lab Equipment</option>
                <option value="Insurance">Insurance</option>
                <option value="Lab Computers">Lab Computers</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Accounts Payable">Accounts Payable</option>
                <option value="Unearned Rent">Unearned Rent</option>
                <option value="Doris Green, Equity">Doris Green, Equity</option>
                <option value="Doris Green, Withdrawals">Doris Green, Withdrawals</option>
                <option value="Fees Earned">Fees Earned</option>
                <option value="Wages">Wages</option>
                <option value="Rent">Rent</option>
                <option value="Utilities">Utilities</option>
                <option value="Lab Supplies">Lab Supplies</option>
                <option value="Misc.">Misc.</option>
            </Form.Select>
            <br></br>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Enter Amount"
                    required
                    value={debitAmount}
                    onChange={(e) => setDebitAmount(e.target.value)}
                />
            </Form.Group>
            <br></br><br></br>
            <h3>Credit Account</h3>
            <Form.Select aria-label="category" value={creditAccount} onChange={(e) => setCreditAccount(e.target.value)}>
                <option>Select Credit Account</option>
                <option value="Cash">Cash</option>
                <option value="Accounts Receivable">Accounts Receivable</option>
                <option value="Lab Equipment">Lab Equipment</option>
                <option value="Insurance">Insurance</option>
                <option value="Lab Computers">Lab Computers</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Accounts Payable">Accounts Payable</option>
                <option value="Unearned Rent">Unearned Rent</option>
                <option value="Doris Green, Equity">Doris Green, Equity</option>
                <option value="Doris Green, Withdrawals">Doris Green, Withdrawals</option>
                <option value="Fees Earned">Fees Earned</option>
                <option value="Wages">Wages</option>
                <option value="Rent">Rent</option>
                <option value="Utilities">Utilities</option>
                <option value="Lab Supplies">Lab Supplies</option>
                <option value="Misc.">Misc.</option>
            </Form.Select>
            <br></br>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Enter Amount"
                    required
                    value={creditAmount}
                    onChange={(e) => setCreditAmount(e.target.value)}
                />
            </Form.Group>
            <br></br>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Notes"
                    required
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </Form.Group>
            <br></br>
            <Button variant="success" type="submit" block>
                Add New Journal Entry
            </Button>


        </Form>
    )
}
