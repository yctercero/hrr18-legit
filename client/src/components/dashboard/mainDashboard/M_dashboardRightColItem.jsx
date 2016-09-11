//Individual students
//React
import React from 'react';

//Router
import { browserHistory } from 'react-router';

class DashboardRightColItem extends React.Component {
    constructor(props){
        super(props)
    }

    getStudent(id){
        //store student id in local storage so that it can be used
        //in the students dashboard to make api call to get student details
        localStorage.setItem('studentId', id);
        //redirect user to that particular students dashboard
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