// This component renders the summary info of whatever class was clicked on from the left column
import React from 'react';

class DashboardRightColDetail extends React.Component {
    render(){
        return (
            <a onClick={this.getClass.bind(this, this.props.classDetails.id)}>
                <div className="dashboardRightColItem clearfix">
                    <div>
                        <h6>Name</h6>
                        <p>{this.props.studentDetails.name}</p>
                    </div>
                    <div>
                        <h6></h6>
                        <p></p>
                    </div>
                    <div>
                        <i className="fa fa-angle-right fa-2x" aria-hidden="true"></i>
                    </div>
                </div>
            </a>
        );
    }
};

export default DashboardRightColDetail;