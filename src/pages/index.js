import React, { useState } from 'react';
import { Button } from '@mui/material';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import '../App.css';
import SignIn from '../components/SignIn';
import BioForm from '../components/BioForm';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; 
import { db } from '../firebase';

function Home() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [resumeId, setResumeId] = React.useState("");
  const navigate = useNavigate();

    
const getResumeIdByEmail = async (email) => {
    console.log(email);
  try {
    const q = query(collection(db, 'admins'), where('email', '==', email));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('The user is not an admin!');
      return;
    }

    querySnapshot.forEach((doc) => {
      console.log('Found resume with ID:', doc.id); // This is the resumeId
      setResumeId(doc.id);
      setAdmin(true);
      navigate('/admin');
    });
  } catch (error) {
    console.error('Error fetching document:', error);
  }
};

getResumeIdByEmail(user?.email);

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
    <div className="App">
      {signedIn  && !admin ? (<>
          <h2>Welcome, {user.email}</h2>
          <BioForm resumeId={resumeId}/>
          <Button onClick={signingOut} variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>Sign Out</Button>
        </>):
      (<SignIn setSignedIn={setSignedIn} setUser={setUser}/>)}
    </div>
    </>
  );
}

export default Home;