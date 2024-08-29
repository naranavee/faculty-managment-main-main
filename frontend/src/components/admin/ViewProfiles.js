import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewProfile() {
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);
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
    married: false,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/faculty/profile'); // Adjust the API endpoint as needed
        setProfileData(res.data);
        setFormData(res.data); // Initialize form data with fetched profile data
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchProfile();
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:5000/api/faculty/profile', formData);
      setProfileData(res.data);
      setEditMode(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete('http://localhost:5000/api/faculty/profile');
      setProfileData(null);
      setEditMode(false);
      alert('Profile deleted successfully!');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Faculty Profile</h2>

      {editMode ? (
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">Mobile Number:</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={onChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Gender:</label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={onChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={onChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doj">Date of Joining:</label>
            <input
              type="date"
              name="doj"
              value={formData.doj}
              onChange={onChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={onChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="designation">Designation:</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={onChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">Department:</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={onChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="qualification">Qualification:</label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={onChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salary">Salary:</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={onChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="married">Married:</label>
            <input
              type="checkbox"
              name="married"
              checked={formData.married}
              onChange={onChange}
              className="mr-2"
            />
            Yes
          </div>

          <div className="flex justify-end mt-4">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
              Update Profile
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          {profileData ? (
            <div>
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
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={onDelete}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <p>No profile data available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ViewProfile;
