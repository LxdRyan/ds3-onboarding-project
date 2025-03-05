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
        <div>
            <h1>Profile Page</h1>
            <div>
                <img src={profilePicture} alt="Profile" width="150" height="150" />
                <h2>{username}</h2>
                <input type="file" onChange={handleProfilePictureChange} />
                {newProfilePicture && (
                    <button onClick={handleConfirmChange}>Confirm Change</button>
                )}
            </div>
        </div>
    );
};

export default Profile;