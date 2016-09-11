// Left column is going to hold the list of classes, students, or assignments
import React from 'react'
// Components
import DashboardLeftColItem from './C_dashboardLeftColItem.jsx'

class DashboardLeftCol extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isAuthenticated: this.props.isAuthenticated,
      students: [],
      details: {},
      assignments: []
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  componentDidMount () {
    const classid = localStorage.getItem('classId')
    const url = `/api/report/classes/${classid}`
    this.serverRequest = $.get(url, function (classData) {
      this.setState({
        isAuthenticated: this.props.isAuthenticated,
        students: classData.students,
        details: classData.details,
        assignments: classData.assignments
      })
    }.bind(this))
  }

  componentWillUnmount () {
    this.serverRequest.abort()
  }
  render () {
    return (
      <div className='dashboardLeftCol'>
        <ul>
       {this.state.students.map(function (data) {
         return <DashboardLeftColItem data={data} />
       })}
        </ul>
      </div>
    )
  }
}

export default DashboardLeftCol