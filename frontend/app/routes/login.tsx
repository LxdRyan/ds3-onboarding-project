import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle login logic here
        console.log('Username:', username);
        console.log('Password:', password);
        // Navigate to home page
        navigate('/');
    };

    const handleSignUp = () => {
        navigate('/signup');
    };


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '500px', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ color: 'black', textAlign: 'center', marginBottom: '20px' }}>Login</h2>
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
                <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Login
                </button>
                <span style={{ margin: '0 10px' }}></span>
                <button style={{color: "black"}}type="button" onClick={handleSignUp}>New User</button>
            </form>
        </div>
    );
};

export default LoginPage;