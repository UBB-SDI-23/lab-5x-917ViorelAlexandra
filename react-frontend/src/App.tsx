import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TennisPlayerShowAll } from './components/tennisPlayer/TennisPlayerShowAll';
import { AppMenu } from './components/AppMenu';
import { AppHome } from './components/AppHome';
import { TennisPlayerDetail } from './components/tennisPlayer/TennisPlayerDetail';
import { TennisPlayerDelete } from './components/tennisPlayer/TennisPlayerDelete';
import { TennisPlayerAdd } from './components/tennisPlayer/TennisPlayerAdd';
import { TennisPlayerUpdate } from './components/tennisPlayer/TennisPlayerUpdate';
import { TennisPlayerShowAvgExpCoach } from './components/tennisPlayer/TennisPlayerShowAvgExpCoach';

function App() {
  const [count, setCount] = useState(0);

  return (
    <React.Fragment>
      <Router>
        <AppMenu/>
        <Routes>
          <Route path="/" element={<AppHome />} />
          <Route path="/tennisplayers/" element={<TennisPlayerShowAll />} />
          <Route path="/tennisplayers/:tennisPlayerId" element={<TennisPlayerDetail />} />
          <Route path="/tennisplayers/:tennisPlayerId/delete" element={<TennisPlayerDelete />} />
          <Route path="/tennisplayers/add" element={<TennisPlayerAdd />} /> 
          <Route path="/tennisplayers/:tennisPlayerId/edit" element={<TennisPlayerUpdate />} />
          <Route path="/tennisplayers/avgyoecoaches" element={<TennisPlayerShowAvgExpCoach />} />
        </Routes>
      </Router>
    </React.Fragment>

  )
}

export default App;
