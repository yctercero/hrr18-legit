import React from 'react';

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