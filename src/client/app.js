import React, { useState } from 'react';
import './stylesheets/app.scss';
import LeaderBoard from "./leaderBoard/index.js";
import Events from "./buletinBoard/Calendar.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { Signup, Login, Logout } from './login/index.jsx';
import Chart from './river/index.js';
import { logOut } from './apiHelpers';
import { AuthContext, useAuth } from './login/auth';
import ProtectedRoute from './login/protectedRoute';
import { useCookies } from 'react-cookie';
import Home from './Home.js';
import MeditationRiver from './river/MeditationRiver.js';
import AsanaRiver from './river/AsanaRiver.js';
import About from './about';


const App = (props) => {
  // const [cookies, removeCookie] = useCookies();
  // const connectSID = cookies['connect.sid'] || false;
  const connectSID = document.cookie.includes('connect.sid') || false;
  const [authTokens, setAuthTokens] = useState(connectSID);
  const [isLoggedIn, setLogged] = useState(connectSID);
  const [isSignedUp, setSignup] = useState(false);
  const [user, setUser] = useState({});

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens }}>
      <Router>
        <div className='grid-container'>
          <header></header>
          <div className='menu'>
            <Link to='/'>Home</Link>
            <Link to='/meditation-river'>Meditation River</Link>
            <Link to='/asana-river'>Asana River</Link>
            <Link to='/bulletinboard'>Upcoming Events</Link>
            <Link to='/leaderboard'>Leader Board</Link>
            <Link to='/about'>About</Link>
            {(!authTokens || authTokens === 'undefined') && (
              <Link to='/login'>Log In</Link>
            )}
            {(!authTokens || authTokens === 'undefined') && (
              <Link to='/signup'>Sign Up</Link>
            )}
            {authTokens && authTokens !== 'undefined' && (
              <Link to='/logout'>Log Out</Link>
            )}
          </div>
          <div className='content'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/about'>
                <About />
              </Route>
              <Route path='/leaderboard'>
                <LeaderBoard></LeaderBoard>
              </Route>
              <Route path='/bulletinboard'><Events/></Route>
              <Route
                path='/login'
                render={(props) => (
                  <Login
                    handleUser={setUser}
                    handleLog={setAuthTokens}
                    isLoggedIn={authTokens}
                    {...props}
                  />
                )}
              />

              <Route path='/signup' render={(props) => <Signup {...props} />} />

              <Route path='/meditation-river'>
                <MeditationRiver />
              </Route>

              <Route path='/asana-river'>
                <AsanaRiver />
              </Route>
              <ProtectedRoute component={Admin} path='/admin' />
              <Route path='/logout'>
                {(!authTokens || authTokens === 'undefined') && (
                  <Redirect to='/' />
                )}
                <Logout setAuthTokens={setAuthTokens} />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

function Admin() {
  return <div>Admin</div>;
}
