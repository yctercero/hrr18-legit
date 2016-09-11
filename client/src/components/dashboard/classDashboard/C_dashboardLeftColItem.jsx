// Will be the indivisual class, student, or assignment
import React from 'react'
import DashboardRightColDetail from './C_dashboardRightColDetail.jsx';

class DashboardLeftColItem extends React.Component {
  constructor (props) {
    super(props)
    this.test = this.test.bind(this)
  }
 test (props) {
   console.log(this.props)
  this.props.func(this.props.data)
 }

  render () {
    return (
      <div className='dashboardLeftColItem clearfix' onClick={this.test}>
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

