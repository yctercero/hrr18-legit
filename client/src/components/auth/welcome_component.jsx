import React from 'react';

// Components
import UnauthHeader from '../headers/unauthorized_header.jsx';

const Welcome = () => {
    return (
        <div className="welcomeWrapper">
            <Login />
        </div>
    );
};

export default Welcome;