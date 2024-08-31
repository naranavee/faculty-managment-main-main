import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewProfile() {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [editFormData, setEditFormData] = useState({
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
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/faculty/profiles');
      setProfiles(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onEditProfile = (profile) => {
    setSelectedProfile(profile);
    setEditFormData({
      name: profile.name,
      mobileNumber: profile.mobileNumber,
      gender: profile.gender,
      dob: profile.dob,
      doj: profile.doj,
      address: profile.address,
      designation: profile.designation,
      department: profile.department,
      qualification: profile.qualification,
      salary: profile.salary,
      married: profile.married,
    });
  };

  const onEditFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'married') {
      setEditFormData({ ...editFormData, [name]: value === 'Yes' });
    } else {
      setEditFormData({ ...editFormData, [name]: value });
    }
  };

  const onEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/faculty/profile/${selectedProfile._id}`, editFormData);
      alert('Profile updated successfully!');
      fetchProfiles();
      setSelectedProfile(null);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onDeleteProfile = async (profileId) => {
    try {
      await axios.delete(`http://localhost:5000/api/faculty/profile/${profileId}`);
      alert('Profile deleted successfully');
      fetchProfiles(); // Refresh the list of profiles
    } catch (err) {
      console.error('Error in onDeleteProfile:', err.response ? err.response.data : err.message);
      alert('Error deleting profile');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Profiles</h2>

      {selectedProfile ? (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
          <form onSubmit={onEditFormSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={onEditFormChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobileNumber"
                value={editFormData.mobileNumber}
                onChange={onEditFormChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                Gender
              </label>
              <select
                name="gender"
                value={editFormData.gender}
                onChange={onEditFormChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={editFormData.dob}
                onChange={onEditFormChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doj">
                Date of Joining
              </label>
              <input
                type="date"
                name="doj"
                value={editFormData.doj}
                onChange={onEditFormChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                Address
              </label>
              <textarea
                name="address"
                value={editFormData.address}
                onChange={onEditFormChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="designation">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                value={editFormData.designation}
                onChange={onEditFormChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={editFormData.department}
                onChange={onEditFormChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="qualification">
                Qualification
              </label>
              <input
                type="text"
                name="qualification"
                value={editFormData.qualification}
                onChange={onEditFormChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salary">
                Salary
              </label>
              <input
                type="number"
                name="salary"
                value={editFormData.salary}
                onChange={onEditFormChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="married">
                Married
              </label>
              <select
                name="married"
                value={editFormData.married ? 'Yes' : 'No'}
                onChange={onEditFormChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setSelectedProfile(null)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-4">
          {profiles.length === 0 ? (
            <p>No profiles available</p>
          ) : (
            profiles.map((profile) => (
              <div key={profile._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">{profile.name}</h3>
                <p><strong>Mobile Number:</strong> {profile.mobileNumber}</p>
                <p><strong>Gender:</strong> {profile.gender}</p>
                <p><strong>Date of Birth:</strong> {profile.dob}</p>
                <p><strong>Date of Joining:</strong> {profile.doj}</p>
                <p><strong>Address:</strong> {profile.address}</p>
                <p><strong>Designation:</strong> {profile.designation}</p>
                <p><strong>Department:</strong> {profile.department}</p>
                <p><strong>Qualification:</strong> {profile.qualification}</p>
                <p><strong>Salary:</strong> {profile.salary}</p>
                <p><strong>Married:</strong> {profile.married ? 'Yes' : 'No'}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEditProfile(profile)}
                    className="bg-yellow-500 text-white py-1 px-4 rounded hover:bg-yellow-700 focus:outline-none focus:shadow-outline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteProfile(profile._id)}
                    className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ViewProfile;
