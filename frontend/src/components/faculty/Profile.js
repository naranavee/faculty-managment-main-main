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
    married: false,
  });

  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);

  useEffect(() => {
    if (isViewMode) {
      fetchProfiles();
    }
  }, [isViewMode]);

  useEffect(() => {
    if (isEditMode && selectedProfile) {
      setFormData({
        name: selectedProfile.name,
        mobileNumber: selectedProfile.mobileNumber,
        gender: selectedProfile.gender,
        dob: selectedProfile.dob,
        doj: selectedProfile.doj,
        address: selectedProfile.address,
        designation: selectedProfile.designation,
        department: selectedProfile.department,
        qualification: selectedProfile.qualification,
        salary: selectedProfile.salary,
        married: selectedProfile.married,
      });
    }
  }, [isEditMode, selectedProfile]);

  const fetchProfiles = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/faculty/profiles');
      setProfiles(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

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
    try {
      if (isEditMode && selectedProfile) {
        await axios.put(`http://localhost:5000/api/faculty/profile/${selectedProfile._id}`, formData);
        alert('Profile updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/faculty/profile', formData);
        alert('Profile registered successfully!');
      }
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
      setIsRegisterMode(false);
      fetchProfiles(); // Refresh the list of profiles
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onDeleteProfile = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/faculty/profile/${id}`);
      setProfiles(profiles.filter(profile => profile._id !== id));
      alert('Profile deleted successfully');
      setSelectedProfile(null);
      setIsEditMode(false);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onEditProfile = (profile) => {
    setSelectedProfile(profile);
    setIsEditMode(true);
    setIsRegisterMode(true); // Switch to register form for editing
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6">
        {isEditMode ? 'Edit Faculty Profile' : isRegisterMode ? 'Register Faculty Profile' : 'Faculty Profile'}
      </h2>

      {!isRegisterMode && !isViewMode ? (
        <div className="flex space-x-4 mb-6">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsRegisterMode(true)}
          >
            Register Profile
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsViewMode(true)}
          >
            View Profiles
          </button>
        </div>
      ) : isRegisterMode ? (
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div className="form-group">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter name"
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter mobile number"
                required
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doj">
                Date of Joining
              </label>
              <input
                type="date"
                name="doj"
                value={formData.doj}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter address"
              ></textarea>
            </div>

            <div className="form-group">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="designation">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter designation"
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter department"
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="qualification">
                Qualification
              </label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter qualification"
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salary">
                Salary
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter salary"
              />
            </div>

            <div className="form-group flex items-center space-x-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="married">
                Married
              </label>
              <select
                name="married"
                value={formData.married ? 'Yes' : 'No'}
                onChange={onChange}
                className="shadow appearance-none border rounded w-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              {isEditMode ? 'Update Profile' : 'Register Profile'}
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setIsRegisterMode(false);
                setIsEditMode(false);
                setIsViewMode(false);
                setSelectedProfile(null);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : isViewMode ? (
        <div>
          <h3 className="text-2xl font-semibold mb-4">Profiles</h3>
          <div className="grid grid-cols-1 gap-4">
            {profiles.length === 0 ? (
              <p>No profiles found</p>
            ) : (
              profiles.map(profile => (
                <div
                  key={profile._id}
                  className="p-4 border rounded-lg shadow-md"
                >
                  <h4 className="text-xl font-semibold">{profile.name}</h4>
                  <p>Mobile Number: {profile.mobileNumber}</p>
                  <p>Gender: {profile.gender}</p>
                  <p>Date of Birth: {profile.dob}</p>
                  <p>Date of Joining: {profile.doj}</p>
                  <p>Address: {profile.address}</p>
                  <p>Designation: {profile.designation}</p>
                  <p>Department: {profile.department}</p>
                  <p>Qualification: {profile.qualification}</p>
                  <p>Salary: {profile.salary}</p>
                  <p>Married: {profile.married ? 'Yes' : 'No'}</p>
                  <div className="flex space-x-4 mt-4">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => onEditProfile(profile)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => onDeleteProfile(profile._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => {
              setIsViewMode(false);
              setIsRegisterMode(false);
              setIsEditMode(false);
              setSelectedProfile(null);
            }}
          >
            Back
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Profile;
