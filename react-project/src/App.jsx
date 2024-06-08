import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Search from './components/Search';
import LeagueDetails from './components/LeagueDetails';

function App() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/leagues/:id" element={<LeagueDetails />} />
        </Routes>
    </div>

  );
}

export default App;