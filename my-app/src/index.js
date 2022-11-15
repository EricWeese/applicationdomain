import React from 'react';
import ReactDOM from 'react-dom/client';
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import ForgotPassword from './pages/forgotPassword/forgotPassword'
import Cash from './pages/accounts/Cash'
import Accounts from './pages/accounts/Accounts'
import AccountsReceivable from './pages/accounts/Accounts Receivable'
import AccountsPayable from './pages/accounts/Accounts Payable'
import Insurance from './pages/accounts/Insurance'
import LabComputers from './pages/accounts/Lab Computers'
import LabEquipment from './pages/accounts/Lab Equipment'
import RealEstate from './pages/accounts/Real Estate'
import Users from './pages/users/Users'
import JournalEntries from './pages/journal/JournalEntries'
import PendingJournalEntries from './pages/journal/PendingJournalEntries'
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
      <Route path="/Users" element={<Users />} />
      <Route path="/Cash" element={<Cash />} />
      <Route path="/Accounts Receivable" element={<AccountsReceivable />} />
      <Route path="/Accounts Payable" element={<AccountsPayable />} />
      <Route path="/Insurance" element={<Insurance />} />
      <Route path="/Lab Computers" element={<LabComputers />} />
      <Route path="/Lab Equipment" element={<LabEquipment />} />
      <Route path="/Real Estate" element={<RealEstate />} />
      <Route path="/JournalEntries" element={<JournalEntries />} />
      <Route path="/PendingJournalEntries" element={<PendingJournalEntries />} />

    </Routes>
  </BrowserRouter>

);

/*
To-do:
when rejecting journal entries be able to give comment
email different accounts
log of events
attach files to entry
user page: add email column
fix journal entry index
auto sort
add time to date column
journal entries color coded

*/
reportWebVitals();
