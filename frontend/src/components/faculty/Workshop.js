import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Workshop() {
  const [formData, setFormData] = useState({
    facultyMail: '',
    nameOfWorkshop: '',
    venue: '',
    started: '',
    ended: '',
    numberOfDays: ''
  });

  const [workshopData, setWorkshopData] = useState(null);
  const [showWorkshop, setShowWorkshop] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (isEditMode && workshopData) {
      setFormData({
        facultyMail: workshopData.facultyMail,
        nameOfWorkshop: workshopData.nameOfWorkshop,
        venue: workshopData.venue,
        started: workshopData.started,
        ended: workshopData.ended,
        numberOfDays: workshopData.numberOfDays
      });
    }
  }, [isEditMode, workshopData]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        await axios.put('http://localhost:5000/api/faculty/workshop', formData);
        alert('Workshop updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/faculty/workshop', formData);
        alert('Workshop registered successfully!');
      }

      // Reset form and mode after submission
      setFormData({
        facultyMail: '',
        nameOfWorkshop: '',
        venue: '',
        started: '',
        ended: '',
        numberOfDays: ''
      });
      setIsEditMode(false);
      setShowWorkshop(false);

    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onViewWorkshop = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/faculty/workshop');
      setWorkshopData(res.data);
      setShowWorkshop(true);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onDeleteWorkshop = async () => {
    try {
      await axios.delete('http://localhost:5000/api/faculty/workshop');
      alert('Workshop deleted successfully');
      setWorkshopData(null);
      setShowWorkshop(false);
      setIsEditMode(false);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onEditWorkshop = () => {
    setIsEditMode(true);
    setShowWorkshop(false);
  };

  return (
    <div style={styles.card}>
      <h2>{isEditMode ? 'Edit Workshop' : 'Workshop'}</h2>
      <form onSubmit={onSubmit}>
        <label>Faculty Mail:</label>
        <input type="email" name="facultyMail" value={formData.facultyMail} onChange={onChange} required />

        <label>Name of the Workshop:</label>
        <input type="text" name="nameOfWorkshop" value={formData.nameOfWorkshop} onChange={onChange} required />

        <label>Venue:</label>
        <input type="text" name="venue" value={formData.venue} onChange={onChange} required />

        <label>Started:</label>
        <input type="date" name="started" value={formData.started} onChange={onChange} required />

        <label>Ended:</label>
        <input type="date" name="ended" value={formData.ended} onChange={onChange} required />

        <label>Number of Days:</label>
        <input type="number" name="numberOfDays" value={formData.numberOfDays} onChange={onChange} required />

        <button type="submit">{isEditMode ? 'Update Workshop' : 'Register'}</button>
        <button type="button" onClick={() => {
          setFormData({
            facultyMail: '',
            nameOfWorkshop: '',
            venue: '',
            started: '',
            ended: '',
            numberOfDays: ''
          });
          setIsEditMode(false);
          setShowWorkshop(false);
        }}>Cancel</button>
      </form>

      {!isEditMode && (
        <>
          <button style={styles.viewWorkshopButton} onClick={onViewWorkshop}>View Workshop</button>

          {showWorkshop && workshopData && (
            <div style={styles.workshopDetails}>
              <h3>Workshop Details</h3>
              <p><strong>Faculty Mail:</strong> {workshopData.facultyMail}</p>
              <p><strong>Name of the Workshop:</strong> {workshopData.nameOfWorkshop}</p>
              <p><strong>Venue:</strong> {workshopData.venue}</p>
              <p><strong>Started:</strong> {workshopData.started}</p>
              <p><strong>Ended:</strong> {workshopData.ended}</p>
              <p><strong>Number of Days:</strong> {workshopData.numberOfDays}</p>
              <button style={styles.editButton} onClick={onEditWorkshop}>Edit Workshop</button>
              <button style={styles.deleteButton} onClick={onDeleteWorkshop}>Delete Workshop</button>
            </div>
          )}
        </>
      )}
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
  viewWorkshopButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  editButton: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  workshopDetails: {
    marginTop: '20px',
    backgroundColor: '#f8f9fa',
    padding: '10px',
    borderRadius: '5px',
  },
};

export default Workshop;
