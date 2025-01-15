import React, { useState } from 'react';
import { db, addDoc, collection } from '../firebase';
import { TextField, Button, Box } from '@mui/material';

function BioForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [skills, setSkills] = useState('');
  const [projects, setProjects] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Prepare resume data
      const resumeData = {
        name,
        email,
        phone,
        address,
        skills: skills.split(',').map((skill) => skill.trim()),
        projects: projects.split(',').map((project) => project.trim()),
      };

      // Add resume data to Firestore
      await addDoc(collection(db, 'resumes'), resumeData);
      
      // Clear form fields after successful submission
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setSkills('');
      setProjects('')
      setLoading(false);
      alert('Resume saved successfully!');
    } catch (err) {
      setError('Error saving resume data!');
      alert(err);
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', padding: 3 }}>
      <h2>Submit Your Data</h2>
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? 'Submitting...' : 'Submit Resume'}
        </Button>
      </form>
    </Box>
  );
}

export default BioForm;
