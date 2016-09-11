//React
import React from 'react';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addStudent } from '../../actions/addStudent.js';


class StudentForm extends React.Component {
    constructor(props) {
        super(props);

        let classId = localStorage.getItem('classId')

        this.state = {
            first: '',
            last: '',
            classId: classId
        };
    }

    onFirstNameChange(event){
        this.setState({ first: event.target.value })
    }

    onLastNameChange(event){
        this.setState({ last: event.target.value })
    }

    onFormSubmit(event){
        event.preventDefault();
        // need to send request to API
        console.log(this.state);
        this.props.addClass(this.state);
        this.setState({
            name: '',
            grade: '',
            subject: ''
        })
    }

    onFormSubmit(event){
        event.preventDefault();
        // need to send request to API
        console.log(this.state);
        this.props.addStudent(this.state);
        this.setState({
            first: '',
            last: '',
        })
    }

    render(){
        return (
            <div className="formWrapper">
                <h3>Student</h3>
                <form  onSubmit={this.onFormSubmit.bind(this)}>
                    <label htmlFor="first">First Name</label>
                    <input 
                        name="first" 
                        type="text" 
                        placeholder="First Name..."
                        value={this.state.first}
                        onChange={this.onFirstNameChange.bind(this)}
                    />
                    <label htmlFor="last">Last Name</label>
                    <input 
                        name="last" 
                        type="text" 
                        placeholder="Last Name..."
                        value={this.state.last}
                        onChange={this.onLastNameChange.bind(this)}
                    />
                    
                    <button>Save Student</button>
                </form>
            </div>
        );
    }
};

// gives us access to this.props.addUser within component
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addStudent }, dispatch);
}

export default connect(null, mapDispatchToProps)(StudentForm);