import { Form, Button } from "react-bootstrap"
import { collection, getDocs, addDoc, deleteDoc, doc, Firestore, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from '../../firebase/config'
import { creditId, debitId } from './PendingJournalEntries';

export default function AddJournalEntry() {
    var data;
    const [notes, setNotes] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        setData();
        deleteEntry();
        alert("Entries Rejected");
    }



    const setData = async () => {

        const creditRef = doc(db, "pendingJournalEntries", creditId);
        const creditData = (await getDoc(creditRef)).data();
        console.log(creditData);
        const debitRef = doc(db, "pendingJournalEntries", debitId);


        await updateDoc(creditRef, {
            reason: notes
        })
        await updateDoc(debitRef, {
            reason: notes
        })

    }
    const deleteEntry = async () => {
        var dateTime = getCurrDate();
        const counterRef = doc(db, "helperData", "counters");
        const counterSnap = (await getDoc(counterRef)).data();
        const allJournalCounterNew = parseInt(counterSnap.allJournal) + 1;
        await updateDoc(counterRef, {
            allJournal: allJournalCounterNew
        })

        const pendingRefCredit = doc(db, "pendingJournalEntries", creditId);
        const pendingCredit = (await getDoc(pendingRefCredit)).data();
        console.log(pendingCredit);
        const pendingRefDebit = doc(db, "pendingJournalEntries", debitId);
        const pendingDebit = (await getDoc(pendingRefDebit)).data();
        //Adds to all journal entries
        await setDoc(doc(db, "allJournalEntries", allJournalCounterNew + " - Credit"), {
            id: allJournalCounterNew + " - Credit",
            date: dateTime,
            accountName: pendingCredit.accountName,
            debit: 0.0,
            credit: pendingCredit.credit,
            notes: pendingCredit.notes,
            type: "Rejected",
            reason: pendingCredit.reason,
        })
        await setDoc(doc(db, "allJournalEntries", allJournalCounterNew + " - Debit"), {
            id: allJournalCounterNew + " - Debit",
            date: dateTime,
            accountName: pendingDebit.accountName,
            debit: pendingDebit.debit,
            credit: 0.0,
            notes: pendingDebit.notes,
            type: "Rejected",
            reason: pendingDebit.reason,
        })
        //Activity Log
        const userRef = doc(db, "helperData", "currentUser");
        const userSnap = (await getDoc(userRef)).data();
        var userName = userSnap.username;
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
            notes: userName + " has rejected journal entry " + creditId + " and " + debitId,
        })

        await deleteDoc(doc(db, "pendingJournalEntries", pendingCredit.id));
        await deleteDoc(doc(db, "pendingJournalEntries", pendingDebit.id));
        console.log(pendingCredit);

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

    return (
        <Form onSubmit={handleSubmit}>

            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Reason for rejecting"
                    required
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </Form.Group>
            <br></br>
            <Button variant="success" type="submit" block>
                Reject Entry
            </Button>


        </Form>
    )
}
