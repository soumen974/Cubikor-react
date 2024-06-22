import React from 'react';
import axios from 'axios';

const UserList = ({ users, setSelectedUser, setIsEditing, fetchUsers }) => {
  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this user?')) {
        await axios.delete(`http://localhost:5000/api/users-demo/${id}`);
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Image</th>
            <th>Resume</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.image && (
                  <img src={`http://localhost:5000/${user.image}`} alt="User" style={{ width: '100px', height: 'auto' }} />
                )}
              </td>
              <td>
                {user.resume && (
                    <a href={`http://localhost:5000/${user.resume}`} target="_blank" rel="noopener noreferrer">Resume</a>
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
