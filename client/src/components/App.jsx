// Dashboard summary is the component above the two columns in the dashboard
import React from 'react';

// Components
import Dashboard from './dashboard/dashboard.jsx';
import Header from './headers/authorized_header.jsx';
import UnauthHeader from './headers/unauthorized_header.jsx';
import Welcome from './auth/welcome/welcome_component.jsx';

class App extends React.Component {
    
    render(){
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
    
};

export default App;