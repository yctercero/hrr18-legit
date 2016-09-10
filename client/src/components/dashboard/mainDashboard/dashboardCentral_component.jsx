import React, { Component, PropTypes, ContextTypes } from 'react';
import { browserHistory } from 'react-router'

// Redux
import { connect } from 'react-redux';

// Components
import Header from '../../headers/authorized_header.jsx';
import DashboardSummary from './M_dashboardSummary.jsx';
import DashboardLeftCol from './M_dashboardLeftCol.jsx';
import DashboardRightCol from './M_dashboardRightCol.jsx';


class Dashboard extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isAuthenticated: this.props.isAuthenticated,
            classes: [],
            students: [],
            email: '',
            numberClasses: 0,
            numberStudents: 0
        }
    }

     componentWillMount() {
        let that = this;
        var id = localStorage.getItem('userid');
        this.serverRequest = $.ajax({
            method: "GET",
            url: `/api/report/users/${id}`,
            contentType: 'application/json',
            data: {},
            success: function(data){
                // console.log(data);
                that.setState({ 
                    classes: data.classes,
                    students: data.students,
                    email: data.details.email ,
                    numberClasses: data.classes.length,
                    numberStudents: data.students.length
                })
            }
        })
    }

    componentWillUnmount () {
        this.serverRequest.abort();
    }

    render() {
            if(this.state.isAuthenticated){
                return (
                    <div>
                        <Header />
                        <main>
                            <div className="dashboardWrapper">
                                <DashboardSummary email={this.state.email} numberClasses={this.state.numberClasses} numberStudents={this.state.numberStudents}/>
                                <div className="dashboardCols clearfix">
                                    <div>
                                        <h3><a href="/classform"><i className="fa fa-plus" aria-hidden="true"></i></a> Classes </h3>
                                        <DashboardLeftCol classes={this.state.classes} />
                                    </div>
                                    <div>
                                        <h3>Students</h3>
                                        <DashboardRightCol students={this.state.students} />
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                    
                );
            }else{
                return(
                    <div>
                        {browserHistory.push('/signin')}
                    </div>
                )
            }
            
        
    }
};


function mapStateToProps(state) {
    // console.log("STATE", state);
    return {
        isAuthenticated: state.signin.isAuthenticated,
        token: state.signin.token
    }
}

export default connect(mapStateToProps)(Dashboard);