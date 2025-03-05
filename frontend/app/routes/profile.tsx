import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
    const [username] = useState('JohnDoe');
    const [profilePicture, setProfilePicture] = useState('default-profile-pic.jpg');
    const [newProfilePicture, setNewProfilePicture] = useState<string | null>(null);
    const history = useNavigate();

    const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProfilePicture(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleConfirmChange = () => {
        if (newProfilePicture) {
            setProfilePicture(newProfilePicture);
            alert('Profile picture updated!');
            history('/');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Profile Page</h1>
            <div style={styles.profileContainer}>
                <img src={profilePicture} alt="Profile" style={styles.profilePicture} />
                <h2 style={styles.username}>{username}</h2>
                <input type="file" onChange={handleProfilePictureChange} style={styles.fileInput} />
                {newProfilePicture && (
                    <button onClick={handleConfirmChange} style={styles.button}>Confirm Change</button>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'white',
        color: 'black',
    },
    header: {
        marginBottom: '20px',
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    profilePicture: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        marginBottom: '10px',
    },
    username: {
        marginBottom: '20px',
    },
    fileInput: {
        marginBottom: '10px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default Profile;