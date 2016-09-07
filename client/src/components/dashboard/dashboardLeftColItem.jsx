// Will be the indivisual class, student, or assignment
import React from 'react';

const DashboardLeftColItem = () => {
    return (
        <div className="dashboardLeftColItem clearfix">
            <div>
                <h6>Title</h6>
                <p>Intro to BioChem</p>
            </div>
            <div>
                <h6>Section</h6>
                <p>01</p>
            </div>
            <div>
                <i className="fa fa-angle-right fa-2x" aria-hidden="true"></i>
            </div>
        </div>
    );
};

export default DashboardLeftColItem;