import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewUsers() {
  const [usersData, setUsersData] = useState([]);

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

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">View Users</h2>
      {usersData.length > 0 ? (
        usersData.map((user) => (
          <div key={user.email} className="mb-6">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ))
      ) : (
        <p>No users available.</p>
      )}
    </div>
  );
}

export default ViewUsers;
