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
            email: '',
            numberClasses: ''
        }
    }

     componentDidMount() {
        let that = this;
        var id = localStorage.getItem('userid');
        $.ajax({
            method: "GET",
            url: `/api/report/users/${id}`,
            contentType: 'application/json',
            data: {},
            success: function(data){
                // console.log(data);
                that.setState({ 
                    classes: data.classes,
                    email: data.details.email ,
                    numberClasses: data.classes.length
                })
            }
        })
    }

    render() {
            if(this.state.isAuthenticated){
                return (
                    <div>
                        <Header />
                        <main>
                            <div className="dashboardWrapper">
                                <DashboardSummary email={this.state.email} numberClasses={this.state.numberClasses}/>
                                <div className="dashboardCols">
                                    <div>
                                        <h3>Classes <a href="/classform"><i className="fa fa-plus" aria-hidden="true"></i></a></h3>
                                        <DashboardLeftCol classes={this.state.classes}/>
                                    </div>
                                    <div>
                                        <h3>Students</h3>
                                        <DashboardRightCol />
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