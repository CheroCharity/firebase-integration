import React, { useState } from 'react';
import { TextField, Button } from '@mui/material'; 
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../firebase'; // Import the Firebase auth instance


function SignIn({setSignedIn, setUser}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      // Sign in with email and password using Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully:', userCredential.user);
      setSignedIn(true);
      setUser(userCredential.user);
    } catch (error) {
      console.error('Error signing in:', error.message);
      setError(error.message); // Show error message if sign-in fails
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        onClick={handleSignIn}
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: '16px' }}
      >
        Sign In
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default SignIn;


