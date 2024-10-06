// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components
import Home from './pages/Home.tsx';
import Create from './pages/Create.tsx';
import Navbar from './components/layout/Navbar.tsx';
import SupplierTable from './pages/Table.tsx';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/create" element={<Create />} />
        <Route path="/table" element={<SupplierTable />} />
      </Routes>
    </Router>
  );
}

export default App;