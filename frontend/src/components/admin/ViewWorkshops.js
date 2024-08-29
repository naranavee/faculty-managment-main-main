import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewWorkshop() {
  const [workshopData, setWorkshopData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    facultyMail: '',
    nameOfWorkshop: '',
    venue: '',
    started: '',
    ended: '',
    numberOfDays: '',
  });

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/faculty/workshop'); // Adjust the API endpoint as needed
        setWorkshopData(res.data);
        setFormData(res.data); // Initialize form data with fetched workshop data
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchWorkshop();
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
      const res = await axios.put('http://localhost:5000/api/faculty/workshop', formData);
      setWorkshopData(res.data);
      setEditMode(false);
      alert('Workshop updated successfully!');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete('http://localhost:5000/api/faculty/workshop');
      setWorkshopData(null);
      setEditMode(false);
      alert('Workshop deleted successfully!');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Workshop Details</h2>

      {editMode ? (
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="facultyMail">Faculty Mail:</label>
            <input
              type="text"
              name="facultyMail"
              value={formData.facultyMail}
              onChange={onChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nameOfWorkshop">Name of the Workshop:</label>
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="venue">Venue:</label>
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="started">Started:</label>
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ended">Ended:</label>
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberOfDays">Number of Days:</label>
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
              Update Workshop
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
          {workshopData ? (
            <div>
              <p><strong>Faculty Mail:</strong> {workshopData.facultyMail}</p>
              <p><strong>Name of the Workshop:</strong> {workshopData.nameOfWorkshop}</p>
              <p><strong>Venue:</strong> {workshopData.venue}</p>
              <p><strong>Started:</strong> {workshopData.started}</p>
              <p><strong>Ended:</strong> {workshopData.ended}</p>
              <p><strong>Number of Days:</strong> {workshopData.numberOfDays}</p>
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
            <p>No workshop data available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ViewWorkshop;
