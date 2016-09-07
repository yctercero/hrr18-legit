// Will be the indivisual class, student, or assignment
import React from 'react';

const DashboardLeftColItem = () => {
    return (
        <div className="dashboardLeftColItem clearfix">
            <div>
                <h6>Name</h6>
                <p>John Doe</p>
            </div>
            <div>
                <h6>AKA</h6>
                <p>John</p>
            </div>
            <div>
                <i className="fa fa-angle-right fa-2x" aria-hidden="true"></i>
            </div>
        </div>
    );
};

export default DashboardLeftColItem;