import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore methods
import { Paper, Typography, Grid } from '@mui/material'; 

const ResumeList = ({setEditResume, setEditEmail}) => {
  const [resumes, setResumes] = useState([]); // State to store fetched resumes
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to handle any errors

  // Fetch all resumes from Firestore
  const fetchResumes = async () => {
    try {
      // Reference to 'resumes' collection
      const resumesCollectionRef = collection(db, 'resumes');
      const querySnapshot = await getDocs(resumesCollectionRef);

      // Store fetched documents in state
      const resumesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setResumes(resumesData); // Set the resumes data in state
    } catch (error) {
      setError('Failed to fetch resumes.');
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after the data is fetched
    }
  };

  // Fetch resumes on component mount
  useEffect(() => {
    fetchResumes();
  }, []); 

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>; // Show loading message
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>; // Show error message
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Resumes List
      </Typography>

      {/* Display each resume */}
      <Grid container spacing={3}>
        {resumes.map((resume) => (
          <Grid item xs={12} sm={6} md={4} key={resume.id} onClick={()=>{
            setEditResume(true);
            setEditEmail(resume.email);
          }}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h6">{resume.name}</Typography>
              <Typography variant="body1">Email: {resume.email}</Typography>
              <Typography variant="body2">Skills: {resume.skills.join(', ')}</Typography>
              <Typography variant="body2">Projects: {resume.projects?.join(', ')}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ResumeList;
