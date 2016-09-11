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
{
 this.props.currentstudent.data.scores.length > 0 && console.log(this.props.currentstudent.data.scores[0].maxScore)

 }
        <h1> {this.props.currentstudent.data.currentstudent.first} {this.props.currentstudent.data.currentstudent.last} </h1>

 {this.props.currentstudent.data.scores.length > 0 && this.props.currentstudent.data.scores[0].name}
 {this.props.currentstudent.data.scores.length > 0 && this.props.currentstudent.data.scores[0].Student_Outcomes.score}
 {this.props.currentstudent.data.scores.length > 0 && this.props.currentstudent.data.scores[0].maxScore}
      </div>
    )
  }
};

export default DashboardRightColDetail

 /*
 {this.props.currentstudent.data.assignments.map(function (assignment) {
   return (<div> {assignment.name} </div>)
 })}
*/
