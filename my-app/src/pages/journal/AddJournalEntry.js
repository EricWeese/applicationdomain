import { Form, Button } from "react-bootstrap"
import { useState } from "react";

export default function AddJournalEntry() {
    const [debitAccount, setDebitAccount] = useState('');
    const [debitAmount, setDebitAmount] = useState('');
    const [creditAccount, setCreditAccount] = useState('');
    const [creditAmount, setCreditAmount] = useState('');
    const handleSubmit = (e) => {
        if (debitAmount == creditAmount) {
            console.log("they equal")
        }
        else {
            console.log("nope")
        }
        e.preventDefault();
        console.log(debitAccount);
        console.log(debitAmount);
        console.log(creditAccount);
        console.log(creditAmount);
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
            <Button variant="success" type="submit" block>
                Add New Journal Entry
            </Button>


        </Form>
    )
}
