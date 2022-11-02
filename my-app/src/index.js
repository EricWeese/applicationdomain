import React from 'react';
import ReactDOM from 'react-dom/client';
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import ForgotPassword from './pages/forgotPassword/forgotPassword'
import Cash from './pages/accounts/Cash'
import Accounts from './pages/accounts/Accounts'
import AccountsNew from './pages/accounts/AccountsNew'
import AccountsReceivable from './pages/accounts/Accounts Receivable'
import AccountsPayable from './pages/accounts/Accounts Payable'
import Insurance from './pages/accounts/Insurance'
import LabComputers from './pages/accounts/Lab Computers'
import LabEquipment from './pages/accounts/Lab Equipment'
import RealEstate from './pages/accounts/Real Estate'
import Users from './pages/users/users'
import JournalEntries from './pages/journal/JournalEntries'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import App from './App';
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

    </Routes>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
