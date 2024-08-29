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
        name: '', mobileNumber: '', gender: '', dob: '', doj: '',
        address: '', designation: '', department: '', qualification: '',
        salary: '', married: false
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">
        {isEditMode ? 'Edit Faculty Profile' : 'Faculty Profile'}
      </h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name:
          </label>
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">
            Mobile Number:
          </label>
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
            Gender:
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={onChange}
            required
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
            Date of Birth:
          </label>
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doj">
            Date of Joining:
          </label>
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Address:
          </label>
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="designation">
            Designation:
          </label>
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
            Department:
          </label>
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="qualification">
            Qualification:
          </label>
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salary">
            Salary:
          </label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={onChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="married">
            Married:
          </label>
          <select
            name="married"
            value={formData.married ? 'Yes' : 'No'}
            onChange={onChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isEditMode ? 'Update Profile' : 'Register Profile'}
          </button>
          {isEditMode && (
            <button
              type="button"
              onClick={() => setIsEditMode(false)}
              className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {showProfile && profileData && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Profile Details</h3>
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
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={onEditProfile}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Edit Profile
            </button>
            <button
              onClick={onDeleteProfile}
              className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Delete Profile
            </button>
          </div>
        </div>
      )}

      {!showProfile && (
        <div className="mt-6">
          <button
            onClick={onViewProfile}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            View Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
