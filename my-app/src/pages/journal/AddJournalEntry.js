import { Form, Button } from "react-bootstrap"
import { collection, getDocs, addDoc, deleteDoc, doc, Firestore, setDoc } from "firebase/firestore";
import { useState } from "react";
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

    const setData = async () => {
        const dateCreated = new Date();
        //Debit Entry
        await setDoc(doc(db, "pendingJournalEntries", "debit" + debitAmount), {
            id: numTransactions + ".Debit",
            dateCreated: dateCreated.toDateString(),
            accountName: debitAccount,
            debit: debitAmount,
            credit: 0.0,
            notes: notes
        })
        //Credit Entry
        await setDoc(doc(db, "pendingJournalEntries", "credit" + creditAmount), {
            id: numTransactions + ".Credit",
            dateCreated: dateCreated.toDateString(),
            accountName: creditAccount,
            debit: 0.0,
            credit: creditAmount,
            notes: notes
        })
        alert("Account created")
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
                <option value="Equity">Equity</option>
                <option value="Withdrawals">Withdrawals</option>
                <option value="Fees Earned">Fees Earned</option>
                <option value="ReveWagesnues">Wages</option>
                <option value="ReveRentnues">Rent</option>
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
                <option value="Equity">Equity</option>
                <option value="Withdrawals">Withdrawals</option>
                <option value="Fees Earned">Fees Earned</option>
                <option value="ReveWagesnues">Wages</option>
                <option value="ReveRentnues">Rent</option>
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
