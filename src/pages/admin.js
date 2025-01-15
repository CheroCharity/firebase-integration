import React, { useState } from 'react';
import { Button } from '@mui/material';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import SignIn from '../components/SignIn';
import EditBioForm from '../components/EditBioForm';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import ResumeList from '../components/ResumeList';

function Admin() {
  const [user, setUser] = useState(null);
  const [signedIn, setSignedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [editResume, setEditResume] = useState(false);
  const [editEmail, setEditEmail] = useState('');
  const [resumeId, setResumeId] = React.useState("");
  const navigate = useNavigate();

    
const getResumeIdByEmail = async (email) => {
    console.log(email);
  try {
    const q = query(collection(db, 'admins'), where('email', '==', email));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('The user is not an admin!');
      setAdmin(false);
      navigate('/');
    }

    querySnapshot.forEach((doc) => {
      console.log('The user is an admin'); 
      setAdmin(true);
    });
  } catch (error) {
    console.error('Error fetching document:', error);
  }
};

const getEditResumeId = async (email) => {
  console.log(email);
try {
  const q = query(collection(db, 'resumes'), where('email', '==', email));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log('The user is not available!');
  }

  querySnapshot.forEach((doc) => {
    console.log('The user is available'); 
    setResumeId(doc.id);
  });
} catch (error) {
  console.error('Error fetching document:', error);
}
};

getResumeIdByEmail(user?.email);
getEditResumeId(editEmail);
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
      {signedIn  && admin ? (<>
          <h2>Admin Dashboard</h2>
          <h2>Welcome, {user.email}</h2>
          {editResume ?
          (<EditBioForm resumeId={resumeId} setEditResume={setEditResume}/>):(
            <ResumeList setEditResume={setEditResume} setEditEmail={setEditEmail}/>
          )}
          <Button onClick={signingOut} variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>Sign Out</Button>
        </>):
      (<SignIn setSignedIn={setSignedIn} setUser={setUser}/>)}
    </div>
    </>
  );
}

export default Admin;