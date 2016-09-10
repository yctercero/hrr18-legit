// This component renders the summary info of whatever class was clicked on from the left column
import React from 'react';

//Router
import { browserHistory } from 'react-router';

class DashboardRightColItem extends React.Component {
    constructor(props){
        super(props)
    }

    getStudent(id){
        localStorage.setItem('studentId', id);
        browserHistory.push('/student');
    }
    
    render(){
        return (
            <a  onClick={this.getStudent.bind(this, this.props.student.id)}>
                <div className="dashboardRightColItem clearfix">
                    <div>
                        <h6>Name</h6>
                        <p>{this.props.student.first}</p>
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

export default DashboardRightColItem;