import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewWorkshop() {
  const [workshops, setWorkshops] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentWorkshop, setCurrentWorkshop] = useState(null);
  const [formData, setFormData] = useState({
    facultyMail: '',
    nameOfWorkshop: '',
    venue: '',
    started: '',
    ended: '',
    numberOfDays: '',
    approved: 'No', // Added approved field
  });

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/faculty/workshops'); // Fetch all workshops
        setWorkshops(res.data);
        if (res.data.length > 0) {
          setCurrentWorkshop(res.data[0]);
          setFormData(res.data[0]); // Initialize form data with the first workshop data
        }
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchWorkshops();
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
      const res = await axios.put(`http://localhost:5000/api/faculty/workshops/${currentWorkshop._id}`, formData);
      setWorkshops(workshops.map(workshop => workshop._id === res.data._id ? res.data : workshop));
      setCurrentWorkshop(res.data);
      setEditMode(false);
      alert('Workshop updated successfully!');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/faculty/workshops/${id}`);
      setWorkshops(workshops.filter(workshop => workshop._id !== id));
      setEditMode(false);
      setCurrentWorkshop(null);
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

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="approved">Approved:</label>
            <select
              name="approved"
              value={formData.approved}
              onChange={onChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
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
          {workshops.length > 0 ? (
            <div>
              {workshops.map(workshop => (
                <div key={workshop._id} className="mb-4">
                  <p><strong>Faculty Mail:</strong> {workshop.facultyMail}</p>
                  <p><strong>Name of the Workshop:</strong> {workshop.nameOfWorkshop}</p>
                  <p><strong>Venue:</strong> {workshop.venue}</p>
                  <p><strong>Started:</strong> {workshop.started}</p>
                  <p><strong>Ended:</strong> {workshop.ended}</p>
                  <p><strong>Number of Days:</strong> {workshop.numberOfDays}</p>
                  <p><strong>Approved:</strong> {workshop.approved}</p>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => { setCurrentWorkshop(workshop); setFormData(workshop); setEditMode(true); }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(workshop._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
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
