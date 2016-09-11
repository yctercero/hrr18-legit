// Left column is going to hold the list of classes, students, or assignments
import React from 'react'
// Components
import DashboardLeftColItem from './C_dashboardLeftColItem.jsx'
class DashboardLeftCol extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className='dashboardLeftCol'>
        <ul>
    {this.props.data.students.map(function (data) {
      return <DashboardLeftColItem data={data} />
    })}
        </ul>
      </div>
    )
  }
}
export default DashboardLeftCol
