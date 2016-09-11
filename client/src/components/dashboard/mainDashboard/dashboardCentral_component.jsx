//React
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
            // getting access to isAuthenticated throught the
            // mapStateToProps method at the bottom of doc
            isAuthenticated: this.props.isAuthenticated,
            classes: [],
            students: [],
            first: '',
            numberClasses: 0,
            numberStudents: 0
        }
    }

     componentWillMount() {
        let that = this;
         // userid being saved in storage upon successfull signup or login
        var id = localStorage.getItem('userid');
         // api request using userid saved in localStorage
         // will get back the user's info, their classes, and their students
        this.serverRequest = $.ajax({
            method: "GET",
            url: `/api/report/users/${id}`,
            contentType: 'application/json',
            data: {},
            success: function(data){
                // update the state
                that.setState({ 
                    classes: data.classes,
                    students: data.students,
                    first: data.details.first || 'Welcome!',
                    numberClasses: data.classes.length,
                    numberStudents: data.students.length
                })
            }
        })
    }

    componentWillUnmount () {
        //kill all server requests if there are 
        //any still going once component is being unmounted
        this.serverRequest.abort();
    }

    render() {
            if(this.state.isAuthenticated){
                return (
                    <div>
                        <Header />
                        <main>
                            <div className="dashboardWrapper">
                                <DashboardSummary first={this.state.first} numberClasses={this.state.numberClasses} numberStudents={this.state.numberStudents}/>
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

// state argument is coming from reducers/index.js, which is pulling from
// the auth reducer, reducers/auth_reducer.js
function mapStateToProps(state) {
    // console.log("STATE", state);
    return {
        isAuthenticated: state.auth.isAuthenticated,
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(Dashboard);