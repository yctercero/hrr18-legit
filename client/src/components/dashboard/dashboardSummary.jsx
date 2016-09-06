// Dashboard summary is the component above the two columns in the dashboard
import React from 'react';

const DashboardSummary = () => {
    return (
        <div className="clearfix">
            <div className="dashboardSummaryProf">
                <img src="./roo.JPG" alt=""/>
                <h3>@Username</h3>
                <a className="button">Edit Profile</a>
            </div>
            <div className="dashboardSummaryStats clearfix">
                <div>
                    <p>04</p>
                    <h5>Number of Classes</h5>
                </div>
                <div>
                    <p>24</p>
                    <h5>Average Class Size</h5>
                </div>
                <div>
                    <p>34</p>
                    <h5>Some other Stat</h5>
                </div>
            </div>
        </div>
    );
};

export default DashboardSummary;