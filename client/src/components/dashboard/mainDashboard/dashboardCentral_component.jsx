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
    }

    render() {
            console.log(this.props.isAuthenticated)
            if(this.props.isAuthenticated){
                return (
                    <div>
                        <Header />
                        <main>
                            <div className="dashboardWrapper">
                                <DashboardSummary />
                                <div className="dashboardCols">
                                    <div>
                                        <h3>Classes <a href="/classform"><i className="fa fa-plus" aria-hidden="true"></i></a></h3>
                                        <DashboardLeftCol />
                                    </div>
                                    <div>
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