// This component renders the summary info of whatever class was clicked on from the left column
import React from 'react'
class DashboardRightColDetail extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className='dashboardRightColDetail'>
        <a href='/student' >Student Details</a>
        <h1> {this.props.currentstudent.data.currentstudent.first} {this.props.currentstudent.data.currentstudent.first} </h1>
 {this.props.currentstudent.data.assignments.map(function (assignment) {
   return (
     <div> {assignment.name}</div>
    )
 })}
      </div>
    )
  }
};

export default DashboardRightColDetail
