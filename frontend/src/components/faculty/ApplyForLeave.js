import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ApplyForLeave() {
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const [leaveData, setLeaveData] = useState(null);
  const [showLeave, setShowLeave] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (isEditMode && leaveData) {
      setFormData({
        leaveType: leaveData.leaveType,
        startDate: leaveData.startDate,
        endDate: leaveData.endDate,
        description: leaveData.description,
      });
    }
  }, [isEditMode, leaveData]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        const res = await axios.put('http://localhost:5000/api/faculty/leave', formData);
        console.log(res.data);
        alert('Leave request updated successfully!');
      } else {
        const res = await axios.post('http://localhost:5000/api/faculty/leave', formData);
        console.log(res.data);
        alert('Leave request submitted successfully!');
      }

      // Reset form and mode after submission
      setFormData({
        leaveType: '',
        startDate: '',
        endDate: '',
        description: '',
      });
      setIsEditMode(false);
      setShowLeave(false);

    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onViewLeave = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/faculty/leave');
      setLeaveData(res.data);
      setShowLeave(true);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onDeleteLeave = async () => {
    try {
      await axios.delete('http://localhost:5000/api/faculty/leave');
      alert('Leave request deleted successfully');
      setLeaveData(null);
      setShowLeave(false);
      setIsEditMode(false);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onEditLeave = () => {
    setIsEditMode(true);
    setShowLeave(false);
  };

  return (
    <div style={styles.card}>
      <h2>{isEditMode ? 'Edit Leave Request' : 'Apply for Leave'}</h2>
      <form onSubmit={onSubmit}>
        <label>Leave Type:</label>
        <select name="leaveType" value={formData.leaveType} onChange={onChange} required>
          <option value="">Select Leave Type</option>
          <option value="Personal">Personal</option>
          <option value="Sick">Sick</option>
        </select>

        <label>Start Date:</label>
        <input type="date" name="startDate" value={formData.startDate} onChange={onChange} required />

        <label>End Date:</label>
        <input type="date" name="endDate" value={formData.endDate} onChange={onChange} required />

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={onChange} required></textarea>

        <button type="submit">{isEditMode ? 'Update Leave' : 'Submit Leave'}</button>
        <button type="button" onClick={() => {
          setFormData({
            leaveType: '',
            startDate: '',
            endDate: '',
            description: '',
          });
          setIsEditMode(false);
          setShowLeave(false);
        }}>Cancel</button>
      </form>

      {!isEditMode && (
        <>
          <button style={styles.viewLeaveButton} onClick={onViewLeave}>View Leave Request</button>

          {showLeave && leaveData && (
            <div style={styles.leaveDetails}>
              <h3>Leave Details</h3>
              <p><strong>Leave Type:</strong> {leaveData.leaveType}</p>
              <p><strong>Start Date:</strong> {new Date(leaveData.startDate).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(leaveData.endDate).toLocaleDateString()}</p>
              <p><strong>Description:</strong> {leaveData.description}</p>
              <button style={styles.editButton} onClick={onEditLeave}>Edit Leave</button>
              <button style={styles.deleteButton} onClick={onDeleteLeave}>Delete Leave</button>
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
  viewLeaveButton: {
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
  leaveDetails: {
    marginTop: '20px',
    backgroundColor: '#f8f9fa',
    padding: '10px',
    borderRadius: '5px',
  },
};

export default ApplyForLeave;
