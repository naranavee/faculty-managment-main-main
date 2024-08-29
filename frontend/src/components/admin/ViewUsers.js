import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewUsers() {
  const [usersData, setUsersData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [deleteUser, setDeleteUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/faculty');
        setUsersData(res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/auth/faculty/${currentUser._id}`, formData);
      setUsersData((prevUsers) =>
        prevUsers.map((user) =>
          user._id === currentUser._id ? { ...user, ...formData } : user
        )
      );
      setEditMode(false);
      setCurrentUser(null);
      setFormData({ name: '', email: '' });
      alert('User updated successfully!');
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const onSubmitDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:5000/api/auth/faculty/${deleteUser._id}`);
      setUsersData((prevUsers) => prevUsers.filter((user) => user._id !== deleteUser._id));
      setDeleteUser(null);
      alert('User deleted successfully!');
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const startEdit = (user) => {
    setFormData({ name: user.name, email: user.email });
    setCurrentUser(user);
    setEditMode(true);
  };

  const startDelete = (user) => {
    setDeleteUser(user);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">View Users</h2>

      {editMode ? (
        <form onSubmit={onSubmitUpdate} className="mb-8 p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Edit User</h3>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name:</label>
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled
            />
          </div>

          <div className="flex justify-end mt-4">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
              Update User
            </button>
            <button
              type="button"
              onClick={() => {
                setEditMode(false);
                setCurrentUser(null);
                setFormData({ name: '', email: '' });
              }}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="mb-8">
          {usersData.length > 0 ? (
            <div className="flex flex-wrap -mx-2">
              {usersData.map((user) => (
                <div key={user._id} className="mb-6 px-2 w-full md:w-1/2 lg:w-1/3">
                  <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => startEdit(user)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => startDelete(user)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No users available.</p>
          )}
        </div>
      )}

      {deleteUser && (
        <form onSubmit={onSubmitDelete} className="p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
          <p>Are you sure you want to delete <strong>{deleteUser.name}</strong>?</p>
          <div className="flex justify-end mt-4">
            <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
              Delete
            </button>
            <button
              type="button"
              onClick={() => setDeleteUser(null)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ViewUsers;
