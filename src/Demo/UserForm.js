import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ selectedUser, setSelectedUser, isEditing, setIsEditing, fetchUsers }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [resume, setResume] = useState(null);

    useEffect(() => {
        if (isEditing && selectedUser) {
            setName(selectedUser.name);
            setEmail(selectedUser.email);
        } else {
            setName('');
            setEmail('');
        }
    }, [isEditing, selectedUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        if (image) formData.append('image', image);
        if (resume) formData.append('resume', resume);

        try {
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/users-demo/${selectedUser.id}`, formData);
            } else {
                await axios.post('http://localhost:5000/api/users-demo', formData);
            }
            fetchUsers();
            resetForm();
        } catch (error) {
            console.error("There was an error saving the user!", error);
        }
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setImage(null);
        setResume(null);
        setSelectedUser(null);
        setIsEditing(false);
    };

    return (
        <div>
            <h2>{isEditing ? 'Edit User' : 'Add User'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div>
                    <label>Resume:</label>
                    <input type="file" onChange={(e) => setResume(e.target.files[0])} />
                </div>
                <button type="submit">{isEditing ? 'Update' : 'Add'} User</button>
                {isEditing && <button type="button" onClick={resetForm}>Cancel</button>}
            </form>
        </div>
    );
};

export default UserForm;
