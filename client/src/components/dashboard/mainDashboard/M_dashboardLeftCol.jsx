// Left column is going to hold the list of classes, students, or assignments
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import axios from 'axios';


// Components
import DashboardLeftColItem from './M_dashboardLeftColItem.jsx';
import fetchClasses from '../../../actions/index.js';

class DashboardLeftCol extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            classes: []
        }
    }

    componentWillMount() {
        console.log("Go get the classes")
        this.getClasses();
    }

    getClasses(){
        let that = this;
        console.log("FETCHFETCHFETCH")
        $.ajax({
            method: "GET",
            url: '/api/report/classes',
            contentType: 'application/json',
            data: {},
            success: function(data){
                console.log(data);
                // that.fetchClasses(data);
                that.setState({ classes: data })
            }
        })

        
    }

    fetchClasses(classes){
        this.props.fetchClasses(classes);
    }

    render(){
        var classes = this.state.classes;
        return (
            <div className="dashboardLeftCol">
                <ul>
                    {classes.map((classDetails) =>
                        <DashboardLeftColItem
                            key={classDetails.id}
                            classDetails={classDetails}
                        />
                    )}
                </ul>
            </div>
            
        )
    }
};

function mapStateToProps(state) {
  return {
    classes: state.classes
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchClasses }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLeftCol);