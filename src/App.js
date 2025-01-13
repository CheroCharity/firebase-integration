import React, { useState } from 'react';
import Box  from '@mui/material/Box';
import { Button } from '@mui/material';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import './App.css';
import SignIn from './components/SignIn';
import Header from './components/Header';

function App() {
  const [user, setUser] = useState(null);
  const [signedIn, setSignedIn] = useState(false);

  const signingOut = async () => {
    try {
      await signOut(auth); // Sign the user out
      console.log('User signed out');
      setSignedIn(false);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
    
  };

  return (
  <>
    <Header/>
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center',      // Center vertically
      }}
    >
    <div className="App">
      {signedIn ? (<>
          <h2>Welcome, {user.email}</h2>
          <Button onClick={signingOut} variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>Sign Out</Button>
        </>):
      (<SignIn setSignedIn={setSignedIn} setUser={setUser}/>)}
    </div>
    </Box>
    </>
  );
}

export default App;
