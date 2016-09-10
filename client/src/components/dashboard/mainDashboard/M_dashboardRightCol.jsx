// Right column is going to hold the preview of class, student, or assignment that was clicked on from left column
import React from 'react';
import DashboardRightColItem from './M_dashboardRightColItem.jsx';


const DashboardRightCol = ({students}) => {
    return (
        <div className="dashboardRightCol">
            <ul>
                {students.map((student) =>
                    <DashboardRightColItem
                        key={student.id}
                        student={student}
                    />
                )}
            </ul>
        </div>
    );
};

export default DashboardRightCol;


