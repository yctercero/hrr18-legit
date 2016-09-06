import React from 'react';

// Components
import DashboardSummary from './dashboardSummary.jsx';
import DashboardLeftCol from './dashboardLeftCol.jsx';
import DashboardRightCol from './dashboardRightCol.jsx';

const Dashboard = () => {
    return (
        <div className="dashboardWrapper">
            <DashboardSummary />
            <div className="dashboardCols">
                <DashboardLeftCol />
                <DashboardRightCol />
            </div>
        </div>
    );
};

export default Dashboard;