import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ApplyForLeave() {
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    description: '',
    approved: 'No'  // Initialize approved field
  });

  const [leaves, setLeaves] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isApplyMode, setIsApplyMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);

  useEffect(() => {
    if (isViewMode) {
      fetchLeaves();
    }
  }, [isViewMode]);

  useEffect(() => {
    if (isEditMode && selectedLeave) {
      setFormData({
        leaveType: selectedLeave.leaveType,
        startDate: selectedLeave.startDate,
        endDate: selectedLeave.endDate,
        description: selectedLeave.description,
        approved: selectedLeave.approved  // Load the approved status when editing
      });
    }
  }, [isEditMode, selectedLeave]);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/faculty/leave');
      setLeaves(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode && selectedLeave) {
        await axios.put(`http://localhost:5000/api/faculty/leave/${selectedLeave._id}`, formData);
        alert('Leave request updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/faculty/leave', formData);
        alert('Leave request submitted successfully!');
      }
      setFormData({
        leaveType: '',
        startDate: '',
        endDate: '',
        description: '',
        approved: 'No'  // Reset the approved field after submission
      });
      setIsEditMode(false);
      setIsApplyMode(false);
      fetchLeaves(); // Refresh the list of leaves
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onDeleteLeave = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/faculty/leave/${id}`);
      setLeaves(leaves.filter(leave => leave._id !== id));
      alert('Leave request deleted successfully');
      setSelectedLeave(null);
      setIsEditMode(false);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onEditLeave = (leave) => {
    setSelectedLeave(leave);
    setIsEditMode(true);
    setIsApplyMode(true);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">
        {isEditMode ? 'Edit Leave Request' : 'Apply for Leave'}
      </h2>

      {!isApplyMode && !isViewMode && (
        <div className="flex justify-between">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsApplyMode(true)}
          >
            Apply for Leave
          </button>
          <button 
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsViewMode(true)}
          >
            View Leave Requests
          </button>
        </div>
      )}

      {isApplyMode && (
        <>
          <form onSubmit={onSubmit} className="mb-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="leaveType">
                Leave Type:
              </label>
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                Start Date:
              </label>
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                End Date:
              </label>
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description:
              </label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={onChange} 
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="approved">
                Approved:
              </label>
              <select 
                name="approved" 
                value={formData.approved} 
                onChange={onChange} 
                disabled={isEditMode}  // Disable in edit mode
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            <div className="flex justify-end mt-4">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                {isEditMode ? 'Update Leave' : 'Submit Leave'}
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setFormData({
                    leaveType: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                    approved: 'No'  // Reset the approved field
                  });
                  setIsEditMode(false);
                  setIsApplyMode(false);
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
          <button 
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4"
            onClick={() => setIsApplyMode(false)}
          >
            Back to Apply/View Options
          </button>
        </>
      )}

      {isViewMode && (
        <>
          {leaves.length > 0 ? (
            leaves.map(leave => (
              <div key={leave._id} className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Leave Details</h3>
                <p><strong>Leave Type:</strong> {leave.leaveType}</p>
                <p><strong>Start Date:</strong> {new Date(leave.startDate).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {new Date(leave.endDate).toLocaleDateString()}</p>
                <p><strong>Description:</strong> {leave.description}</p>
                <p><strong>Approved:</strong> {leave.approved}</p> {/* Display approval status */}
                <div className="flex justify-end mt-4">
                  <button 
                    onClick={() => onEditLeave(leave)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Edit Leave
                  </button>
                  <button 
                    onClick={() => onDeleteLeave(leave._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete Leave
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="mt-4">No leave requests found.</p>
          )}
          <button 
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4"
            onClick={() => setIsViewMode(false)}
          >
            Back to Apply/View Options
          </button>
        </>
      )}
    </div>
  );
}

export default ApplyForLeave;
