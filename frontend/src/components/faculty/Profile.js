import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    gender: '',
    dob: '',
    doj: '',
    address: '',
    designation: '',
    department: '',
    qualification: '',
    salary: '',
    married: false, // Default as false
  });

  const [profileData, setProfileData] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (isEditMode && profileData) {
      setFormData({
        name: profileData.name,
        mobileNumber: profileData.mobileNumber,
        gender: profileData.gender,
        dob: profileData.dob,
        doj: profileData.doj,
        address: profileData.address,
        designation: profileData.designation,
        department: profileData.department,
        qualification: profileData.qualification,
        salary: profileData.salary,
        married: profileData.married,
      });
    }
  }, [isEditMode, profileData]);

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === 'married') {
      setFormData({ ...formData, [name]: value === 'Yes' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!formData.mobileNumber) {
      alert("Mobile number is required");
      return;
    }

    try {
      if (isEditMode) {
        const res = await axios.put('http://localhost:5000/api/faculty/profile', formData);
        console.log(res.data);
        alert('Profile updated successfully!');
      } else {
        const res = await axios.post('http://localhost:5000/api/faculty/profile', formData);
        console.log(res.data);
        alert('Profile registered successfully!');
      }

      // Reset form and mode after submission
      setFormData({
        name: '',
        mobileNumber: '',
        gender: '',
        dob: '',
        doj: '',
        address: '',
        designation: '',
        department: '',
        qualification: '',
        salary: '',
        married: false,
      });
      setIsEditMode(false);
      setShowProfile(false);

    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onViewProfile = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/faculty/profile');
      setProfileData(res.data);
      setShowProfile(true);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onDeleteProfile = async () => {
    try {
      await axios.delete('http://localhost:5000/api/faculty/profile');
      alert('Profile deleted successfully');
      setProfileData(null);
      setShowProfile(false);
      setIsEditMode(false);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onEditProfile = () => {
    setIsEditMode(true);
    setShowProfile(false);
  };

  return (
    <div style={styles.card}>
      <h2>{isEditMode ? 'Edit Faculty Profile' : 'Faculty Profile'}</h2>
      <form onSubmit={onSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={onChange} required />

        <label>Mobile Number:</label>
        <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={onChange} required />

        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={onChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Date of Birth:</label>
        <input type="date" name="dob" value={formData.dob} onChange={onChange} required />

        <label>Date of Joining:</label>
        <input type="date" name="doj" value={formData.doj} onChange={onChange} required />

        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={onChange} required />

        <label>Designation:</label>
        <input type="text" name="designation" value={formData.designation} onChange={onChange} required />

        <label>Department:</label>
        <input type="text" name="department" value={formData.department} onChange={onChange} required />

        <label>Qualification:</label>
        <input type="text" name="qualification" value={formData.qualification} onChange={onChange} required />

        <label>Salary:</label>
        <input type="number" name="salary" value={formData.salary} onChange={onChange} required />

        <label>Married:</label>
        <select name="married" value={formData.married ? 'Yes' : 'No'} onChange={onChange} required>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <button type="submit">{isEditMode ? 'Update Profile' : 'Register'}</button>
        <button type="button" onClick={() => {
          setFormData({
            name: '', mobileNumber: '', gender: '', dob: '', doj: '',
            address: '', designation: '', department: '', qualification: '',
            salary: '', married: false
          });
          setIsEditMode(false);
          setShowProfile(false);
        }}>Cancel</button>
      </form>

      {!isEditMode && (
        <>
          <button style={styles.viewProfileButton} onClick={onViewProfile}>View Profile</button>

          {showProfile && profileData && (
            <div style={styles.profileDetails}>
              <h3>Profile Details</h3>
              <p><strong>Name:</strong> {profileData.name}</p>
              <p><strong>Mobile Number:</strong> {profileData.mobileNumber}</p>
              <p><strong>Gender:</strong> {profileData.gender}</p>
              <p><strong>Date of Birth:</strong> {profileData.dob}</p>
              <p><strong>Date of Joining:</strong> {profileData.doj}</p>
              <p><strong>Address:</strong> {profileData.address}</p>
              <p><strong>Designation:</strong> {profileData.designation}</p>
              <p><strong>Department:</strong> {profileData.department}</p>
              <p><strong>Qualification:</strong> {profileData.qualification}</p>
              <p><strong>Salary:</strong> {profileData.salary}</p>
              <p><strong>Married:</strong> {profileData.married ? 'Yes' : 'No'}</p>
              <button style={styles.editButton} onClick={onEditProfile}>Edit Profile</button>
              <button style={styles.deleteButton} onClick={onDeleteProfile}>Delete Profile</button>
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
  viewProfileButton: {
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
  profileDetails: {
    marginTop: '20px',
    backgroundColor: '#f8f9fa',
    padding: '10px',
    borderRadius: '5px',
  },
};

export default Profile;
