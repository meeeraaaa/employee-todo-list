import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Todos from './components/Todos';
import UserDetails from './components/UserDetails';
import './App.css';
function App() {
  return (
    <Routes>
      
      <Route path="/" element={<UserDetails />} />
      <Route path="/user/:userId" element={<Todos />} />
    </Routes>
  );
}

export default App;
