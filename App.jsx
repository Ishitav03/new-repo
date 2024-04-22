import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';
import UserData from './UserData';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get('/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserData(response.data);
        } catch (error) {
            // Handle error
            console.error('Failed to fetch user data:', error);
        }
    };

    useEffect(() => {
        if (loggedIn) {
            fetchUserData();
        }
    }, [loggedIn]);

    axios.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return (
        <div>
            {loggedIn ? (
                <UserData userData={userData} />
            ) : (
                <LoginForm setLoggedIn={setLoggedIn} />
            )}
        </div>
    );
};

export default App;
