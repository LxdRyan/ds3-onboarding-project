import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '~/services/axios';

const SignUpPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        setError("");

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        if (profilePicture) {
            formData.append('profilePicture', profilePicture);
        }

        try {
            const response = await axiosInstance.post('/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                console.log('Sign-Up Successful:', response.data);
                alert('Sign-Up successful!');
                // Navigate to login page
                navigate('/login');
            } else {
                setError(response.data.message || 'Sign-Up failed');
            }
        } catch (error) {
            console.error('Sign-Up failed:', error);
            setError('Sign-Up failed!');
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setProfilePicture(file);
            setProfilePictureUrl(URL.createObjectURL(file));
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '500px', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ color: 'black', textAlign: 'center', marginBottom: '20px' }}>Sign Up</h2>
                <label style={{ color: 'black', marginBottom: '10px' }}>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{marginLeft:"10px", marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </label>
                <label style={{ color: 'black', marginBottom: '10px' }}>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{marginLeft:"10px", marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </label>
                <label style={{ color: 'black', marginBottom: '10px' }}>
                    Confirm Password:
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={{marginLeft:"10px", marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </label>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <label style={{ color: 'black', marginBottom: '10px' }}>
                    Profile Picture:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </label>
                {profilePictureUrl && (
                    <img src={profilePictureUrl} alt="Profile" style={{ marginBottom: '10px', width: '100%', borderRadius: '4px' }} />
                )}
                <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUpPage;
