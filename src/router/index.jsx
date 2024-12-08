import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactsList from "../pages/ContactsList";
import ContactDetail from "../pages/ContactDetail";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <Routes>
          <Route path="/" element={<ContactsList/>} />
          <Route path="/contact/:id" element={<ContactDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;