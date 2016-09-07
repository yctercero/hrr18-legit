// Dashboard summary is the component above the two columns in the dashboard
import React from 'react';

import Dashboard from './dashboard/dashboard.jsx';
import Header from './headers/authorized_header.jsx';

const App = () => {
    return (
        <div>
            <Header />
            <Dashboard />
        </div>
    );
};

export default App;