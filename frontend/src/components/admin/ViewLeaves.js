import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewLeaves() {
  const [leaveData, setLeaveData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/faculty/leave'); // Adjust the API endpoint as needed
        setLeaveData(res.data);
        setFormData(res.data); // Initialize form data with fetched leave data
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchLeave();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:5000/api/faculty/leave', formData);
      setLeaveData(res.data);
      setEditMode(false);
      alert('Leave details updated successfully!');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete('http://localhost:5000/api/faculty/leave');
      setLeaveData(null);
      setEditMode(false);
      alert('Leave details deleted successfully!');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Leave Details</h2>

      {editMode ? (
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="leaveType">Leave Type:</label>
            <select 
            name="leaveType" 
            value={formData.leaveType} 
            onChange={onChange} 
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Leave Type</option>
            <option value="Personal">Personal</option>
            <option value="Sick">Sick</option>
          </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={onChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">End Date:</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={onChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex justify-end mt-4">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
              Update Leave
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
          {leaveData ? (
            <div>
              <p><strong>Leave Type:</strong> {leaveData.leaveType}</p>
              <p><strong>Start Date:</strong> {new Date(leaveData.startDate).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(leaveData.endDate).toLocaleDateString()}</p>
              <p><strong>Description:</strong> {leaveData.description}</p>
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
            <p>No leave data available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ViewLeaves;
