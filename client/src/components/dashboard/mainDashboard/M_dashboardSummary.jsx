// Dashboard summary is the component above the two columns in the dashboard
import React from 'react';

<<<<<<< HEAD
const DashboardSummary = ({ email, numberClasses }) => {
=======
<<<<<<< HEAD
const DashboardSummary = ({ email, numberClasses }) => {
=======
const DashboardSummary = ({ email }) => {
>>>>>>> cd3ca655317bc19bc1a5da5e8aae0b8ef5311b08
>>>>>>> d8e43a6a2c726121c6f6954ea4417960ac2e70c7
    return (
        <div className="clearfix dashboardSummary">
            <div className="dashboardSummaryProf">
                <img src="http://www.globaldetroit.com/wp-content/uploads/2014/10/Gracie-Headshot-square.png" alt=""/>
                <h3>{email}</h3>
            </div>
            <div className="dashboardSummaryStats clearfix">
                <div>
                    <p>{numberClasses}</p>
                    <h5>Number of Classes</h5>
                </div>
                <div>
                    <p>24</p>
                    <h5>Average Class Size</h5>
                </div>
                <div>
                    <p>134</p>
                    <h5># of School Days Left</h5>
                </div>
            </div>
        </div>
    );
};

export default DashboardSummary;