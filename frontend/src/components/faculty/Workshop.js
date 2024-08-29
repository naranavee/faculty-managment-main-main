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

  const [workshopData, setWorkshopData] = useState(null);
  const [showWorkshop, setShowWorkshop] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (isEditMode && workshopData) {
      setFormData({
        facultyMail: workshopData.facultyMail,
        nameOfWorkshop: workshopData.nameOfWorkshop,
        venue: workshopData.venue,
        started: workshopData.started,
        ended: workshopData.ended,
        numberOfDays: workshopData.numberOfDays
      });
    }
  }, [isEditMode, workshopData]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        await axios.put('http://localhost:5000/api/faculty/workshop', formData);
        alert('Workshop updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/faculty/workshop', formData);
        alert('Workshop registered successfully!');
      }

      // Reset form and mode after submission
      setFormData({
        facultyMail: '',
        nameOfWorkshop: '',
        venue: '',
        started: '',
        ended: '',
        numberOfDays: ''
      });
      setIsEditMode(false);
      setShowWorkshop(false);

    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onViewWorkshop = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/faculty/workshop');
      setWorkshopData(res.data);
      setShowWorkshop(true);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onDeleteWorkshop = async () => {
    try {
      await axios.delete('http://localhost:5000/api/faculty/workshop');
      alert('Workshop deleted successfully');
      setWorkshopData(null);
      setShowWorkshop(false);
      setIsEditMode(false);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onEditWorkshop = () => {
    setIsEditMode(true);
    setShowWorkshop(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">
        {isEditMode ? 'Edit Workshop' : 'Workshop'}
      </h2>
      <form onSubmit={onSubmit}>
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
              setShowWorkshop(false);
            }}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>

      {!isEditMode && (
        <>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={onViewWorkshop}>
            View Workshop
          </button>

          {showWorkshop && workshopData && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Workshop Details</h3>
              <p><strong>Faculty Mail:</strong> {workshopData.facultyMail}</p>
              <p><strong>Name of the Workshop:</strong> {workshopData.nameOfWorkshop}</p>
              <p><strong>Venue:</strong> {workshopData.venue}</p>
              <p><strong>Started:</strong> {workshopData.started}</p>
              <p><strong>Ended:</strong> {workshopData.ended}</p>
              <p><strong>Number of Days:</strong> {workshopData.numberOfDays}</p>
              <div className="flex justify-end mt-4">
                <button 
                  onClick={onEditWorkshop} 
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Edit Workshop
                </button>
                <button 
                  onClick={onDeleteWorkshop} 
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete Workshop
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Workshop;
