import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Workshop() {
  const [formData, setFormData] = useState({
    facultyMail: '',
    nameOfWorkshop: '',
    venue: '',
    started: '',
    ended: '',
    numberOfDays: ''
  });

  const [workshops, setWorkshops] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showWorkshop, setShowWorkshop] = useState(false);

  useEffect(() => {
    if (showWorkshop) {
      fetchWorkshops();
    }
  }, [showWorkshop]);

  useEffect(() => {
    if (isEditMode && selectedWorkshop) {
      setFormData({
        facultyMail: selectedWorkshop.facultyMail,
        nameOfWorkshop: selectedWorkshop.nameOfWorkshop,
        venue: selectedWorkshop.venue,
        started: selectedWorkshop.started,
        ended: selectedWorkshop.ended,
        numberOfDays: selectedWorkshop.numberOfDays
      });
    }
  }, [isEditMode, selectedWorkshop]);

  const fetchWorkshops = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/faculty/workshops');
      setWorkshops(res.data);
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
      if (isEditMode && selectedWorkshop) {
        await axios.put(`http://localhost:5000/api/faculty/workshops/${selectedWorkshop._id}`, formData);
        alert('Workshop updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/faculty/workshops', formData);
        alert('Workshop registered successfully!');
      }
      setFormData({
        facultyMail: '',
        nameOfWorkshop: '',
        venue: '',
        started: '',
        ended: '',
        numberOfDays: ''
      });
      setIsEditMode(false);
      fetchWorkshops(); // Refresh the list of workshops
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onDeleteWorkshop = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/faculty/workshops/${id}`);
      setWorkshops(workshops.filter(workshop => workshop._id !== id));
      alert('Workshop deleted successfully');
      setSelectedWorkshop(null);
      setIsEditMode(false);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onEditWorkshop = (workshop) => {
    setSelectedWorkshop(workshop);
    setIsEditMode(true);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">
        {isEditMode ? 'Edit Workshop' : 'Workshop'}
      </h2>

      {!showWorkshop ? (
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowWorkshop(true)}
        >
          Register/View Workshops
        </button>
      ) : (
        <>
          <form onSubmit={onSubmit} className="mb-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="facultyMail">
                Faculty Mail:
              </label>
              <input 
                type="email" 
                name="facultyMail" 
                value={formData.facultyMail} 
                onChange={onChange} 
                required 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nameOfWorkshop">
                Name of the Workshop:
              </label>
              <input 
                type="text" 
                name="nameOfWorkshop" 
                value={formData.nameOfWorkshop} 
                onChange={onChange} 
                required 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="venue">
                Venue:
              </label>
              <input 
                type="text" 
                name="venue" 
                value={formData.venue} 
                onChange={onChange} 
                required 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="started">
                Started:
              </label>
              <input 
                type="date" 
                name="started" 
                value={formData.started} 
                onChange={onChange} 
                required 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ended">
                Ended:
              </label>
              <input 
                type="date" 
                name="ended" 
                value={formData.ended} 
                onChange={onChange} 
                required 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberOfDays">
                Number of Days:
              </label>
              <input 
                type="number" 
                name="numberOfDays" 
                value={formData.numberOfDays} 
                onChange={onChange} 
                required 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              />
            </div>
            <div className="flex justify-end mt-4">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                {isEditMode ? 'Update Workshop' : 'Register'}
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setFormData({
                    facultyMail: '',
                    nameOfWorkshop: '',
                    venue: '',
                    started: '',
                    ended: '',
                    numberOfDays: ''
                  });
                  setIsEditMode(false);
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
          {workshops.length > 0 ? (
            workshops.map(workshop => (
              <div key={workshop._id} className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Workshop Details</h3>
                <p><strong>Faculty Mail:</strong> {workshop.facultyMail}</p>
                <p><strong>Name of the Workshop:</strong> {workshop.nameOfWorkshop}</p>
                <p><strong>Venue:</strong> {workshop.venue}</p>
                <p><strong>Started:</strong> {workshop.started}</p>
                <p><strong>Ended:</strong> {workshop.ended}</p>
                <p><strong>Number of Days:</strong> {workshop.numberOfDays}</p>
                <div className="flex justify-end mt-4">
                  <button 
                    onClick={() => onEditWorkshop(workshop)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Edit Workshop
                  </button>
                  <button 
                    onClick={() => onDeleteWorkshop(workshop._id)} 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete Workshop
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No workshops available.</p>
          )}
        </>
      )}
    </div>
  );
}

export default Workshop;
