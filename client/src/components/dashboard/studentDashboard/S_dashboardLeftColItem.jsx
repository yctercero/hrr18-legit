// Will be the indivisual class, student, or assignment
import React from 'react';

const DashboardLeftColItem = () => {
    return (
        <div className="dashboardLeftColItem clearfix">
            <div>
                <h6>Title</h6>
                <p>Times tables</p>
            </div>
            <div>
                <h6>Type</h6>
                <p>HW</p>
            </div>
            <div>
                <i className="fa fa-angle-right fa-2x" aria-hidden="true"></i>
            </div>
        </div>
    );
};

export default DashboardLeftColItem;