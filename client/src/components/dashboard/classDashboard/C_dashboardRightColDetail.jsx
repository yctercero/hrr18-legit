// This component renders the summary info of whatever class was clicked on from the left column
import React from 'react'
class DashboardRightColDetail extends React.Component {
  constructor (props) {
    super(props)
  }

renderDetails (){
 if(this.props.currentstudent.data.currentstudent.first ){
   return(

           <div className='dashboardLeftColItem clearfix'><span>

 Assignment Name: {this.props.currentstudent.data.scores.length > 0 && this.props.currentstudent.data.scores[0].name}
<br/>
Sudent Score: {this.props.currentstudent.data.scores.length > 0 && this.props.currentstudent.data.scores[0].Student_Outcomes.score}
<br/>
 Max Score: {this.props.currentstudent.data.scores.length > 0 && this.props.currentstudent.data.scores[0].maxScore}
    </span>  </div>
   )
   

 }

}



  render () {
    return (
      <div> 
      {this.renderDetails() }
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
