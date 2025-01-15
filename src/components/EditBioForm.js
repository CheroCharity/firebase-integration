import React, { useState, useEffect } from 'react';
import { db, collection, addDoc, doc, getDoc, updateDoc } from '../firebase';
import { TextField, Button, Box, Typography } from '@mui/material';

function ResumeForm({ resumeId, setEditResume }) {
    console.log(resumeId);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [skills, setSkills] = useState('');
  const [projects, setProjects] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch existing resume data if resumeId is provided
  useEffect(() => {
    if (resumeId) {
      const fetchResumeData = async () => {
        try {
          const docRef = doc(db, 'resumes', resumeId); 
          console.log(docRef);
          console.log(resumeId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const resumeData = docSnap.data();
            setName(resumeData.name);
            setEmail(resumeData.email);
            setPhone(resumeData.phone);
            setAddress(resumeData.address);
            setSkills(resumeData.skills.join(', ')); // Display skills as comma-separated
            setProjects(resumeData.projects.join(', ')); // Display projects as comma-separated
          } else {
            console.log("No such document!");
          }
        } catch (err) {
          setError('Error fetching resume data');
          console.error(err);
        }
      };

      fetchResumeData();
    }
  }, [resumeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const resumeData = {
      name,
      email,
      phone,
      address,
      skills: skills.split(',').map((skill) => skill.trim()),
      projects: projects.split(',').map((project) => project.trim()),
    };

    try {
      if (resumeId) {
        // Update existing resume data in Firestore
        const docRef = doc(db, 'resumes', resumeId);
        await updateDoc(docRef, resumeData);
       setEditResume(false);
      } else {
        // Create new resume data in Firestore
        await addDoc(collection(db, 'resumes'), resumeData);
        alert('Resume saved successfully!');
      }

      setLoading(false);
      // Clear the form after submission
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setSkills('');
      setProjects('');
    } catch (err) {
      setError('Error saving resume data!');
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', padding: 3 }}>
      <h2>{resumeId ? 'Edit Resume' : 'Submit Resume'}</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Skills (comma separated)"
          variant="outlined"
          fullWidth
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Projects (comma separated)"
          variant="outlined"
          fullWidth
          value={projects}
          onChange={(e) => setProjects(e.target.value)}
          margin="normal"
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? 'Submitting...' : resumeId ? 'Update Resume' : 'Submit Resume'}
        </Button>
      </form>
    </Box>
  );
}

export default ResumeForm;
