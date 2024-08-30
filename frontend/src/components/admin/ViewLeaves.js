import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentLeave, setCurrentLeave] = useState(null);
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/faculty/leave');
        setLeaves(res.data);
        if (res.data.length > 0) {
          setCurrentLeave(res.data[0]);
          setFormData(res.data[0]); // Initialize form data with the first leave data
        }
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchLeaves();
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
      if (currentLeave) {
        const res = await axios.put(`http://localhost:5000/api/faculty/leave/${currentLeave._id}`, formData);
        setLeaves(leaves.map(leave => leave._id === res.data._id ? res.data : leave));
        setCurrentLeave(res.data);
        alert('Leave details updated successfully!');
      }
      setEditMode(false);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/faculty/leave/${id}`);
      setLeaves(leaves.filter(leave => leave._id !== id));
      setEditMode(false);
      setCurrentLeave(null);
      alert('Leave details deleted successfully!');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleEditClick = (leave) => {
    setCurrentLeave(leave);
    setFormData({
      leaveType: leave.leaveType,
      startDate: leave.startDate,
      endDate: leave.endDate,
      description: leave.description,
    });
    setEditMode(true);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Leave Details</h2>

      {editMode ? (
        <form onSubmit={onSubmit}>
          {/* Form for editing the leave details */}
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

          {/* Other form fields... */}

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
        <div className="flex flex-wrap -mx-4">
          {leaves.length > 0 ? (
            leaves.map(leave => (
              <div key={leave._id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="font-semibold">Leave Type:</div>
                    <div>{leave.leaveType}</div>
                    <div className="font-semibold">Start Date:</div>
                    <div>{new Date(leave.startDate).toLocaleDateString()}</div>
                    <div className="font-semibold">End Date:</div>
                    <div>{new Date(leave.endDate).toLocaleDateString()}</div>
                    <div className="font-semibold">Description:</div>
                    <div>{leave.description}</div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => handleEditClick(leave)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(leave._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-full">No leave data available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ViewLeaves;
