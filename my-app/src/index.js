import React from 'react';
import ReactDOM from 'react-dom/client';
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import ForgotPassword from './pages/forgotPassword/forgotPassword'
import Cash from './pages/accounts/Cash'
import Accounts from './pages/accounts/Accounts'
import AccountsAccountant from './pages/accounts/Accounts_Accountant'
import AccountsManager from './pages/accounts/Accounts_Manager'
import AccountsReceivable from './pages/accounts/Accounts Receivable'
import AccountsPayable from './pages/accounts/Accounts Payable'
import Insurance from './pages/accounts/Insurance'
import LabComputers from './pages/accounts/Lab Computers'
import LabEquipment from './pages/accounts/Lab Equipment'
import RealEstate from './pages/accounts/Real Estate'
import Users from './pages/users/Users'
import JournalEntries from './pages/journal/JournalEntries'
import JournalEntriesAccountants from './pages/journal/JournalEntries_Accountant'
import JournalEntriesManagers from './pages/journal/JournalEntries_Manager'
import PendingJournalEntries from './pages/journal/PendingJournalEntries'
import PendingJournalEntriesAccountant from './pages/journal/PendingJournalEntriesAccountant'
import PendingJournalEntriesManager from './pages/journal/PendingJournalEntriesManager'
import AllJournalEntries from './pages/journal/AllJournalEntries'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
export default function AppMain() {

}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/Accounts" element={<Accounts />} />
      <Route path="/AccountsAccountant" element={<AccountsAccountant />} />
      <Route path="/AccountsManager" element={<AccountsManager />} />
      <Route path="/Users" element={<Users />} />
      <Route path="/Cash" element={<Cash />} />
      <Route path="/Accounts Receivable" element={<AccountsReceivable />} />
      <Route path="/Accounts Payable" element={<AccountsPayable />} />
      <Route path="/Insurance" element={<Insurance />} />
      <Route path="/Lab Computers" element={<LabComputers />} />
      <Route path="/Lab Equipment" element={<LabEquipment />} />
      <Route path="/Real Estate" element={<RealEstate />} />
      <Route path="/JournalEntries" element={<JournalEntries />} />
      <Route path="/JournalEntriesAccountant" element={<JournalEntriesAccountants />} />
      <Route path="/JournalEntriesManager" element={<JournalEntriesManagers />} />
      <Route path="/PendingJournalEntries" element={<PendingJournalEntries />} />
      <Route path="/PendingJournalEntriesAccountant" element={<PendingJournalEntriesAccountant />} />
      <Route path="/PendingJournalEntriesManager" element={<PendingJournalEntriesManager />} />
      <Route path="/AllJournalEntries" element={<AllJournalEntries />} />

    </Routes>
  </BrowserRouter>

);

/*
To-do:
-when rejecting journal entries be able to give comment
email different accounts
log of events
-attach files to entry
-user page: add email column
-fix journal entry index
-auto sort
-add time to date column
journal entries color coded
-add headers to every page
*/
reportWebVitals();
