import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './UserList';
import UserForm from './UserForm';

const DemoApp = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users-demo');
            setUsers(response.data);
            return response.data;
        } catch (error) {
            console.error("There was an error fetching the users!", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="App">
            <h1>User Management</h1>
            <UserForm 
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                fetchUsers={fetchUsers}
            />
            <UserList 
                setSelectedUser={setSelectedUser}
                setIsEditing={setIsEditing}
                fetchUsers={fetchUsers}
                users={users}
            />
        </div>
    );
};

export default DemoApp;
