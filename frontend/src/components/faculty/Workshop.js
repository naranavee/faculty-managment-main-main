import React, { useState } from 'react';
import axios from 'axios';

function Workshop() {
  const [formData, setFormData] = useState({
    facultyMail: '',
    workshopName: '',
    venue: '',
    started: '',
    ended: '',
    numberOfDays: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/faculty/workshop', formData);
      console.log(res.data);
      alert('Workshop details submitted successfully!');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div style={styles.card}>
      <h2>Workshop Details</h2>
      <form onSubmit={onSubmit}>
        <label>Faculty Mail:</label>
        <input
          type="email"
          name="facultyMail"
          value={formData.facultyMail}
          onChange={onChange}
          required
        />

        <label>Name of the Workshop:</label>
        <input
          type="text"
          name="workshopName"
          value={formData.workshopName}
          onChange={onChange}
          required
        />

        <label>Venue:</label>
        <input
          type="text"
          name="venue"
          value={formData.venue}
          onChange={onChange}
          required
        />

        <label>Started:</label>
        <input
          type="date"
          name="started"
          value={formData.started}
          onChange={onChange}
          required
        />

        <label>Ended:</label>
        <input
          type="date"
          name="ended"
          value={formData.ended}
          onChange={onChange}
          required
        />

        <label>Number of Days:</label>
        <input
          type="number"
          name="numberOfDays"
          value={formData.numberOfDays}
          onChange={onChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

const styles = {
  card: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '20px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    backgroundColor: '#fff',
  },
};

export default Workshop;
