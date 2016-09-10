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
        console.log(props);
        this.state = {
            isAuthenticated: this.props.isAuthenticated,
            classes: [],
<<<<<<< HEAD
            email: '',
            numberClasses: ''
=======
            email: ''
>>>>>>> cd3ca655317bc19bc1a5da5e8aae0b8ef5311b08
        }
    }

     componentWillMount() {
        this.getInfo();
    }

    getInfo(){
        let that = this;
        var id = localStorage.getItem('userid');
        console.log("FETCHFETCHFETCH")
        $.ajax({
            method: "GET",
            url: `/api/report/users/${id}`,
            contentType: 'application/json',
            data: {},
            success: function(data){
                console.log(data);
                // that.fetchClasses(data);
                that.setState({ 
                    classes: data.classes,
<<<<<<< HEAD
                    email: data.details.email ,
                    numberClasses: data.classes.length
=======
                    email: data.details.email 
>>>>>>> cd3ca655317bc19bc1a5da5e8aae0b8ef5311b08
                })
            }
        })


    }

    render() {
            console.log(this.props.isAuthenticated)
            if(this.state.isAuthenticated){
                return (
                    <div>
                        <Header />
                        <main>
                            <div className="dashboardWrapper">
<<<<<<< HEAD
                                <DashboardSummary email={this.state.email} numberClasses={this.state.numberClasses}/>
=======
                                <DashboardSummary email={this.state.email}/>
>>>>>>> cd3ca655317bc19bc1a5da5e8aae0b8ef5311b08
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

Dashboard.propTypes = {
}

function mapStateToProps(state) {
    console.log("STATE", state);
    return {
        isAuthenticated: state.signin.isAuthenticated,
        token: state.signin.token
    }
}

export default connect(mapStateToProps)(Dashboard);