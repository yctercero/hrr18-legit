import React from 'react';

// Components
import DashboardSummary from './dashboardSummary';
import DashboardLeftCol from './dashboardLeftCol';
import DashboardRightCol from './dashboardRightCol';

const Dashboard = () => {
    return (
        <div>
            <DashboardSummary />
            <div>
                <DashboardLeftCol />
                <DashboardRightCol />
            </div>
        </div>
    );
};

export default Dashboard;