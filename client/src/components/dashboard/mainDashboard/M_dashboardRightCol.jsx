// Right column is going to hold the preview of class, student, or assignment that was clicked on from left column
import React from 'react';
import DashboardRightColDetail from './M_dashboardRightColDetail.jsx';


const DashboardRightCol = () => {
    return (
        <div className="dashboardRightCol">
            <ul>
                
            </ul>
        </div>
    );
};

export default DashboardRightCol;


// {classes.map((classDetails) =>
//                     <DashboardLeftColItem
//                         key={classDetails.id}
//                         classDetails={classDetails}
//                     />
//                 )}