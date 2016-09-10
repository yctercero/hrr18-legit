//React
import React from 'react';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addClass } from '../../actions/addClass.js';

class ClassForm extends React.Component {
    constructor(props) {
        super(props);
        var id = localStorage.getItem('userid');
        this.state = {
            name: '',
            grade: '',
            subject: '',
            UserId: localStorage.getItem('userid')
        };
    }

    onNameChange(event){
        this.setState({ name: event.target.value })
    }

    onGradeChange(event){
        this.setState({ grade: event.target.value })
    }

    onSubjectChange(event){
        this.setState({ subject: event.target.value })
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

    render(){
        return (
            <div className="formWrapper">
                <h3>Class</h3>
                <form  onSubmit={this.onFormSubmit.bind(this)}>
                    <label htmlFor="">Class Name</label>
                    <input 
                        name="class" 
                        type="text" 
                        placeholder="Class Name..."
                        value={this.state.name}
                        onChange={this.onNameChange.bind(this)}
                    />

                    <label htmlFor="grade">Grade</label>
                    <input 
                        name="grade" 
                        type="text" 
                        placeholder="0-12..."
                        value={this.state.grade}
                        onChange={this.onGradeChange.bind(this)}
                    />

                    <label htmlFor="subject">Subject</label>
                    <input 
                        name="subject" 
                        type="text" 
                        placeholder="Subject..."
                        value={this.state.subject}
                        onChange={this.onSubjectChange.bind(this)}
                    />
                    <button type="submit" >Save Class</button>
                </form>
            </div>
            
        );
    }
};


// gives us access to this.props.addUser within component
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addClass }, dispatch);
}

export default connect(null, mapDispatchToProps)(ClassForm);