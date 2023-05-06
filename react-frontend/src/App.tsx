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
import { CoachAdd } from './components/coach/CoachAdd';
import { CoachDelete } from './components/coach/CoachDelete';
import { CoachDetail } from './components/coach/CoachDetail';
import { CoachShowAll } from './components/coach/CoachShowAll';
import { CoachUpdate } from './components/coach/CoachUpdate';
import { TournamentAdd } from './components/tournament/TournamentAdd';
import { TournamentDelete } from './components/tournament/TournamentDelete';
import { TournamentDetail } from './components/tournament/TournamentDetail';
import { TournamentShowAll } from './components/tournament/TournamentShowAll';
import { TournamentUpdate } from './components/tournament/TournamentUpdate';
import { TournamentRegistrationAdd } from './components/tournamentRegistration/TournamentRegistrationAdd';
import { TournamentRegDelete } from './components/tournamentRegistration/TournamentRegistrationDelete';
import { TournamentRegDetail } from './components/tournamentRegistration/TournamentRegistrationDetail';
import { TournamentRegistrationShowAll } from './components/tournamentRegistration/TournamentRegistrationShowAll';
import { TennisPlayerShowAvgExpCoach } from './components/tennisPlayer/TennisPlayerShowAvgExpCoach';
import { TennisPlayerShowTop3GrandSlam } from './components/tennisPlayer/TennisPlayerStatisticTop3GS';
import { CoachYoeFilter } from './components/coach/CoachYoeFilter';
import { Statistics } from './components/Statistics';
import { RegistrationForm } from './components/auth/Register';
import { ActivateAccount } from './components/auth/Activate';
import { LoginForm } from './components/auth/Login';
import { LogoutForm } from './components/auth/Logout';
import { UserProfile } from './components/Profile';

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

          <Route path="/coaches/" element={<CoachShowAll/>} />
          <Route path="/coaches/:coachId" element={<CoachDetail />}/>
          <Route path="/coaches/:coachId/delete" element={<CoachDelete/>}/>
          <Route path="/coaches/add" element={<CoachAdd />} />
          <Route path="/coaches/:coachId/edit" element={<CoachUpdate/>}/>

          <Route path="/tournaments/" element={<TournamentShowAll/>}/>
          <Route path="/tournaments/:tournamentId" element={<TournamentDetail/>}/>
          <Route path="/tournaments/:tournamentId/delete" element={<TournamentDelete/>}/>
          <Route path="/tournaments/add" element={<TournamentAdd />}/>
          <Route path="/tournaments/:tournamentId/edit" element={<TournamentUpdate/>}/>

          <Route path="/tournamentregs/" element={<TournamentRegistrationShowAll/>}/>
          <Route path="/tournamentregs/:tournamentRegId" element={<TournamentRegDetail/>}/>
          <Route path="/tournamentregs/:tournamentRegId/delete" element={<TournamentRegDelete/>}/>
          <Route path="/tournamentregs/add" element={<TournamentRegistrationAdd/>}/>

          <Route path="/allstats" element={<Statistics />} />
          <Route path="/statisticsplayers/avgyoe" element={<TennisPlayerShowAvgExpCoach />} />
          <Route path="/statisticsplayers/grandslam" element={<TennisPlayerShowTop3GrandSlam />} />
          <Route path="/statisticcoaches/yoe" element={<CoachYoeFilter />} />

          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/activate/:activationCode" element={<ActivateAccount />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<LogoutForm />} />
          <Route path="/profile/:userId" element={<UserProfile />} />

        </Routes>
      </Router>
    </React.Fragment>

  )
}

export default App;
