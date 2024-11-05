import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../App.css';
import { FcEditImage, FcCheckmark } from 'react-icons/fc';

const Todos = () => {
    const { userId } = useParams();
    const [todos, setTodos] = useState([]);
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Load user data from localStorage or API
        const storedUser = JSON.parse(localStorage.getItem(`user_${userId}`));
        if (storedUser) {
            setUser(storedUser);
        } else {
            axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
                .then(response => {
                    setUser(response.data);
                    // Save to localStorage
                    localStorage.setItem(`user_${userId}`, JSON.stringify(response.data));
                })
                .catch(error => console.error('Error fetching user details:', error));
        }

        // Fetch todos
        axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
            .then(response => setTodos(response.data))
            .catch(error => console.error('Error fetching todos:', error));
    }, [userId]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        // Save user data to localStorage
        localStorage.setItem(`user_${userId}`, JSON.stringify(user));
        // Exit editing mode
        setIsEditing(false);
    };

    const handleChange = (e, field, nestedField) => {
        if (nestedField) {
            setUser(prevUser => ({
                ...prevUser,
                [field]: {
                    ...prevUser[field],
                    [nestedField]: e.target.value
                }
            }));
        } else {
            setUser(prevUser => ({
                ...prevUser,
                [field]: e.target.value
            }));
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="container">
            <div className="user-header">
                <h1>{user.name}</h1>
            </div>
            <div className="sections-container">
                <div className="section">
                    <h2>To-do List</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map(todo => (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.title}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="section">
                    <h2>About</h2>
                    {isEditing ? (
                        <table>
                            <tbody>
                                <tr>
                                    <td className="attribs">ID</td>
                                    <td>{user.id}</td>
                                </tr>
                                <tr>
                                    <td className="attribs">Name</td>
                                    <td>{user.name}</td>
                                </tr>
                                <tr>
                                    <td  className="attribs">Email</td>
                                    <td>
                                        <input
                                            type="email"
                                            value={user.email}
                                            onChange={(e) => handleChange(e, 'email')}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="attribs">Address</td>
                                    <td>
                                        <input
                                            type="text"
                                            value={user.address.street}
                                            onChange={(e) => handleChange(e, 'address', 'street')}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="attribs">Phone</td>
                                    <td>
                                        <input
                                            type="text"
                                            value={user.phone}
                                            onChange={(e) => handleChange(e, 'phone')}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="attribs">Website</td>
                                    <td>
                                        <input
                                            type="text"
                                            value={user.website}
                                            onChange={(e) => handleChange(e, 'website')}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="attribs">Company</td>
                                    <td>
                                        <input
                                            type="text"
                                            value={user.company.name}
                                            onChange={(e) => handleChange(e, 'company', 'name')}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <table>
                            <tbody>
                                <tr>
                                    <td className="attribs">ID</td>
                                    <td>{user.id}</td>
                                </tr>
                                <tr>
                                    <td className="attribs">Name</td>
                                    <td>{user.name}</td>
                                </tr>
                                <tr>
                                    <td className="attribs">Email</td>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <td className="attribs">Address</td>
                                    <td>{`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</td>
                                </tr>
                                <tr>
                                    <td className="attribs">Phone</td>
                                    <td>{user.phone}</td>
                                </tr>
                                <tr>
                                    <td className="attribs">Website</td>
                                    <td>{user.website}</td>
                                </tr>
                                <tr>
                                    <td className="attribs">Company</td>
                                    <td>{user.company.name}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                    <div id="edittable">
                        {isEditing ? (
                            <FcCheckmark onClick={handleSaveClick} className="icon" />
                        ) : (
                            <FcEditImage onClick={handleEditClick} className="icon" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Todos;
