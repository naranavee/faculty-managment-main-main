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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg"> 
      <h2 className="text-2xl font-semibold mb-4">
        {isEditMode ? 'Edit Leave Request' : 'Apply for Leave'}
      </h2>
      <form onSubmit={onSubmit}>
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
              });
              setIsEditMode(false);
              setShowLeave(false);
            }}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>

      {!isEditMode && (
        <>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={onViewLeave}>
            View Leave Request
          </button>

          {showLeave && leaveData && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Leave Details</h3>
              <p><strong>Leave Type:</strong> {leaveData.leaveType}</p>
              <p><strong>Start Date:</strong> {new Date(leaveData.startDate).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(leaveData.endDate).toLocaleDateString()}</p>
              <p><strong>Description:</strong> {leaveData.description}</p>
              <div className="flex justify-end mt-4">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={onEditLeave}>
                  Edit Leave
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={onDeleteLeave}>
                  Delete Leave
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ApplyForLeave;