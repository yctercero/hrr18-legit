// Left column is going to hold the list of classes, students, or assignments
import React from 'react';

// Components
import DashboardLeftColItem from './dashboardLeftColItem.jsx';

const DashboardLeftCol = () => {
    return (
        <div className="dashboardLeftCol">
            <h3>Classes</h3>
            <ul>
                <DashboardLeftColItem />
                <DashboardLeftColItem />
                <DashboardLeftColItem />
            </ul>
        </div>
        
    );
};

export default DashboardLeftCol;