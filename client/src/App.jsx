// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomerList from "./components/CustomerList";
import CustomerForm from "./components/CustomerForm";
import MembershipForm from "./components/MembershipForm";
import MembershipList from "./components/MembershipList";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/add" element={<CustomerForm />} />
        <Route path="/edit/:id" element={<CustomerForm />} />
        <Route path="/memberships" element={<MembershipList />} />
        <Route path="/memberships/new" element={<MembershipForm />} />
        <Route path="/memberships/edit/:id" element={<MembershipForm />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
