// Will be the indivisual class, student, or assignment
import React from 'react'
class DashboardLeftColItem extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className='dashboardLeftColItem clearfix'>
        <div>
          <h6>Name</h6>
          <p> {this.props.data.first} {this.props.data.last}</p>
        </div>
        <div>
          <i className='fa fa-angle-right fa-2x' aria-hidden='true' />
        </div>
      </div>
    )
  }
}

export default DashboardLeftColItem

